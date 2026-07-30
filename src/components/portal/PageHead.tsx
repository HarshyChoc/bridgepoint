import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

export function PageHead({
  eyebrow,
  title,
  meta,
  actions,
  className,
}: {
  eyebrow?: string
  title: ReactNode
  meta?: ReactNode
  actions?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end',
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        {eyebrow && <div className="eyebrow-sm">{eyebrow}</div>}
        <h1 className="font-serif text-[30px] leading-tight font-light">{title}</h1>
        {meta && <div className="text-[13px] text-faint">{meta}</div>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2.5">{actions}</div>}
    </div>
  )
}
