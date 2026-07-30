import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowRight, Sparkles, X } from 'lucide-react'
import { PageHead } from '@/components/portal/PageHead'
import { Badge, StatusBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, Panel } from '@/components/ui/Card'
import { MetricTile, Progress } from '@/components/ui/Bits'
import { CLIENTS } from '@/data/clients'
import { abbreviateName, relativeFromNow } from '@/lib/format'
import { useApp } from '@/state/AppStateContext'
import { useToast } from '@/components/ui/Toast'
import { planTotals } from '@/lib/recommend'
import { PRIMARY_CLIENT_ID } from '@/data/clients'

const PRIORITIES = [
  {
    id: 'pri-ellis',
    clientId: 'c-ellis',
    who: 'Andre Ellis',
    what: 'Moves in Aug 2 with no furniture assistance secured and utilities not activated.',
    when: 'Two days out',
  },
  {
    id: 'pri-nguyen',
    clientId: 'c-nguyen',
    who: 'Robert Nguyen',
    what: 'Shelter stay limit Aug 12. Recovery intake pending at Integrity House since Jul 19.',
    when: 'Escalate today',
  },
  {
    id: 'pri-reyes',
    clientId: 'c-reyes',
    who: 'Marcus Reyes',
    what: 'Section 8 preliminary application closes Aug 8, blocked on an employer income letter.',
    when: 'Hard deadline',
  },
  {
    id: 'pri-brooks',
    clientId: 'c-brooks',
    who: 'Tanya Brooks',
    what: 'Contact lapsed 9 days at the 90-day mark; June behavioral health referral never re-offered.',
    when: 'This week',
  },
]

export function AdvocateDashboard() {
  const { state, dispatch } = useApp()
  const notify = useToast()

  const openReferrals = state.referrals.filter((r) =>
    ['Sent', 'Pending', 'Draft'].includes(r.status),
  )
  const docsToReview = state.documents.filter((d) => d.status === 'Review' || d.status === 'Uploaded')
  const serviceGaps = CLIENTS.reduce((sum, c) => sum + c.serviceGaps.length, 0)
  const marcusTotals = planTotals(state.planSteps, state.completedSubSteps)

  const insightDismissed = state.dismissedInsights.includes('daily-brief')
  const visiblePriorities = PRIORITIES.filter((p) => !state.dismissedInsights.includes(p.id))

  return (
    <>
      <PageHead
        eyebrow="Newark Reentry Coalition"
        title="Good morning, Renee"
        meta={`${CLIENTS.length} active clients · ${openReferrals.length} open referrals · ${serviceGaps} service gaps flagged`}
        actions={
          <>
            <Link
              to="/advocate/caseload"
              className="inline-flex items-center gap-2 rounded-[4px] border border-line-3 px-5 py-2.5 text-[13.5px] transition-colors hover:border-brass hover:text-brass"
            >
              Open caseload
            </Link>
            <Link
              to="/advocate/referrals"
              className="inline-flex items-center gap-2 rounded-[4px] bg-text px-5 py-2.5 text-[13.5px] font-medium text-ink transition-colors hover:bg-white"
            >
              Create a referral
            </Link>
          </>
        }
      />

      <div className="mb-6 grid gap-px overflow-hidden rounded-md border border-line-2 bg-line-2 sm:grid-cols-2 lg:grid-cols-4">
        <MetricTile
          label="Active clients"
          value={CLIENTS.length}
          hint={`Across ${new Set(CLIENTS.map((c) => c.county)).size} counties`}
          className="bg-surface"
        />
        <MetricTile
          label="Open referrals"
          value={openReferrals.length}
          hint={`${state.referrals.filter((r) => r.status === 'Accepted').length} accepted this period`}
          className="bg-surface"
        />
        <MetricTile
          label="Documents to review"
          value={docsToReview.length}
          hint="Oldest waiting 2 days"
          className="bg-surface"
        />
        <MetricTile
          label="Service gaps"
          value={serviceGaps}
          hint="Transportation is the most common"
          className="bg-surface"
        />
      </div>

      {!insightDismissed && (
        <Card tone="sunken" className="mb-6 overflow-hidden">
          <div className="flex items-start gap-4 border-b border-line px-6 py-4">
            <Sparkles size={16} className="mt-0.5 text-brass" />
            <div className="flex flex-1 flex-col gap-1">
              <div className="eyebrow-sm text-brass">AI daily brief</div>
              <div className="text-[12px] text-ghost">Generated 6 minutes ago from 34 case records</div>
            </div>
            <button
              onClick={() => dispatch({ type: 'dismissInsight', insightId: 'daily-brief' })}
              aria-label="Dismiss brief"
              className="cursor-pointer rounded p-1 text-ghost transition-colors hover:text-text"
            >
              <X size={15} />
            </button>
          </div>
          <div className="px-6 py-5">
            <p className="max-w-4xl text-[14.5px] leading-[1.7] text-text-2">
              Four clients need action before Friday, and three of the four are blocked on someone
              else rather than on you. Marcus Reyes and Robert Nguyen are both waiting on partner
              organizations; Andre Ellis needs a same-week furniture referral before his Aug 2
              move-in. Tanya Brooks is the only one where the next step is simply a phone call.
            </p>
          </div>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Panel
          label="Needs attention"
          bodyClassName="p-0"
          action={<Badge tone="alert">{visiblePriorities.length} items</Badge>}
        >
          {visiblePriorities.length === 0 ? (
            <div className="px-6 py-12 text-center text-[13px] text-ghost">
              Nothing outstanding. Everything on the caseload is on track.
            </div>
          ) : (
            visiblePriorities.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 border-b border-line px-6 py-5 last:border-0"
              >
                <AlertTriangle size={15} className="mt-1 shrink-0 text-brass" />
                <div className="flex flex-1 flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      to={`/advocate/caseload/${item.clientId}`}
                      className="text-[14.5px] transition-colors hover:text-brass"
                    >
                      {item.who}
                    </Link>
                    <Badge tone="warn">{item.when}</Badge>
                  </div>
                  <p className="text-[13px] leading-relaxed text-faint">{item.what}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    dispatch({ type: 'dismissInsight', insightId: item.id })
                    notify(`${item.who} marked as handled`)
                  }}
                >
                  Handled
                </Button>
              </div>
            ))
          )}
        </Panel>

        <div className="flex flex-col gap-5">
          <Panel
            label="Live client progress"
            action={
              <Link to={`/advocate/caseload/${PRIMARY_CLIENT_ID}`} className="text-[12px] text-brass">
                Open case
              </Link>
            }
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-baseline justify-between">
                <span className="text-[14.5px]">Marcus Reyes</span>
                <span className="font-mono text-[11.5px] text-faint">
                  {marcusTotals.done}/{marcusTotals.total}
                </span>
              </div>
              <Progress value={marcusTotals.percent} />
              <p className="text-[12.5px] leading-relaxed text-ghost">
                Synced live from Marcus&rsquo;s app. Steps he completes appear here without anyone
                re-entering them.
              </p>
            </div>
          </Panel>

          <Panel label="Recent activity" bodyClassName="p-0">
            {state.referrals.slice(0, 5).map((referral) => (
              <div
                key={referral.id}
                className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5 last:border-0"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[13px]">{abbreviateName(referral.clientName)}</span>
                  <span className="text-[11.5px] text-faint">
                    {referral.org} · {relativeFromNow(referral.updatedOn)}
                  </span>
                </div>
                <StatusBadge status={referral.status} />
              </div>
            ))}
          </Panel>

          <Link
            to="/advocate/analytics"
            className="flex items-center justify-between gap-4 rounded-md border border-line-2 bg-surface px-5 py-4 text-[13.5px] transition-colors hover:border-brass hover:text-brass"
          >
            View caseload analytics
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </>
  )
}
