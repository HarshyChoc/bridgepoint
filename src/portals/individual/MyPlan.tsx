import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ChevronDown, MessageSquare } from 'lucide-react'
import { PageHead } from '@/components/portal/PageHead'
import { Badge } from '@/components/ui/Badge'
import { Card, Panel } from '@/components/ui/Card'
import { Progress } from '@/components/ui/Bits'
import { ResourceRow } from '@/components/resources/ResourceCard'
import { resourceById } from '@/data/resources'
import { PRIMARY_CLIENT_ID } from '@/data/clients'
import { planTotals } from '@/lib/recommend'
import { dayAndMonth } from '@/lib/format'
import { useApp } from '@/state/AppStateContext'
import { useToast } from '@/components/ui/Toast'
import { cn } from '@/lib/cn'
import type { PlanBucket, PlanStep } from '@/data/types'

const BUCKETS: Array<{ key: PlanBucket; label: string }> = [
  { key: 'today', label: 'Today' },
  { key: 'week', label: 'This week' },
  { key: 'next', label: 'Next steps' },
]

export function MyPlan() {
  const { state } = useApp()
  const totals = useMemo(
    () => planTotals(state.planSteps, state.completedSubSteps),
    [state.planSteps, state.completedSubSteps],
  )

  const upcoming = state.appointments
    .filter((a) => a.clientId === PRIMARY_CLIENT_ID)
    .slice()
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
    .slice(0, 3)

  const saved = state.savedResourceIds
    .map((id) => resourceById(id))
    .filter((r): r is NonNullable<typeof r> => Boolean(r))
    .slice(0, 3)

  const firstName = state.session?.name.split(' ')[0] ?? 'there'

  return (
    <>
      <PageHead
        eyebrow={`Your advocate · Renee Carter, Newark Reentry Coalition`}
        title={`Good morning, ${firstName}`}
        meta={`You've completed ${totals.done} of ${totals.total} steps. ${dueThisWeekLine(state.planSteps, state.completedSubSteps)}`}
        actions={
          <Link
            to="/app/messages"
            className="inline-flex items-center gap-2 rounded-[4px] border border-line-3 px-5 py-2.5 text-[13.5px] transition-colors hover:border-brass hover:text-brass"
          >
            <MessageSquare size={14} />
            Send a message
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr]">
        <div className="flex flex-col gap-8">
          {BUCKETS.map((bucket) => {
            const steps = state.planSteps.filter((s) => s.bucket === bucket.key)
            if (steps.length === 0) return null
            return (
              <div key={bucket.key} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="eyebrow">{bucket.label}</span>
                  <span className="text-[12px] text-ghost">
                    {steps.length} {steps.length === 1 ? 'step' : 'steps'}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {steps.map((step) => (
                    <StepCard key={step.id} step={step} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <aside className="flex flex-col gap-5">
          <Panel label="Your progress">
            <div className="flex flex-col gap-4">
              <div className="flex items-baseline justify-between">
                <span className="font-serif text-[30px] leading-none font-light">
                  {totals.done} of {totals.total}
                </span>
                <span className="font-mono text-[11.5px] text-faint">{totals.percent}%</span>
              </div>
              <Progress value={totals.percent} />
              <div className="text-[12.5px] text-faint">Started 6 weeks ago</div>
            </div>
          </Panel>

          <Panel label="Upcoming" bodyClassName="p-0">
            {upcoming.length === 0 ? (
              <div className="px-5 py-8 text-center text-[13px] text-ghost">
                Nothing scheduled yet.
              </div>
            ) : (
              upcoming.map((appt) => {
                const { day, month } = dayAndMonth(appt.startsAt)
                return (
                  <div
                    key={appt.id}
                    className="flex items-start gap-4 border-b border-line px-5 py-4 last:border-0"
                  >
                    <div className="flex w-9 shrink-0 flex-col items-center">
                      <span className="font-serif text-[19px] leading-none font-light">{day}</span>
                      <span className="font-mono text-[9.5px] text-faint">{month}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[13.5px]">{appt.title}</span>
                      <span className="text-[11.5px] text-faint">
                        {timeOf(appt.startsAt)} · {appt.withWhom}
                      </span>
                    </div>
                    {!appt.confirmed && <Badge tone="warn" className="ml-auto">To confirm</Badge>}
                  </div>
                )
              })
            )}
          </Panel>

          <Panel
            label="Saved resources"
            bodyClassName="p-0"
            action={
              <Link to="/app/saved" className="text-[12px] text-brass">
                View all
              </Link>
            }
          >
            {saved.length === 0 ? (
              <div className="px-5 py-8 text-center text-[13px] text-ghost">
                Nothing saved yet.
              </div>
            ) : (
              saved.map((resource) => (
                <Link
                  key={resource.id}
                  to={`/app/resources/${resource.id}`}
                  className="flex flex-col gap-1 border-b border-line px-5 py-4 transition-colors last:border-0 hover:bg-surface-2"
                >
                  <span className="text-[13.5px]">{resource.name}</span>
                  <span className="text-[11.5px] text-faint">
                    {resource.category} · {resource.city}
                  </span>
                </Link>
              ))
            )}
          </Panel>

          <Card tone="sunken" className="p-5">
            <div className="eyebrow-sm mb-3">BridgePoint Helper</div>
            <p className="text-[13px] leading-relaxed text-faint">
              &ldquo;What do I bring to the MVC?&rdquo; — ask anything about your plan, and I&rsquo;ll
              answer from verified information.
            </p>
          </Card>
        </aside>
      </div>
    </>
  )
}

function StepCard({ step }: { step: PlanStep }) {
  const { state, dispatch } = useApp()
  const notify = useToast()
  const doneSet = new Set(state.completedSubSteps)
  const done = step.subSteps.filter((s) => doneSet.has(s.id)).length
  const complete = step.subSteps.length > 0 && done === step.subSteps.length
  const [open, setOpen] = useState(!complete)

  const resources = step.resourceIds
    .map((id) => resourceById(id))
    .filter((r): r is NonNullable<typeof r> => Boolean(r))

  function toggle(subStepId: string, label: string) {
    const wasDone = doneSet.has(subStepId)
    dispatch({ type: 'toggleSubStep', subStepId })
    if (!wasDone) notify(`Completed: ${label}`)
  }

  return (
    <Card className={cn('overflow-hidden transition-colors', complete && 'border-[#3f5340]/50')}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer items-start gap-4 p-5 text-left"
      >
        <span
          className={cn(
            'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
            complete ? 'bg-ok text-ink' : 'border-[1.5px] border-line-3',
          )}
        >
          {complete && <Check size={12} strokeWidth={3} />}
        </span>

        <span className="flex flex-1 flex-col gap-2">
          <span className="flex flex-wrap items-center gap-3">
            <span className={cn('text-[15px]', complete && 'text-faint')}>{step.title}</span>
            <Badge tone={complete ? 'ok' : 'neutral'}>
              {done}/{step.subSteps.length}
            </Badge>
          </span>
          <span className="text-[13px] leading-[1.6] text-faint">{step.detail}</span>
          {step.meta && <span className="font-mono text-[11px] text-brass">{step.meta}</span>}
        </span>

        <ChevronDown
          size={16}
          className={cn('mt-1 shrink-0 text-faint transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div className="animate-fade border-t border-line px-5 py-5">
          <div className="flex flex-col gap-2.5">
            {step.subSteps.map((sub) => {
              const checked = doneSet.has(sub.id)
              return (
                <button
                  key={sub.id}
                  onClick={() => toggle(sub.id, sub.label)}
                  className="flex cursor-pointer items-center gap-3 rounded-[4px] px-2 py-2 text-left transition-colors hover:bg-surface-2"
                >
                  <span
                    className={cn(
                      'flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[3px] border transition-colors',
                      checked ? 'border-brass bg-brass text-ink' : 'border-line-3',
                    )}
                  >
                    {checked && <Check size={11} strokeWidth={3} />}
                  </span>
                  <span className={cn('text-[13.5px]', checked && 'text-ghost line-through')}>
                    {sub.label}
                  </span>
                </button>
              )
            })}
          </div>

          {resources.length > 0 && (
            <div className="mt-5 flex flex-col gap-2.5">
              <div className="eyebrow-sm">Verified resources for this step</div>
              {resources.map((resource) => (
                <ResourceRow key={resource.id} resource={resource} compact />
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  )
}

/** Counts the steps in the today and this-week buckets that are still open. */
function dueThisWeekLine(steps: PlanStep[], completed: string[]): string {
  const doneSet = new Set(completed)
  const open = steps.filter(
    (step) =>
      (step.bucket === 'today' || step.bucket === 'week') &&
      step.subSteps.some((sub) => !doneSet.has(sub.id)),
  ).length

  if (open === 0) return 'Nothing is due this week.'
  if (open === 1) return 'One thing is due this week.'
  return `${open} things are due this week.`
}

function timeOf(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }).toLowerCase()
}
