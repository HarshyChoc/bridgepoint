import { describe, expect, it } from 'vitest'
import {
  abbreviateName,
  currency,
  dayAndMonth,
  formatDate,
  formatShortDate,
  initials,
  relativeFromNow,
} from './format'

describe('date formatting', () => {
  it('renders a date-only value as that calendar date regardless of timezone', () => {
    expect(formatDate('2026-06-12')).toBe('12 Jun 2026')
  })

  it('renders the short form with a padded day', () => {
    expect(formatShortDate('2026-07-02')).toBe('02 JUL')
  })

  it('splits a date into day and month parts', () => {
    expect(dayAndMonth('2026-08-04T14:00:00')).toEqual({ day: '04', month: 'AUG' })
  })

  it('returns the input unchanged when it cannot be parsed', () => {
    expect(formatDate('not a date')).toBe('not a date')
  })

  it('falls back to placeholders for an unparseable day and month', () => {
    expect(dayAndMonth('nonsense')).toEqual({ day: '--', month: '---' })
  })
})

describe('relativeFromNow', () => {
  const now = new Date('2026-07-30T12:00:00')

  it('reports minutes within the hour', () => {
    expect(relativeFromNow('2026-07-30T11:20:00', now)).toBe('40m ago')
  })

  it('reports hours within the day', () => {
    expect(relativeFromNow('2026-07-30T04:00:00', now)).toBe('8h ago')
  })

  it('reports days within the month', () => {
    expect(relativeFromNow('2026-07-28T12:00:00', now)).toBe('2d ago')
  })

  it('falls back to an absolute date beyond a month', () => {
    expect(relativeFromNow('2026-01-15', now)).toBe('15 Jan 2026')
  })
})

describe('name and number helpers', () => {
  it('abbreviates a full name to an initial and surname', () => {
    expect(abbreviateName('Marcus Reyes')).toBe('M. Reyes')
  })

  it('leaves a single-word name alone', () => {
    expect(abbreviateName('Marcus')).toBe('Marcus')
  })

  it('takes at most two initials', () => {
    expect(initials('Renee Carter Jones')).toBe('RC')
  })

  it('formats currency with thousands separators', () => {
    expect(currency(1400)).toBe('$1,400')
    expect(currency(2400000)).toBe('$2,400,000')
  })
})
