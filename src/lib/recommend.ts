import { RESOURCES } from '@/data/resources'
import type { PlanStep, Resource, ServiceCategory, SubStep } from '@/data/types'

/**
 * The county-based recommendation engine.
 * Resources are ranked by county match first, then reentry acceptance,
 * then distance — the order a person actually experiences as useful.
 */
export function recommendResources(
  categories: ServiceCategory[],
  county: string,
  limit = 3,
): Resource[] {
  const wanted = new Set(categories)

  return RESOURCES.filter((r) => wanted.size === 0 || wanted.has(r.category))
    .map((r) => ({ resource: r, score: scoreResource(r, county) }))
    .sort((a, b) => b.score - a.score || a.resource.distanceMi - b.resource.distanceMi)
    .slice(0, limit)
    .map((entry) => entry.resource)
}

function scoreResource(resource: Resource, county: string): number {
  let score = 0
  if (resource.county === county) score += 100
  if (resource.acceptsReentry) score += 20
  if (resource.walkIn) score += 8
  score -= Math.min(resource.distanceMi, 60) / 2
  return score
}

interface StepBlueprint {
  category: ServiceCategory
  bucket: PlanStep['bucket']
  title: string
  detail: string
  subSteps: string[]
}

/** Ordered so the sequence a plan produces is always the same for a given profile. */
const BLUEPRINTS: StepBlueprint[] = [
  {
    category: 'Government assistance',
    bucket: 'today',
    title: 'Replace your state identification',
    detail:
      'Almost everything else asks for this first. A corrections release document counts toward the six points MVC requires.',
    subSteps: ['Locate your birth certificate', 'Upload a proof of address', 'Book the appointment'],
  },
  {
    category: 'Housing',
    bucket: 'today',
    title: 'Start your housing application',
    detail:
      'Verified options in your county are attached below, ranked by how close they are and whether they take walk-ins.',
    subSteps: [
      'Complete the coordinated entry assessment',
      'Submit the first application',
      'Gather proof of income',
    ],
  },
  {
    category: 'Food',
    bucket: 'today',
    title: 'Get food this week',
    detail: 'Walk-in pantries near you that ask for no documentation.',
    subSteps: ['Check pantry hours', 'Apply for SNAP'],
  },
  {
    category: 'Healthcare',
    bucket: 'week',
    title: 'Enroll in NJ FamilyCare',
    detail:
      'Applications from people released within the last twelve months are expedited. It takes about 20 minutes.',
    subSteps: ['Gather income documentation', 'Complete the application'],
  },
  {
    category: 'Mental health',
    bucket: 'week',
    title: 'Connect with behavioral health support',
    detail: 'Screening does not require insurance, and partner referrals get same-week appointments.',
    subSteps: ['Complete a screening call', 'Book the first appointment'],
  },
  {
    category: 'Recovery',
    bucket: 'week',
    title: 'Connect with recovery support',
    detail:
      'Peer-led options need no clinical intake. Clinical options coordinate directly with probation where required.',
    subSteps: ['Attend one peer meeting', 'Complete a clinical assessment if needed'],
  },
  {
    category: 'Employment',
    bucket: 'week',
    title: 'Start work or job training',
    detail: 'Fair-chance employers and paid on-the-job training, with same-week intake for referrals.',
    subSteps: ['Attend an intake session', 'Bring identification', 'Complete the placement interview'],
  },
  {
    category: 'Transportation',
    bucket: 'week',
    title: 'Apply for the reentry transit voucher',
    detail: '60 days of unlimited local bus travel while you establish income.',
    subSteps: ['Bring photo ID to Newark Penn'],
  },
  {
    category: 'Legal aid',
    bucket: 'next',
    title: 'Screen for expungement eligibility',
    detail: 'Free clinics prepare the petition on the spot. Bring your full criminal history record.',
    subSteps: ['Request your criminal history record', 'Attend the clinic'],
  },
  {
    category: 'Education',
    bucket: 'next',
    title: 'Enroll in a certificate program',
    detail: 'Tuition waivers are available through workforce innovation funding.',
    subSteps: ['Attend an information session', 'Complete the waiver screening'],
  },
  {
    category: 'Family reunification',
    bucket: 'next',
    title: 'Begin family reunification support',
    detail: 'Supervised visitation, parenting classes, and child support advocacy in one program.',
    subSteps: ['Call to schedule an assessment'],
  },
]

/**
 * Builds an action plan from an intake profile. Categories the person did not
 * raise produce no steps — the plan never pads itself out.
 */
export function buildPlan(categories: ServiceCategory[], county: string): PlanStep[] {
  const wanted = new Set(categories)

  return BLUEPRINTS.filter((bp) => wanted.has(bp.category)).map((bp, index) => {
    const resources = recommendResources([bp.category], county, 3)
    const id = `plan-${index}-${bp.category.toLowerCase().replace(/\s+/g, '-')}`

    const subSteps: SubStep[] = bp.subSteps.map((label, i) => ({ id: `${id}-s${i}`, label }))

    return {
      id,
      bucket: bp.bucket,
      title: bp.title,
      detail: bp.detail,
      category: bp.category,
      subSteps,
      resourceIds: resources.map((r) => r.id),
      meta: describeCoverage(resources, county),
    }
  })
}

/**
 * Says plainly how many of the attached resources are actually inside the
 * person's county. Overstating local coverage is the exact failure a verified
 * database is supposed to prevent.
 */
export function describeCoverage(resources: Resource[], county: string): string | undefined {
  if (resources.length === 0) return undefined

  const local = resources.filter((r) => r.county === county).length
  const nearby = resources.length - local

  if (local === 0) return `${nearby} verified ${plural(nearby)} in neighbouring counties`
  if (nearby === 0) return `${local} verified ${plural(local)} in ${county} County`
  return `${local} verified ${plural(local)} in ${county} County · ${nearby} nearby`
}

function plural(count: number): string {
  return count === 1 ? 'option' : 'options'
}

/** Total sub-steps across a plan, used for the progress readout. */
export function planTotals(
  steps: PlanStep[],
  completed: string[],
): { total: number; done: number; percent: number } {
  const total = steps.reduce((sum, step) => sum + step.subSteps.length, 0)
  const doneSet = new Set(completed)
  const done = steps.reduce(
    (sum, step) => sum + step.subSteps.filter((s) => doneSet.has(s.id)).length,
    0,
  )
  return { total, done, percent: total === 0 ? 0 : Math.round((done / total) * 100) }
}
