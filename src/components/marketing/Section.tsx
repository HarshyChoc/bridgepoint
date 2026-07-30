import { cn } from '@/lib/cn'
import { Display, Eyebrow } from '@/components/ui/Bits'
import { LinkButton } from '@/components/ui/Button'
import type { ReactNode } from 'react'

export function Section({
  children,
  className,
  bordered = true,
  id,
}: {
  children: ReactNode
  className?: string
  bordered?: boolean
  id?: string
}) {
  return (
    <section
      id={id}
      className={cn('px-6 py-20 lg:px-14 lg:py-24', bordered && 'border-t border-line', className)}
    >
      <div className="mx-auto max-w-[1280px]">{children}</div>
    </section>
  )
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  className,
}: {
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex max-w-3xl flex-col gap-4', className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Display className="text-[32px] leading-[1.18] sm:text-[38px]">{title}</Display>
      {lead && <p className="text-[16px] leading-[1.65] text-muted">{lead}</p>}
    </div>
  )
}

/** Split layout used repeatedly: sticky heading left, dense list right. */
export function SplitSection({
  eyebrow,
  title,
  lead,
  children,
  id,
}: {
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  children: ReactNode
  id?: string
}) {
  return (
    <Section id={id}>
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.4fr] lg:gap-[72px]">
        <SectionHead eyebrow={eyebrow} title={title} lead={lead} />
        <div>{children}</div>
      </div>
    </Section>
  )
}

export function ClosingCTA({
  line,
  action,
  to = '/contact',
  secondary,
  secondaryTo,
}: {
  line: string
  action: string
  to?: string
  secondary?: string
  secondaryTo?: string
}) {
  return (
    <Section className="bg-surface">
      <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <Display className="max-w-2xl text-[28px] leading-[1.22] sm:text-[34px]">{line}</Display>
        <div className="flex shrink-0 flex-wrap gap-3">
          <LinkButton to={to} variant="primary" size="lg">
            {action}
          </LinkButton>
          {secondary && secondaryTo && (
            <LinkButton to={secondaryTo} size="lg">
              {secondary}
            </LinkButton>
          )}
        </div>
      </div>
    </Section>
  )
}

export function NumberedList({
  items,
}: {
  items: Array<{ title: string; body: string }>
}) {
  return (
    <div className="flex flex-col">
      {items.map((item, i) => (
        <div key={item.title} className="flex gap-6 border-b border-line py-7 last:border-0">
          <div className="pt-1 font-mono text-[12px] text-brass">
            {String(i + 1).padStart(2, '0')}
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-[16.5px] font-medium">{item.title}</div>
            <div className="text-[14px] leading-[1.65] text-muted">{item.body}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function FeatureGrid({
  items,
  columns = 3,
}: {
  items: Array<{ title: string; body: string }>
  columns?: 2 | 3
}) {
  return (
    <div
      className={cn(
        'grid gap-px overflow-hidden rounded-md border border-line-2 bg-line-2 sm:grid-cols-2',
        columns === 3 && 'lg:grid-cols-3',
      )}
    >
      {items.map((item) => (
        <div key={item.title} className="flex flex-col gap-2.5 bg-surface p-7">
          <div className="text-[15px] font-medium">{item.title}</div>
          <div className="text-[13.5px] leading-[1.65] text-faint">{item.body}</div>
        </div>
      ))}
    </div>
  )
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <div className="grid gap-x-8 gap-y-px sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item}
          className="flex items-center gap-3 border-b border-line py-3.5 text-[14px] text-text-2"
        >
          <span className="h-1 w-1 shrink-0 rounded-full bg-brass" />
          {item}
        </div>
      ))}
    </div>
  )
}
