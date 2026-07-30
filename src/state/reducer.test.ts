import { describe, expect, it } from 'vitest'
import { reducer } from './reducer'
import { INITIAL_STATE } from './initialState'
import type { AppState } from './types'

const base: AppState = INITIAL_STATE

describe('reducer immutability', () => {
  it('never mutates the state object it was handed', () => {
    const before = JSON.stringify(base)
    reducer(base, { type: 'toggleSubStep', subStepId: 'step-id-c' })
    reducer(base, { type: 'toggleSavedResource', resourceId: 'r-mvc-newark' })
    reducer(base, { type: 'dismissInsight', insightId: 'daily-brief' })
    expect(JSON.stringify(base)).toBe(before)
  })

  it('returns a new top-level object on every handled action', () => {
    const next = reducer(base, { type: 'toggleSubStep', subStepId: 'step-id-c' })
    expect(next).not.toBe(base)
  })
})

describe('toggleSubStep', () => {
  it('adds a sub-step that was not complete', () => {
    const next = reducer(base, { type: 'toggleSubStep', subStepId: 'step-id-c' })
    expect(next.completedSubSteps).toContain('step-id-c')
  })

  it('removes a sub-step that was already complete', () => {
    const next = reducer(base, { type: 'toggleSubStep', subStepId: 'step-id-a' })
    expect(next.completedSubSteps).not.toContain('step-id-a')
  })
})

describe('toggleSavedResource', () => {
  it('saves and then unsaves the same resource', () => {
    const saved = reducer(base, { type: 'toggleSavedResource', resourceId: 'r-mvc-newark' })
    expect(saved.savedResourceIds).toContain('r-mvc-newark')

    const unsaved = reducer(saved, { type: 'toggleSavedResource', resourceId: 'r-mvc-newark' })
    expect(unsaved.savedResourceIds).not.toContain('r-mvc-newark')
  })
})

describe('referrals', () => {
  it('sets a new status and stamps the update date', () => {
    const target = base.referrals[0]
    const next = reducer(base, {
      type: 'setReferralStatus',
      referralId: target.id,
      status: 'Accepted',
    })
    const updated = next.referrals.find((r) => r.id === target.id)
    expect(updated?.status).toBe('Accepted')
    expect(updated?.updatedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('leaves other referrals untouched', () => {
    const target = base.referrals[0]
    const next = reducer(base, {
      type: 'setReferralStatus',
      referralId: target.id,
      status: 'Declined',
    })
    expect(next.referrals[1]).toBe(base.referrals[1])
  })
})

describe('dismissInsight', () => {
  it('is idempotent', () => {
    const once = reducer(base, { type: 'dismissInsight', insightId: 'daily-brief' })
    const twice = reducer(once, { type: 'dismissInsight', insightId: 'daily-brief' })
    expect(twice).toBe(once)
    expect(twice.dismissedInsights).toHaveLength(1)
  })
})

describe('completeIntake', () => {
  it('replaces the plan and clears prior progress', () => {
    const next = reducer(base, {
      type: 'completeIntake',
      profile: { county: 'Hudson', categories: ['Housing'], urgentFlags: [] },
      steps: [],
    })
    expect(next.intake.completed).toBe(true)
    expect(next.intake.county).toBe('Hudson')
    expect(next.planSteps).toEqual([])
    expect(next.completedSubSteps).toEqual([])
  })
})

describe('reset', () => {
  it('restores seed data but keeps the person signed in', () => {
    const session = { role: 'advocate' as const, name: 'Renee Carter', org: 'NRC', signedInAt: 'now' }
    const dirty = reducer({ ...base, session }, { type: 'toggleSubStep', subStepId: 'step-id-c' })
    const clean = reducer(dirty, { type: 'reset' })

    expect(clean.completedSubSteps).toEqual(INITIAL_STATE.completedSubSteps)
    expect(clean.session).toEqual(session)
  })
})
