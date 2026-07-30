import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import { PageHead } from '@/components/portal/PageHead'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, Panel } from '@/components/ui/Card'
import { MetricTile } from '@/components/ui/Bits'
import { BarChart, RankedBars } from '@/components/ui/Charts'
import {
  COUNTY_PERFORMANCE,
  GRANTS,
  PLACEMENTS_BY_MONTH,
  SERVICE_GAPS,
  STATEWIDE,
} from '@/data/analytics'
import { useToast } from '@/components/ui/Toast'

export function StatewideOverview() {
  const notify = useToast()

  const topCounties = COUNTY_PERFORMANCE.filter((c) => c.placements > 0)
    .slice(0, 6)
    .map((c) => ({ label: c.county, value: c.placements }))

  return (
    <>
      <Card tone="sunken" className="mb-6 flex items-start gap-4 p-5">
        <ShieldCheck size={16} className="mt-0.5 shrink-0 text-brass" />
        <div className="flex flex-col gap-1">
          <span className="eyebrow-sm text-brass">Privacy mode</span>
          <span className="text-[13px] leading-relaxed text-faint">
            All figures are aggregated. No individual records are exposed at this access level, and
            counties with fewer than five placements are suppressed rather than reported.
          </span>
        </div>
      </Card>

      <PageHead
        eyebrow="NJ Department of Community Affairs"
        title="Statewide overview"
        meta={`Rolling 12 months · ${STATEWIDE.counties} counties · ${STATEWIDE.organizations} participating organizations`}
        actions={
          <>
            <Button onClick={() => notify('Report period set to the last 12 months')}>
              Last 12 months
            </Button>
            <Button variant="primary" onClick={() => notify('HMIS export queued — ready in about two minutes')}>
              Export for HMIS
            </Button>
          </>
        }
      />

      <div className="mb-6 grid gap-px overflow-hidden rounded-md border border-line-2 bg-line-2 sm:grid-cols-2 lg:grid-cols-5">
        <MetricTile
          label="Individuals served"
          value={STATEWIDE.individualsServed.toLocaleString()}
          className="bg-surface"
        />
        <MetricTile label="Placements" value={STATEWIDE.placements} className="bg-surface" />
        <MetricTile
          label="365-day retention"
          value={`${STATEWIDE.retention365}%`}
          className="bg-surface"
        />
        <MetricTile
          label="Avg time to housing"
          value={`${STATEWIDE.avgDaysToHousing}d`}
          className="bg-surface"
        />
        <MetricTile
          label="Voucher utilization"
          value={`${STATEWIDE.voucherUtilization}%`}
          className="bg-surface"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Panel
          label="Placements by month"
          action={<Badge tone="ok">+{STATEWIDE.yoyPlacementChange}% year over year</Badge>}
        >
          <BarChart data={PLACEMENTS_BY_MONTH.map((m) => ({ label: m.month, value: m.value }))} />
        </Panel>

        <Panel
          label="Service gaps flagged"
          bodyClassName="p-0"
          action={
            <Link to="/admin/service-gaps" className="text-[12px] text-brass">
              Details
            </Link>
          }
        >
          {SERVICE_GAPS.map((gap) => (
            <div
              key={gap.id}
              className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 last:border-0"
            >
              <span className="text-[13.5px] text-text-2">
                {gap.label} — {gap.county}
              </span>
              <Badge tone={gap.severity === 'Critical' ? 'alert' : 'warn'}>{gap.severity}</Badge>
            </div>
          ))}
        </Panel>

        <Panel
          label="Placements by county"
          action={
            <Link to="/admin/counties" className="text-[12px] text-brass">
              All counties
            </Link>
          }
        >
          <RankedBars data={topCounties} />
        </Panel>

        <Panel
          label="Grant compliance"
          bodyClassName="p-0"
          action={
            <Link to="/admin/grants" className="text-[12px] text-brass">
              Details
            </Link>
          }
        >
          {GRANTS.map((grant) => (
            <div
              key={grant.id}
              className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 last:border-0"
            >
              <span className="text-[13px] text-text-2">{grant.name}</span>
              <Badge tone={grant.status === 'Reporting current' ? 'ok' : 'warn'}>
                {grant.status}
              </Badge>
            </div>
          ))}
        </Panel>
      </div>
    </>
  )
}
