import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

export function Eyebrow({
  children,
  brass,
  className,
}: {
  children: ReactNode
  brass?: boolean
  className?: string
}) {
  return <div className={cn('eyebrow', brass && 'text-brass', className)}>{children}</div>
}

export function Display({
  children,
  className,
  as: As = 'h2',
}: {
  children: ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}) {
  return <As className={cn('display font-serif text-text', className)}>{children}</As>
}

export function Stat({
  value,
  label,
  className,
}: {
  value: ReactNode
  label: string
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="font-serif text-[38px] leading-none font-light">{value}</div>
      <div className="text-[13px] text-faint">{label}</div>
    </div>
  )
}

export function MetricTile({
  label,
  value,
  hint,
  className,
}: {
  label: string
  value: ReactNode
  hint?: string
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-2 px-6 py-5', className)}>
      <div className="eyebrow-sm">{label}</div>
      <div className="font-serif text-[32px] leading-none font-light">{value}</div>
      {hint && <div className="text-[12px] text-faint">{hint}</div>}
    </div>
  )
}

export function Progress({
  value,
  className,
  tone = 'brass',
}: {
  value: number
  className?: string
  tone?: 'brass' | 'ok'
}) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div className={cn('h-[3px] w-full overflow-hidden rounded-full bg-elevated', className)}>
      <div
        className={cn('h-full rounded-full transition-[width] duration-500', tone === 'brass' ? 'bg-brass' : 'bg-ok')}
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}

export function Divider({ className }: { className?: string }) {
  return <div className={cn('h-px w-full bg-line', className)} />
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-14 text-center">
      <div className="text-[14px] text-muted">{title}</div>
      {hint && <div className="max-w-sm text-[12.5px] text-ghost">{hint}</div>}
    </div>
  )
}

export function KeyValue({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="eyebrow-sm">{label}</div>
      <div className="text-[13.5px] text-text-2">{value}</div>
    </div>
  )
}
