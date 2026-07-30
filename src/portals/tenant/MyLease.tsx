import { PageHead } from '@/components/portal/PageHead'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, Panel } from '@/components/ui/Card'
import { KeyValue } from '@/components/ui/Bits'
import { TENANCY } from '@/data/tenant'
import { currency } from '@/lib/format'
import { useToast } from '@/components/ui/Toast'

const TERMS = [
  { label: 'Monthly rent', value: currency(TENANCY.rent) },
  { label: 'Lease through', value: TENANCY.leaseThrough },
  { label: 'Security deposit', value: `${currency(2400)} held in escrow` },
  { label: 'Utilities included', value: 'Heat and hot water' },
  { label: 'Landlord', value: TENANCY.landlord },
  { label: 'Renewal notice', value: '60 days before the end of term' },
]

const RESPONSIBILITIES = [
  { who: 'You', items: ['Rent by the 5th', 'Electricity and internet', 'Report repairs promptly', 'Keep the unit habitable'] },
  {
    who: 'Your landlord',
    items: ['Heat and hot water', 'Structural repairs', 'Appliance repairs', '24 hours notice before entry'],
  },
]

export function MyLease() {
  const notify = useToast()

  return (
    <>
      <PageHead
        eyebrow="Your tenancy"
        title="My lease"
        meta={TENANCY.address}
        actions={
          <Button onClick={() => notify('A copy has been sent to your documents')}>
            Download a copy
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Panel label="Lease terms">
          <div className="grid gap-6 sm:grid-cols-2">
            {TERMS.map((term) => (
              <KeyValue key={term.label} label={term.label} value={term.value} />
            ))}
          </div>
        </Panel>

        <Panel label="Who is responsible for what" bodyClassName="p-0">
          {RESPONSIBILITIES.map((group) => (
            <div key={group.who} className="border-b border-line px-5 py-5 last:border-0">
              <div className="eyebrow-sm mb-3">{group.who}</div>
              <div className="flex flex-col gap-2.5">
                {group.items.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-[13.5px] text-text-2">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-brass" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Panel>
      </div>

      <Card tone="sunken" className="mt-6 flex flex-col gap-4 p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="eyebrow-sm">Renewal</span>
          <Badge tone="neutral">8 months out</Badge>
        </div>
        <p className="max-w-3xl text-[14px] leading-relaxed text-text-2">
          Your landlord must give 60 days notice before the end of term. If a renewal comes with a
          rent increase you cannot cover, tell your advocate as soon as it arrives — rental
          assistance decisions take longer than 60 days, and starting early is the difference.
        </p>
        <Button
          variant="outline"
          className="self-start"
          onClick={() => notify('Renee has been asked to review your renewal timeline')}
        >
          Ask about renewal
        </Button>
      </Card>
    </>
  )
}
