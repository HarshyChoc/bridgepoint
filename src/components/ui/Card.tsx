import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  tone?: 'default' | 'sunken' | 'raised'
}

const TONES = {
  default: 'bg-surface border-line-2',
  sunken: 'bg-surface-2 border-line-2',
  raised: 'bg-raised border-line-3',
} as const

export function Card({ children, className, tone = 'default' }: CardProps) {
  return (
    <div className={cn('rounded-md border', TONES[tone], className)}>{children}</div>
  )
}

export function CardHeader({
  label,
  action,
  className,
}: {
  label: string
  action?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 border-b border-line px-5 py-3.5',
        className,
      )}
    >
      <span className="eyebrow-sm">{label}</span>
      {action}
    </div>
  )
}

export function Panel({
  label,
  action,
  children,
  className,
  bodyClassName,
}: {
  label: string
  action?: ReactNode
  children: ReactNode
  className?: string
  bodyClassName?: string
}) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader label={label} action={action} />
      <div className={cn('p-5', bodyClassName)}>{children}</div>
    </Card>
  )
}
