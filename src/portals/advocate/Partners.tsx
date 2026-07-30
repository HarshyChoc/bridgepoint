import { Phone } from 'lucide-react'
import { PageHead } from '@/components/portal/PageHead'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Progress } from '@/components/ui/Bits'
import { PARTNERS } from '@/data/casework'
import { useApp } from '@/state/AppStateContext'

export function Partners() {
  const { state } = useApp()

  return (
    <>
      <PageHead
        eyebrow="Partner directory"
        title="Partner organizations"
        meta={`${PARTNERS.length} organizations · acceptance rate and response time measured over the last 12 months`}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {PARTNERS.map((partner) => {
          const live = state.referrals.filter(
            (r) => r.org === partner.name && ['Sent', 'Pending', 'Draft'].includes(r.status),
          ).length

          return (
            <Card key={partner.id} className="flex flex-col gap-5 p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[15.5px]">{partner.name}</span>
                  <span className="text-[12px] text-faint">
                    {partner.county} County · {partner.contact}
                  </span>
                </div>
                <Badge tone="brass">{partner.focus}</Badge>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-muted">Acceptance rate</span>
                  <span className="font-mono text-faint">{partner.acceptanceRate}%</span>
                </div>
                <Progress
                  value={partner.acceptanceRate}
                  tone={partner.acceptanceRate >= 75 ? 'ok' : 'brass'}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-line pt-4">
                <div className="flex flex-col gap-1">
                  <span className="eyebrow-sm">Open referrals</span>
                  <span className="font-serif text-[21px] leading-none font-light">
                    {live || partner.activeReferrals}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="eyebrow-sm">Median response</span>
                  <span className="font-serif text-[21px] leading-none font-light">
                    {partner.avgResponseHrs}h
                  </span>
                </div>
              </div>

              <a
                href={`tel:${partner.phone.replace(/\D/g, '')}`}
                className="inline-flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-brass"
              >
                <Phone size={13} /> {partner.phone}
              </a>
            </Card>
          )
        })}
      </div>
    </>
  )
}
