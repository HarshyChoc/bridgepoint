import { Display, Eyebrow, MetricTile } from '@/components/ui/Bits'
import { LinkButton } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { RankedBars } from '@/components/ui/Charts'
import { CheckList, ClosingCTA, Section, SectionHead } from '@/components/marketing/Section'
import { COUNTY_PERFORMANCE, STATEWIDE } from '@/data/analytics'

const DASHBOARD_ITEMS = [
  'Geographic service coverage and underserved areas',
  'Resource and voucher utilization',
  'Program outcomes by provider and county',
  'Grant compliance and funding performance',
  'Landlord participation and unit supply',
  'Service gaps and emerging community trends',
]

export function Government() {
  const placements = COUNTY_PERFORMANCE.filter((c) => c.placements > 0).map((c) => ({
    label: c.county,
    value: c.placements,
  }))

  return (
    <>
      <Section bordered={false} className="pt-20">
        <div className="flex max-w-3xl flex-col gap-7">
          <Eyebrow brass>For state and county agencies</Eyebrow>
          <Display as="h1" className="text-[40px] sm:text-[52px]">
            Outcome data you can act on, without a single new data-entry burden.
          </Display>
          <p className="text-[16.5px] leading-[1.65] text-muted">
            Placements, retention, time-to-housing, voucher utilization, and service gaps —
            aggregated across partners, privacy-protected, and designed to feed HMIS and DCA
            reporting rather than duplicate it.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-line-2 bg-line-2 sm:grid-cols-2 lg:grid-cols-4">
          <MetricTile
            label="Individuals served"
            value={STATEWIDE.individualsServed.toLocaleString()}
            className="bg-surface"
          />
          <MetricTile label="Housing placements" value={STATEWIDE.placements} className="bg-surface" />
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
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.4fr] lg:gap-16">
          <div className="flex flex-col gap-5">
            <SectionHead title="What the dashboard shows" />
            <div className="pt-2">
              <LinkButton to="/signin" variant="primary">
                Open the government dashboard
              </LinkButton>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <CheckList items={DASHBOARD_ITEMS} />
            <Card className="p-6">
              <div className="eyebrow-sm mb-6">Placements by county — last 12 months</div>
              <RankedBars data={placements} />
            </Card>
          </div>
        </div>
      </Section>

      <ClosingCTA
        line="A coordination layer that complements existing programs rather than competing with them."
        action="Request a briefing"
      />
    </>
  )
}
