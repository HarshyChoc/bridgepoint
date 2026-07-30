import { PageHead } from '@/components/portal/PageHead'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { COUNTY_PERFORMANCE } from '@/data/analytics'
import type { CountyPerformance } from '@/data/types'

const COLUMNS: Array<Column<CountyPerformance>> = [
  { key: 'county', header: 'County', render: (row) => row.county },
  {
    key: 'placements',
    header: 'Placements',
    align: 'right',
    render: (row) => (row.placements === 0 ? <Badge tone="neutral">Suppressed</Badge> : row.placements),
  },
  {
    key: 'retention',
    header: '365-day retention',
    align: 'right',
    render: (row) => (row.retention === 0 ? '—' : `${row.retention}%`),
  },
  {
    key: 'avgDays',
    header: 'Avg days to housing',
    align: 'right',
    render: (row) => (row.avgDays === 0 ? '—' : `${row.avgDays}d`),
  },
  { key: 'organizations', header: 'Organizations', align: 'right', render: (row) => row.organizations },
]

export function Counties() {
  const reporting = COUNTY_PERFORMANCE.filter((c) => c.placements > 0)
  const suppressed = COUNTY_PERFORMANCE.length - reporting.length

  return (
    <>
      <PageHead
        eyebrow="Geographic coverage"
        title="Counties"
        meta={`${reporting.length} counties reporting · ${suppressed} suppressed for small cell size`}
      />

      <Card className="overflow-hidden">
        <DataTable columns={COLUMNS} rows={COUNTY_PERFORMANCE} rowKey={(row) => row.county} />
      </Card>

      <Card tone="sunken" className="mt-6 p-6">
        <div className="eyebrow-sm mb-3">Why some counties show no figures</div>
        <p className="max-w-3xl text-[13.5px] leading-relaxed text-faint">
          Counties with fewer than five placements in the reporting period are suppressed rather than
          published, because a small enough cell can identify an individual. Those counties still
          appear so a gap in coverage is visible rather than hidden.
        </p>
      </Card>
    </>
  )
}
