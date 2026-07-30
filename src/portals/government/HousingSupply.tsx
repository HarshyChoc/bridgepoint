import { PageHead } from '@/components/portal/PageHead'
import { Card, Panel } from '@/components/ui/Card'
import { MetricTile } from '@/components/ui/Bits'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { RankedBars } from '@/components/ui/Charts'
import { HOUSING_SUPPLY } from '@/data/analytics'
import { currency } from '@/lib/format'

type Row = (typeof HOUSING_SUPPLY)[number]

const COLUMNS: Array<Column<Row>> = [
  { key: 'county', header: 'County', render: (row) => row.county },
  { key: 'units', header: 'Enrolled units', align: 'right', render: (row) => row.enrolledUnits },
  { key: 'vacant', header: 'Vacant', align: 'right', render: (row) => row.vacant },
  { key: 'landlords', header: 'Landlords', align: 'right', render: (row) => row.landlords },
  { key: 'rent', header: 'Avg rent', align: 'right', render: (row) => currency(row.avgRent) },
  {
    key: 'perLandlord',
    header: 'Units per landlord',
    align: 'right',
    render: (row) => (row.enrolledUnits / row.landlords).toFixed(1),
  },
]

export function HousingSupply() {
  const totalUnits = HOUSING_SUPPLY.reduce((sum, r) => sum + r.enrolledUnits, 0)
  const totalVacant = HOUSING_SUPPLY.reduce((sum, r) => sum + r.vacant, 0)
  const totalLandlords = HOUSING_SUPPLY.reduce((sum, r) => sum + r.landlords, 0)

  return (
    <>
      <PageHead
        eyebrow="Landlord participation"
        title="Housing supply"
        meta="Enrolled units are the binding constraint in three counties, not funding"
      />

      <div className="mb-6 grid gap-px overflow-hidden rounded-md border border-line-2 bg-line-2 sm:grid-cols-2 lg:grid-cols-4">
        <MetricTile label="Enrolled units" value={totalUnits} className="bg-surface" />
        <MetricTile label="Currently vacant" value={totalVacant} className="bg-surface" />
        <MetricTile label="Participating landlords" value={totalLandlords} className="bg-surface" />
        <MetricTile
          label="Vacancy rate"
          value={`${Math.round((totalVacant / totalUnits) * 100)}%`}
          hint="Healthy range is 8–12%"
          className="bg-surface"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card className="overflow-hidden">
          <DataTable columns={COLUMNS} rows={HOUSING_SUPPLY} rowKey={(row) => row.county} />
        </Card>

        <Panel label="Enrolled units by county">
          <RankedBars
            data={HOUSING_SUPPLY.map((r) => ({ label: r.county, value: r.enrolledUnits }))}
          />
        </Panel>
      </div>
    </>
  )
}
