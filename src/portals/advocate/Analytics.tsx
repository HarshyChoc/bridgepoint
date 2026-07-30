import { PageHead } from '@/components/portal/PageHead'
import { Badge } from '@/components/ui/Badge'
import { Card, Panel } from '@/components/ui/Card'
import { MetricTile, Progress } from '@/components/ui/Bits'
import { BarChart, Gauge, RankedBars } from '@/components/ui/Charts'
import { ADVOCATES, CLIENTS } from '@/data/clients'
import { useApp } from '@/state/AppStateContext'

const OUTCOMES = [
  { label: 'Aug', value: 4 },
  { label: 'Sep', value: 5 },
  { label: 'Oct', value: 6 },
  { label: 'Nov', value: 4 },
  { label: 'Dec', value: 3 },
  { label: 'Jan', value: 7 },
  { label: 'Feb', value: 6 },
  { label: 'Mar', value: 8 },
  { label: 'Apr', value: 7 },
  { label: 'May', value: 9 },
  { label: 'Jun', value: 8 },
  { label: 'Jul', value: 9 },
]

const WORKLOAD = ADVOCATES.map((name) => ({
  name,
  clients: CLIENTS.filter((c) => c.advocate === name).length,
  urgent: CLIENTS.filter((c) => c.advocate === name && c.urgency === 'Urgent').length,
}))
const WORKLOAD_CEILING = Math.max(...WORKLOAD.map((row) => row.clients), 1)

export function AdvocateAnalytics() {
  const { state } = useApp()

  const accepted = state.referrals.filter((r) => r.status === 'Accepted' || r.status === 'Completed')
  const acceptanceRate = Math.round((accepted.length / Math.max(state.referrals.length, 1)) * 100)

  const gapCounts = CLIENTS.flatMap((c) => c.serviceGaps).reduce<Record<string, number>>(
    (acc, gap) => ({ ...acc, [gap]: (acc[gap] ?? 0) + 1 }),
    {},
  )
  const gapBars = Object.entries(gapCounts)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)

  const phaseCounts = CLIENTS.reduce<Record<string, number>>(
    (acc, c) => ({ ...acc, [c.phase]: (acc[c.phase] ?? 0) + 1 }),
    {},
  )

  return (
    <>
      <PageHead
        eyebrow="Newark Reentry Coalition"
        title="Analytics"
        meta="Rolling 12 months · figures feed the Workforce Innovation Grant report due Aug 15"
      />

      <div className="mb-6 grid gap-px overflow-hidden rounded-md border border-line-2 bg-line-2 sm:grid-cols-2 lg:grid-cols-4">
        <MetricTile
          label="Active clients"
          value={CLIENTS.length}
          hint={`Across ${new Set(CLIENTS.map((c) => c.county)).size} counties`}
          className="bg-surface"
        />
        <MetricTile label="Placements this year" value="76" hint="+18% year over year" className="bg-surface" />
        <MetricTile label="Referral acceptance" value={`${acceptanceRate}%`} hint="Network median 74%" className="bg-surface" />
        <MetricTile label="90-day employment" value="71%" hint="Still employed at 90 days" className="bg-surface" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Panel label="Placements by month">
          <BarChart data={OUTCOMES} />
        </Panel>

        <Panel label="Retention">
          <div className="flex flex-col gap-7">
            <Gauge value={90} label="90-day housing retention" />
            <Gauge value={87} label="365-day housing retention" />
          </div>
        </Panel>

        <Panel label="Service gaps across the caseload">
          {gapBars.length === 0 ? (
            <div className="py-8 text-center text-[13px] text-ghost">No gaps flagged.</div>
          ) : (
            <RankedBars data={gapBars} />
          )}
        </Panel>

        <Panel label="Supervisor workload view" bodyClassName="p-0">
          {WORKLOAD.map((row) => (
            <div key={row.name} className="flex flex-col gap-3 border-b border-line px-5 py-4 last:border-0">
              <div className="flex items-center justify-between">
                <span className="text-[13.5px]">{row.name}</span>
                <div className="flex items-center gap-2">
                  {row.urgent > 0 && <Badge tone="alert">{row.urgent} urgent</Badge>}
                  <span className="font-mono text-[11.5px] text-faint">{row.clients} clients</span>
                </div>
              </div>
              <Progress
                value={(row.clients / WORKLOAD_CEILING) * 100}
                tone={row.clients > WORKLOAD_CEILING * 0.8 ? 'brass' : 'ok'}
              />
            </div>
          ))}
        </Panel>

        <Card className="p-6 lg:col-span-2">
          <div className="eyebrow-sm mb-5">Caseload by phase</div>
          <div className="grid gap-px overflow-hidden rounded-[4px] border border-line-2 bg-line-2 sm:grid-cols-3 lg:grid-cols-6">
            {Object.entries(phaseCounts).map(([phase, count]) => (
              <div key={phase} className="flex flex-col gap-2 bg-surface px-5 py-5">
                <span className="font-serif text-[24px] leading-none font-light">{count}</span>
                <span className="text-[11.5px] text-faint">{phase}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}
