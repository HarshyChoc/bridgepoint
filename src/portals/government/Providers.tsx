import { PageHead } from '@/components/portal/PageHead'
import { Card } from '@/components/ui/Card'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { PROVIDER_PERFORMANCE } from '@/data/analytics'

type Row = (typeof PROVIDER_PERFORMANCE)[number]

const COLUMNS: Array<Column<Row>> = [
  { key: 'org', header: 'Organization', render: (row) => row.org },
  { key: 'county', header: 'County', render: (row) => row.county },
  { key: 'clients', header: 'Clients served', align: 'right', render: (row) => row.clients },
  { key: 'placements', header: 'Placements', align: 'right', render: (row) => row.placements },
  {
    key: 'rate',
    header: 'Placement rate',
    align: 'right',
    render: (row) => `${Math.round((row.placements / row.clients) * 100)}%`,
  },
  { key: 'retention', header: '365-day retention', align: 'right', render: (row) => `${row.retention}%` },
]

export function Providers() {
  const totalClients = PROVIDER_PERFORMANCE.reduce((sum, p) => sum + p.clients, 0)
  const totalPlacements = PROVIDER_PERFORMANCE.reduce((sum, p) => sum + p.placements, 0)

  return (
    <>
      <PageHead
        eyebrow="Program outcomes"
        title="Providers"
        meta={`${PROVIDER_PERFORMANCE.length} organizations · ${totalClients.toLocaleString()} clients · ${totalPlacements} placements`}
      />

      <Card className="overflow-hidden">
        <DataTable columns={COLUMNS} rows={PROVIDER_PERFORMANCE} rowKey={(row) => row.org} />
      </Card>

      <Card tone="sunken" className="mt-6 p-6">
        <div className="eyebrow-sm mb-3">Reading these numbers fairly</div>
        <p className="max-w-3xl text-[13.5px] leading-relaxed text-faint">
          Placement rate is not a quality ranking on its own. Organizations serving higher-acuity
          referrals will place a smaller share and hold them longer — which is the outcome the
          funding is meant to buy. Retention is the closer proxy for whether the placement held.
        </p>
      </Card>
    </>
  )
}
