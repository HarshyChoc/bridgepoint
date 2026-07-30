import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

export type BadgeTone = 'neutral' | 'brass' | 'ok' | 'warn' | 'alert' | 'info'

const TONES: Record<BadgeTone, string> = {
  neutral: 'border-line-3 text-faint',
  brass: 'border-brass-dim text-brass',
  ok: 'border-[#3f5340] text-ok',
  warn: 'border-brass-dim text-brass',
  alert: 'border-[#5b3833] text-alert',
  info: 'border-[#3a4653] text-info',
}

/** Maps the domain vocabulary onto the restrained status palette. */
export function toneForStatus(status: string): BadgeTone {
  const s = status.toLowerCase()
  if (['accepted', 'verified', 'completed', 'paid', 'passed', 'on track', 'active', 'complete'].includes(s))
    return 'ok'
  if (['urgent', 'critical', 'declined', 'missing', 'action needed', 'overdue'].includes(s)) return 'alert'
  if (['pending', 'review', 'processing', 'follow up', 'watch', 'docs due', 'scheduled', 'due aug 15'].includes(s))
    return 'warn'
  if (['new', 'sent', 'draft', 'uploaded', 'eligible', 'requested'].includes(s)) return 'info'
  return 'neutral'
}

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode
  tone?: BadgeTone
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-[3px] border px-2 py-[3px] font-mono text-[10px] tracking-[0.12em] uppercase',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <Badge tone={toneForStatus(status)} className={className}>
      {status}
    </Badge>
  )
}
