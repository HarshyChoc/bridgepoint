import type { PlanStep } from './types'

/**
 * Marcus Reyes's action plan — the record shared between the individual
 * portal and the advocate case file.
 */
export const PLAN_STEPS: PlanStep[] = [
  {
    id: 'step-id',
    bucket: 'today',
    title: 'Replace your state ID',
    detail:
      "You'll need your birth certificate, release document, and proof of address. Two Essex County locations accept a corrections release.",
    category: 'Government assistance',
    meta: 'Due today',
    subSteps: [
      { id: 'step-id-a', label: 'Birth certificate located' },
      { id: 'step-id-b', label: 'Proof of address uploaded' },
      { id: 'step-id-c', label: 'Appointment booked' },
    ],
    resourceIds: ['r-mvc-newark', 'r-mvc-oakland'],
  },
  {
    id: 'step-advocate',
    bucket: 'today',
    title: "Confirm Thursday's appointment with Renee",
    detail: '10:30am · Newark Reentry Coalition, 62 Halsey St',
    category: 'Housing',
    meta: 'Thursday, 10:30am',
    subSteps: [{ id: 'step-advocate-a', label: 'Reply to confirm' }],
    resourceIds: [],
  },
  {
    id: 'step-housing',
    bucket: 'week',
    title: 'Apply for transitional housing',
    detail: '3 verified options match your situation in Essex County',
    category: 'Housing',
    meta: '3 verified options',
    subSteps: [
      { id: 'step-housing-a', label: 'Complete coordinated entry assessment' },
      { id: 'step-housing-b', label: 'Submit Isaiah House application' },
      { id: 'step-housing-c', label: 'Submit Section 8 preliminary application' },
    ],
    resourceIds: ['r-isaiah-house', 'r-essex-housing', 'r-clinton-ave'],
  },
  {
    id: 'step-familycare',
    bucket: 'week',
    title: 'Enroll in NJ FamilyCare',
    detail: 'You appear eligible — application takes about 20 minutes',
    category: 'Healthcare',
    meta: 'About 20 minutes',
    subSteps: [
      { id: 'step-familycare-a', label: 'Gather income documentation' },
      { id: 'step-familycare-b', label: 'Complete the application' },
    ],
    resourceIds: ['r-familycare', 'r-newark-community-health'],
  },
  {
    id: 'step-snap',
    bucket: 'week',
    title: 'Apply for SNAP benefits',
    detail:
      'Households with no income can receive an expedited decision within seven days of applying.',
    category: 'Government assistance',
    meta: 'Expedited decision available',
    subSteps: [{ id: 'step-snap-a', label: 'Book an appointment at 18 Rector St' }],
    resourceIds: ['r-snap-essex', 'r-bridges-pantry'],
  },
  {
    id: 'step-workforce',
    bucket: 'next',
    title: 'Workforce certificate program intake',
    detail:
      'Tuition waivers are available through workforce innovation funding for HVAC, CDL, and IT support tracks.',
    category: 'Education',
    meta: 'Fall term enrollment',
    subSteps: [{ id: 'step-workforce-a', label: 'Attend an information session' }],
    resourceIds: ['r-essex-county-college', 'r-ironbound-workforce'],
  },
  {
    id: 'step-bank',
    bucket: 'next',
    title: 'Open a checking account',
    detail:
      'A second-chance checking account requires only your state ID and an initial deposit of $25.',
    category: 'Government assistance',
    meta: 'After ID is replaced',
    subSteps: [{ id: 'step-bank-a', label: 'Compare second-chance accounts' }],
    resourceIds: [],
  },
  {
    id: 'step-transit',
    bucket: 'next',
    title: 'Apply for the reentry transit voucher',
    detail: '60 days of unlimited local bus travel while you establish work income.',
    category: 'Transportation',
    meta: 'Referral sent',
    subSteps: [{ id: 'step-transit-a', label: 'Bring photo ID to Newark Penn' }],
    resourceIds: ['r-njtransit-reduced'],
  },
  {
    id: 'step-expunge',
    bucket: 'next',
    title: 'Screen for expungement eligibility',
    detail: 'A free clinic runs the second Saturday of each month at Rutgers Law.',
    category: 'Legal aid',
    meta: 'Second Saturday monthly',
    subSteps: [{ id: 'step-expunge-a', label: 'Request your full criminal history record' }],
    resourceIds: ['r-expungement-clinic', 'r-essex-legal-aid'],
  },
]

/** Sub-steps completed before the demo begins — 8 of 14 plan steps. */
export const PRECOMPLETED_SUBSTEPS: string[] = [
  'step-id-a',
  'step-id-b',
  'step-advocate-a',
  'step-housing-a',
  'step-housing-b',
  'step-familycare-a',
  'step-familycare-b',
  'step-transit-a',
]

export const SAVED_RESOURCE_IDS: string[] = [
  'r-essex-legal-aid',
  'r-bridges-pantry',
  'r-ironbound-workforce',
]
