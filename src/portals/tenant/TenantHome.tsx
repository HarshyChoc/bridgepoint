import { Link } from 'react-router-dom'
import { AlertCircle, ArrowRight } from 'lucide-react'
import { PageHead } from '@/components/portal/PageHead'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, Panel } from '@/components/ui/Card'
import { COMMUNITY_EVENTS, LEARN_MODULES, RETENTION_MILESTONES, TENANCY } from '@/data/tenant'
import { currency, formatDate } from '@/lib/format'
import { useToast } from '@/components/ui/Toast'

export function TenantHome() {
  const notify = useToast()

  return (
    <>
      <PageHead
        eyebrow={`Housed since ${TENANCY.housedSinceMonths} months · next check-in: ${TENANCY.nextReview}`}
        title="You're home. Let's keep it that way."
        meta={`${TENANCY.address} · Lease through ${TENANCY.leaseThrough}`}
      />

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="flex flex-col gap-5">
          <Card className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
            <div className="flex flex-1 flex-col gap-2">
              <div className="eyebrow-sm">Rent due</div>
              <div className="font-serif text-[30px] leading-none font-light">
                {currency(TENANCY.rent)}
              </div>
              <div className="text-[13px] text-faint">
                Due {formatDate(TENANCY.rentDue)} · reminder set for {formatDate(TENANCY.reminderOn)}
              </div>
            </div>
            <Button
              variant="brass"
              className="shrink-0"
              onClick={() => notify('Autopay set up — reminders will continue three days before')}
            >
              Set up autopay
            </Button>
          </Card>

          <Panel label="Keeping stable" bodyClassName="p-0">
            {LEARN_MODULES.map((module) => (
              <Link
                key={module.id}
                to="/tenant/learn"
                className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 transition-colors last:border-0 hover:bg-surface-2"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[14px]">{module.title}</span>
                  <span className="text-[12.5px] text-faint">{module.blurb}</span>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="font-mono text-[10.5px] text-ghost">{module.minutes} min</span>
                  <ArrowRight size={14} className="text-faint" />
                </div>
              </Link>
            ))}
          </Panel>

          <Card className="flex flex-col gap-4 border-[#5b3833]/60 p-6">
            <div className="flex items-center gap-3">
              <AlertCircle size={16} className="text-alert" />
              <span className="eyebrow-sm text-alert">If something goes wrong</span>
            </div>
            <p className="max-w-2xl text-[14px] leading-relaxed text-text-2">
              Late on rent, a repair ignored, or an eviction notice — tell us early and an advocate
              steps in the same day. Nothing you report here affects your lease.
            </p>
            <Button
              variant="danger"
              className="self-start"
              onClick={() => notify('Renee Carter has been alerted and will call you today')}
            >
              Get help now
            </Button>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Panel label="Retention milestones" bodyClassName="p-0">
            {RETENTION_MILESTONES.map((milestone) => (
              <div
                key={milestone.label}
                className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 last:border-0"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[13.5px]">{milestone.label}</span>
                  <span className="font-mono text-[10.5px] text-ghost">
                    {formatDate(milestone.on)}
                  </span>
                </div>
                <Badge
                  tone={
                    milestone.status === 'Complete'
                      ? 'ok'
                      : milestone.status === 'Scheduled'
                        ? 'warn'
                        : 'neutral'
                  }
                >
                  {milestone.status}
                </Badge>
              </div>
            ))}
          </Panel>

          <Panel
            label="Coming up nearby"
            bodyClassName="p-0"
            action={
              <Link to="/tenant/community" className="text-[12px] text-brass">
                All events
              </Link>
            }
          >
            {COMMUNITY_EVENTS.slice(0, 3).map((event) => (
              <div key={event.id} className="flex flex-col gap-1 border-b border-line px-5 py-4 last:border-0">
                <span className="text-[13.5px]">{event.title}</span>
                <span className="text-[11.5px] text-faint">
                  {formatDate(event.when)} · {event.where}
                </span>
              </div>
            ))}
          </Panel>

          <Card tone="sunken" className="flex flex-col gap-2 p-5">
            <div className="eyebrow-sm">Your advocate</div>
            <div className="text-[14px]">{TENANCY.advocate}</div>
            <p className="text-[12.5px] leading-relaxed text-faint">
              Still yours through the 365-day review. Message any time — there is no case to reopen.
            </p>
          </Card>
        </div>
      </div>
    </>
  )
}
