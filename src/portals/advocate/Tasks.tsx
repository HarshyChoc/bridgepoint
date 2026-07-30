import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { PageHead } from '@/components/portal/PageHead'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { formatDate } from '@/lib/format'
import { useApp } from '@/state/AppStateContext'
import { useToast } from '@/components/ui/Toast'
import { cn } from '@/lib/cn'

interface TaskItem {
  id: string
  label: string
  clientId: string
  clientName: string
  due: string
  urgency: 'Overdue' | 'Today' | 'This week' | 'Scheduled'
  source: string
}

const TASKS: TaskItem[] = [
  {
    id: 'task-1',
    label: 'Submit furniture bank request before the Aug 2 move-in',
    clientId: 'c-ellis',
    clientName: 'Andre Ellis',
    due: '2026-07-31',
    urgency: 'Today',
    source: 'Service gap — furniture',
  },
  {
    id: 'task-2',
    label: 'Confirm PSE&G utility activation for Unit 1C',
    clientId: 'c-ellis',
    clientName: 'Andre Ellis',
    due: '2026-07-31',
    urgency: 'Today',
    source: 'Move-in checklist',
  },
  {
    id: 'task-3',
    label: 'Escalate Integrity House recovery intake by phone',
    clientId: 'c-nguyen',
    clientName: 'Robert Nguyen',
    due: '2026-07-30',
    urgency: 'Overdue',
    source: 'Referral stalled 11 days',
  },
  {
    id: 'task-4',
    label: 'Request employer income letter from Ironbound Workforce',
    clientId: 'c-reyes',
    clientName: 'Marcus Reyes',
    due: '2026-07-31',
    urgency: 'Today',
    source: 'Blocking housing application',
  },
  {
    id: 'task-5',
    label: 'Submit Section 8 preliminary application',
    clientId: 'c-reyes',
    clientName: 'Marcus Reyes',
    due: '2026-08-08',
    urgency: 'This week',
    source: 'County deadline',
  },
  {
    id: 'task-6',
    label: 'Retention check-in call at the 90-day mark',
    clientId: 'c-brooks',
    clientName: 'Tanya Brooks',
    due: '2026-08-03',
    urgency: 'This week',
    source: 'Contact lapsed 9 days',
  },
  {
    id: 'task-7',
    label: 'Re-offer Bridgeway behavioral health referral',
    clientId: 'c-brooks',
    clientName: 'Tanya Brooks',
    due: '2026-08-03',
    urgency: 'This week',
    source: 'Declined Jun 30',
  },
  {
    id: 'task-8',
    label: 'Push Union County landlords for an inspection date',
    clientId: 'c-whitfield',
    clientName: 'Samuel Whitfield',
    due: '2026-08-14',
    urgency: 'Scheduled',
    source: 'Voucher expires Sep 3',
  },
  {
    id: 'task-9',
    label: 'Complete Hudson County coordinated entry assessment',
    clientId: 'c-alvarez',
    clientName: 'Jasmine Alvarez',
    due: '2026-07-31',
    urgency: 'Today',
    source: 'Generated at intake',
  },
  {
    id: 'task-10',
    label: 'Refer to Passaic workforce before the subsidy step-down',
    clientId: 'c-dawson',
    clientName: 'Priya Dawson',
    due: '2026-08-20',
    urgency: 'Scheduled',
    source: 'AI recommendation',
  },
]

const GROUPS: Array<TaskItem['urgency']> = ['Overdue', 'Today', 'This week', 'Scheduled']

export function Tasks() {
  const notify = useToast()
  const { state } = useApp()
  const [completed, setCompleted] = useState<string[]>([])

  const openCount = TASKS.length - completed.length

  function toggle(task: TaskItem) {
    const wasDone = completed.includes(task.id)
    setCompleted((current) =>
      wasDone ? current.filter((id) => id !== task.id) : [...current, task.id],
    )
    if (!wasDone) notify(`Completed: ${task.label}`)
  }

  return (
    <>
      <PageHead
        eyebrow={state.session?.org ?? 'Newark Reentry Coalition'}
        title="Tasks"
        meta={`${openCount} open · derived from case deadlines, stalled referrals, and service gaps`}
      />

      <div className="flex flex-col gap-8">
        {GROUPS.map((group) => {
          const rows = TASKS.filter((t) => t.urgency === group)
          if (rows.length === 0) return null

          return (
            <div key={group} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="eyebrow">{group}</span>
                <Badge tone={group === 'Overdue' ? 'alert' : group === 'Today' ? 'warn' : 'neutral'}>
                  {rows.filter((r) => !completed.includes(r.id)).length} open
                </Badge>
              </div>

              <div className="flex flex-col gap-2.5">
                {rows.map((task) => {
                  const done = completed.includes(task.id)
                  return (
                    <Card
                      key={task.id}
                      className={cn('flex items-start gap-4 p-5', done && 'opacity-55')}
                    >
                      <button
                        onClick={() => toggle(task)}
                        aria-label={done ? 'Mark as open' : 'Mark as complete'}
                        className={cn(
                          'mt-0.5 flex h-[19px] w-[19px] shrink-0 cursor-pointer items-center justify-center rounded-[3px] border transition-colors',
                          done ? 'border-brass bg-brass text-ink' : 'border-line-3 hover:border-brass',
                        )}
                      >
                        {done && <Check size={12} strokeWidth={3} />}
                      </button>

                      <div className="flex flex-1 flex-col gap-1.5">
                        <span className={cn('text-[14px]', done && 'text-ghost line-through')}>
                          {task.label}
                        </span>
                        <div className="flex flex-wrap items-center gap-3 text-[11.5px] text-faint">
                          <Link
                            to={`/advocate/caseload/${task.clientId}`}
                            className="transition-colors hover:text-brass"
                          >
                            {task.clientName}
                          </Link>
                          <span>·</span>
                          <span>{task.source}</span>
                        </div>
                      </div>

                      <span className="shrink-0 font-mono text-[10.5px] text-ghost">
                        {formatDate(task.due)}
                      </span>
                    </Card>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
