import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Bits'
import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

/** Chrome for the inline product previews shown across the marketing pages. */
export function PreviewFrame({
  label,
  right,
  children,
  className,
}: {
  label: string
  right?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-md border border-line-2 bg-surface p-6',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="eyebrow-sm">{label}</span>
        {right}
      </div>
      {children}
    </div>
  )
}

export function PlanPreview() {
  const steps = [
    { title: 'Replace your state ID', hint: 'MVC Newark — documents ready', done: true },
    { title: 'Apply for transitional housing', hint: '3 verified options in Essex County', done: false },
    { title: 'Meet your advocate', hint: 'Thursday, 10:30am — directions saved', done: false },
  ]

  return (
    <PreviewFrame label="Individual portal — action plan" right={<Badge tone="brass">Live</Badge>}>
      <div className="flex flex-col gap-2.5">
        {steps.map((step) => (
          <div
            key={step.title}
            className="flex items-center gap-3.5 rounded-[4px] border border-line-2 bg-surface-2 p-4"
          >
            <span
              className={cn(
                'h-5 w-5 shrink-0 rounded-full',
                step.done ? 'bg-brass' : 'border-[1.5px] border-line-3',
              )}
            />
            <div className="flex flex-col gap-1">
              <div className="text-[13.5px]">{step.title}</div>
              <div className="text-[12px] text-faint">{step.hint}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Progress value={57} className="flex-1" />
        <span className="font-mono text-[10.5px] text-faint">8 / 14</span>
      </div>
    </PreviewFrame>
  )
}

export function CaseloadPreview() {
  const rows = [
    { name: 'M. Reyes', phase: 'Housing search', contact: 'Last contact 2d', status: 'Urgent' },
    { name: 'D. Okafor', phase: 'Lease signing', contact: 'Last contact 1d', status: 'On track' },
    { name: 'J. Alvarez', phase: 'Intake', contact: 'Last contact 6h', status: 'New' },
    { name: 'T. Brooks', phase: '90-day retention', contact: 'Last contact 9d', status: 'Follow up' },
  ]

  return (
    <PreviewFrame
      label="Caseload — 34 active"
      right={<Badge tone="alert">4 service gaps</Badge>}
    >
      <div className="flex flex-col">
        {rows.map((row) => (
          <div
            key={row.name}
            className="flex items-center justify-between gap-4 border-b border-line py-3.5 last:border-0"
          >
            <div className="flex flex-col gap-1">
              <div className="text-[13.5px]">{row.name}</div>
              <div className="text-[11.5px] text-faint">
                {row.phase} · {row.contact}
              </div>
            </div>
            <Badge
              tone={
                row.status === 'Urgent'
                  ? 'alert'
                  : row.status === 'On track'
                    ? 'ok'
                    : row.status === 'New'
                      ? 'info'
                      : 'warn'
              }
            >
              {row.status}
            </Badge>
          </div>
        ))}
      </div>
    </PreviewFrame>
  )
}

export function UnitPreview() {
  const rows = [
    { label: 'Inspection', value: 'Scheduled — Aug 4' },
    { label: 'Documentation', value: 'Complete' },
    { label: 'Incentive payment', value: 'Processing' },
  ]

  return (
    <PreviewFrame label="Unit 4B — 218 Clinton Ave" right={<Badge tone="info">2 referrals</Badge>}>
      <div className="h-32 rounded-[4px] border border-line-2 bg-gradient-to-br from-[#1c1e22] to-[#101215]" />
      <div className="flex flex-col">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between border-b border-line py-3 text-[13px] last:border-0"
          >
            <span className="text-faint">{row.label}</span>
            <span className="text-text-2">{row.value}</span>
          </div>
        ))}
      </div>
    </PreviewFrame>
  )
}

export function ChatPreview({
  label = 'BridgePoint assistant',
  turns,
  chips,
}: {
  label?: string
  turns: Array<{ from: 'assistant' | 'person'; body: string }>
  chips?: string[]
}) {
  return (
    <PreviewFrame label={label}>
      <div className="flex flex-col gap-3">
        {turns.map((turn, i) => (
          <div
            key={i}
            className={cn(
              'max-w-[86%] rounded-[6px] px-4 py-3 text-[13.5px] leading-relaxed',
              turn.from === 'assistant'
                ? 'border border-line-2 bg-surface-2 text-text-2'
                : 'self-end bg-elevated text-text',
            )}
          >
            {turn.body}
          </div>
        ))}
      </div>
      {chips && (
        <div className="flex flex-wrap gap-2 pt-1">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-line-3 px-3 py-1.5 text-[12px] text-muted"
            >
              {chip}
            </span>
          ))}
        </div>
      )}
    </PreviewFrame>
  )
}
