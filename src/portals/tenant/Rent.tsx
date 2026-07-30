import { useState } from 'react'
import { PageHead } from '@/components/portal/PageHead'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, Panel } from '@/components/ui/Card'
import { MetricTile } from '@/components/ui/Bits'
import { TENANCY } from '@/data/tenant'
import { currency, formatDate } from '@/lib/format'
import { useToast } from '@/components/ui/Toast'

const HISTORY = [
  { month: 'July 2026', paid: '2026-07-01', amount: 1600, status: 'Paid on time' },
  { month: 'June 2026', paid: '2026-06-02', amount: 1600, status: 'Paid on time' },
  { month: 'May 2026', paid: '2026-05-01', amount: 1600, status: 'Paid on time' },
  { month: 'April 2026', paid: '2026-04-06', amount: 1600, status: 'Paid late' },
]

export function Rent() {
  const notify = useToast()
  const [autopay, setAutopay] = useState(false)

  const onTime = HISTORY.filter((h) => h.status === 'Paid on time').length

  return (
    <>
      <PageHead
        eyebrow="Payments"
        title="Rent"
        meta={`Next payment of ${currency(TENANCY.rent)} due ${formatDate(TENANCY.rentDue)}`}
        actions={
          <Button
            variant={autopay ? 'outline' : 'brass'}
            onClick={() => {
              setAutopay((v) => !v)
              notify(autopay ? 'Autopay turned off' : 'Autopay scheduled for the 1st of each month')
            }}
          >
            {autopay ? 'Autopay is on' : 'Set up autopay'}
          </Button>
        }
      />

      <div className="mb-6 grid gap-px overflow-hidden rounded-md border border-line-2 bg-line-2 sm:grid-cols-3">
        <MetricTile label="Monthly rent" value={currency(TENANCY.rent)} className="bg-surface" />
        <MetricTile
          label="On-time record"
          value={`${onTime}/${HISTORY.length}`}
          hint="Reported to your rental history"
          className="bg-surface"
        />
        <MetricTile
          label="Reminder"
          value={formatDate(TENANCY.reminderOn)}
          hint="Three days before due"
          className="bg-surface"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Panel label="Payment history" bodyClassName="p-0">
          {HISTORY.map((row) => (
            <div
              key={row.month}
              className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 last:border-0"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[13.5px]">{row.month}</span>
                <span className="font-mono text-[10.5px] text-ghost">{formatDate(row.paid)}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[13px] text-text-2">{currency(row.amount)}</span>
                <Badge tone={row.status === 'Paid on time' ? 'ok' : 'warn'}>{row.status}</Badge>
              </div>
            </div>
          ))}
        </Panel>

        <Card className="flex flex-col gap-4 p-6">
          <div className="eyebrow-sm">If rent is going to be short</div>
          <p className="text-[13.5px] leading-relaxed text-faint">
            Emergency rental assistance takes two to three weeks to process, so the week you know is
            the week to ask — not the week it is due. Telling us early does not affect your lease and
            is not reported to your landlord until you approve it.
          </p>
          <Button
            variant="outline"
            className="self-start"
            onClick={() => notify('Rental assistance request opened — Renee will call today')}
          >
            Request rental assistance
          </Button>
        </Card>
      </div>
    </>
  )
}
