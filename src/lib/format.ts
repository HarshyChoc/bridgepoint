/** Display formatters. Kept pure so they can be unit-tested without a DOM. */

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const

/**
 * A bare "YYYY-MM-DD" is parsed as UTC midnight by the Date constructor, which
 * renders as the previous day west of Greenwich. Parse date-only values as
 * local so a stored calendar date always displays as that calendar date.
 */
export function parseDate(value: string): Date {
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(value)
  return new Date(dateOnly ? `${value}T00:00:00` : value)
}

export function formatDate(iso: string): string {
  const d = parseDate(iso)
  if (Number.isNaN(d.getTime())) return iso
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

export function formatShortDate(iso: string): string {
  const d = parseDate(iso)
  if (Number.isNaN(d.getTime())) return iso
  return `${String(d.getDate()).padStart(2, '0')} ${MONTHS[d.getMonth()].toUpperCase()}`
}

export function dayAndMonth(iso: string): { day: string; month: string } {
  const d = parseDate(iso)
  if (Number.isNaN(d.getTime())) return { day: '--', month: '---' }
  return {
    day: String(d.getDate()).padStart(2, '0'),
    month: MONTHS[d.getMonth()].toUpperCase(),
  }
}

export function relativeFromNow(iso: string, now: Date = new Date()): string {
  const then = parseDate(iso)
  if (Number.isNaN(then.getTime())) return iso
  const mins = Math.round((now.getTime() - then.getTime()) / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  if (days < 30) return `${days}d ago`
  return formatDate(iso)
}

export function currency(amount: number): string {
  return `$${amount.toLocaleString('en-US')}`
}

export function percent(value: number): string {
  return `${Math.round(value)}%`
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

/** "Marcus Reyes" -> "M. Reyes" — the abbreviated form used across advocate views. */
export function abbreviateName(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean)
  if (parts.length < 2) return name
  return `${parts[0][0]}. ${parts[parts.length - 1]}`
}
