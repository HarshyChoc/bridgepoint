import { PageHead } from '@/components/portal/PageHead'
import { StatusBadge } from '@/components/ui/Badge'
import { Card, Panel } from '@/components/ui/Card'
import { MetricTile } from '@/components/ui/Bits'
import { INCENTIVES } from '@/data/landlord'
import { currency } from '@/lib/format'

const PROGRAM_NOTES = [
  {
    label: 'Signing bonus',
    detail:
      '$1,400 paid within 30 days of a signed lease with a tenant referred through a partner organization.',
  },
  {
    label: 'Vacancy hold',
    detail:
      '$1,400 for holding a unit up to 21 days while inspection and lease signing are coordinated.',
  },
  {
    label: 'Damage mitigation fund',
    detail:
      'Up to $2,500 per unit for repairs beyond the security deposit, claimable for the life of the tenancy.',
  },
  {
    label: 'Retention bonus',
    detail: '$1,400 at the 365-day mark when a tenancy remains in good standing.',
  },
]

export function Payments() {
  const paid = INCENTIVES.filter((i) => i.status === 'Paid').reduce((s, i) => s + i.amount, 0)
  const processing = INCENTIVES.filter((i) => i.status === 'Processing').reduce(
    (s, i) => s + i.amount,
    0,
  )
  const eligible = INCENTIVES.filter((i) => i.status === 'Eligible').reduce(
    (s, i) => s + i.amount,
    0,
  )

  return (
    <>
      <PageHead
        eyebrow="Landlord incentive program"
        title="Payments"
        meta="Payments are issued by the county and tracked here end to end"
      />

      <div className="mb-6 grid gap-px overflow-hidden rounded-md border border-line-2 bg-line-2 sm:grid-cols-3">
        <MetricTile label="Paid this year" value={currency(paid)} className="bg-surface" />
        <MetricTile label="Processing" value={currency(processing)} className="bg-surface" />
        <MetricTile label="Eligible, unclaimed" value={currency(eligible)} className="bg-surface" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Panel label="Payment history" bodyClassName="p-0">
          {INCENTIVES.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 last:border-0"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[13.5px]">{payment.label}</span>
                <span className="text-[11.5px] text-faint">{payment.unit}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[13px] text-text-2">
                  {currency(payment.amount)}
                </span>
                <StatusBadge status={payment.status} />
              </div>
            </div>
          ))}
        </Panel>

        <Card className="flex flex-col gap-5 p-6">
          <div className="eyebrow-sm">What you can claim</div>
          {PROGRAM_NOTES.map((note) => (
            <div key={note.label} className="flex flex-col gap-1.5 border-b border-line pb-4 last:border-0 last:pb-0">
              <span className="text-[13.5px]">{note.label}</span>
              <span className="text-[12.5px] leading-relaxed text-faint">{note.detail}</span>
            </div>
          ))}
        </Card>
      </div>
    </>
  )
}
