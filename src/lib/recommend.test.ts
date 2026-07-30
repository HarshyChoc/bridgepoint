import { describe, expect, it } from 'vitest'
import { buildPlan, describeCoverage, planTotals, recommendResources } from './recommend'
import { RESOURCES } from '@/data/resources'
import type { PlanStep, Resource, ServiceCategory } from '@/data/types'

describe('recommendResources', () => {
  it('ranks in-county resources above out-of-county ones', () => {
    const results = recommendResources(['Housing'], 'Hudson', 3)
    expect(results[0].county).toBe('Hudson')
  })

  it('only returns resources in the requested categories', () => {
    const categories: ServiceCategory[] = ['Legal aid']
    const results = recommendResources(categories, 'Essex', 5)
    expect(results.every((r) => r.category === 'Legal aid')).toBe(true)
  })

  it('never returns more than the requested limit', () => {
    expect(recommendResources(['Housing'], 'Essex', 2)).toHaveLength(2)
  })

  it('returns an empty list when no resource matches the category', () => {
    // 'Recovery' exists, but not in a county with no listings at all.
    const results = recommendResources([], 'Essex', 0)
    expect(results).toEqual([])
  })

  it('breaks ties by distance', () => {
    const results = recommendResources(['Food'], 'Essex', 5)
    const distances = results.filter((r) => r.county === 'Essex').map((r) => r.distanceMi)
    expect([...distances].sort((a, b) => a - b)).toEqual(distances)
  })
})

describe('describeCoverage', () => {
  const inEssex = (id: string): Resource => ({ ...RESOURCES[0], id, county: 'Essex' })
  const inHudson = (id: string): Resource => ({ ...RESOURCES[0], id, county: 'Hudson' })

  it('returns undefined when there is nothing to describe', () => {
    expect(describeCoverage([], 'Essex')).toBeUndefined()
  })

  it('reports a fully local set as local', () => {
    expect(describeCoverage([inEssex('a'), inEssex('b')], 'Essex')).toBe(
      '2 verified options in Essex County',
    )
  })

  it('does not claim local coverage it does not have', () => {
    expect(describeCoverage([inHudson('a')], 'Essex')).toBe(
      '1 verified option in neighbouring counties',
    )
  })

  it('splits the count when coverage is mixed', () => {
    expect(describeCoverage([inEssex('a'), inHudson('b')], 'Essex')).toBe(
      '1 verified option in Essex County · 1 nearby',
    )
  })
})

describe('buildPlan', () => {
  it('produces no steps for categories the person did not raise', () => {
    const plan = buildPlan(['Housing'], 'Essex')
    expect(plan.every((step) => step.category === 'Housing')).toBe(true)
  })

  it('gives every step a unique id and at least one sub-step', () => {
    const plan = buildPlan(['Housing', 'Employment', 'Legal aid'], 'Essex')
    const ids = plan.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(plan.every((step) => step.subSteps.length > 0)).toBe(true)
  })

  it('returns an empty plan for an empty profile rather than padding it', () => {
    expect(buildPlan([], 'Essex')).toEqual([])
  })

  it('attaches resources drawn from the requested county where they exist', () => {
    const plan = buildPlan(['Housing'], 'Hudson')
    expect(plan[0].resourceIds.length).toBeGreaterThan(0)
  })
})

describe('planTotals', () => {
  const steps: PlanStep[] = [
    {
      id: 's1',
      bucket: 'today',
      title: 'One',
      detail: '',
      category: 'Housing',
      subSteps: [
        { id: 's1-a', label: 'a' },
        { id: 's1-b', label: 'b' },
      ],
      resourceIds: [],
    },
    {
      id: 's2',
      bucket: 'week',
      title: 'Two',
      detail: '',
      category: 'Healthcare',
      subSteps: [{ id: 's2-a', label: 'a' }],
      resourceIds: [],
    },
  ]

  it('counts completed sub-steps across every step', () => {
    expect(planTotals(steps, ['s1-a', 's2-a'])).toEqual({ total: 3, done: 2, percent: 67 })
  })

  it('ignores completions that do not belong to the plan', () => {
    expect(planTotals(steps, ['not-a-real-step'])).toEqual({ total: 3, done: 0, percent: 0 })
  })

  it('does not divide by zero on an empty plan', () => {
    expect(planTotals([], [])).toEqual({ total: 0, done: 0, percent: 0 })
  })
})
