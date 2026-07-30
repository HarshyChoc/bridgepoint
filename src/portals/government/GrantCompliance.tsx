import { PageHead } from '@/components/portal/PageHead'
import { StatusBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { MetricTile, Progress } from '@/components/ui/Bits'
import { GRANTS } from '@/data/analytics'
import { currency, formatDate } from '@/lib/format'
import { useToast } from '@/components/ui/Toast'

export function GrantCompliance() {
  const notify = useToast()

  const awarded = GRANTS.reduce((sum, g) => sum + g.awarded, 0)
  const drawn = GRANTS.reduce((sum, g) => sum + g.drawn, 0)
  const dueSoon = GRANTS.filter((g) => g.status !== 'Reporting current').length

  return (
    <>
      <PageHead
        eyebrow="Funding performance"
        title="Grant compliance"
        meta={`${GRANTS.length} active grants · ${dueSoon} report${dueSoon === 1 ? '' : 's'} due within 30 days`}
        actions={
          <Button variant="primary" onClick={() => notify('Compliance packet generated')}>
            Generate compliance packet
          </Button>
        }
      />

      <div className="mb-6 grid gap-px overflow-hidden rounded-md border border-line-2 bg-line-2 sm:grid-cols-3">
        <MetricTile label="Total awarded" value={currency(awarded)} className="bg-surface" />
        <MetricTile label="Drawn to date" value={currency(drawn)} className="bg-surface" />
        <MetricTile
          label="Utilization"
          value={`${Math.round((drawn / awarded) * 100)}%`}
          hint="Against a 74% target at this point in the cycle"
          className="bg-surface"
        />
      </div>

      <div className="flex flex-col gap-4">
        {GRANTS.map((grant) => {
          const utilization = Math.round((grant.drawn / grant.awarded) * 100)
          return (
            <Card key={grant.id} className="flex flex-col gap-5 p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[16px]">{grant.name}</span>
                  <span className="text-[12.5px] text-faint">{grant.agency}</span>
                </div>
                <StatusBadge status={grant.status} />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-[12.5px]">
                  <span className="text-muted">
                    {currency(grant.drawn)} of {currency(grant.awarded)} drawn
                  </span>
                  <span className="font-mono text-faint">{utilization}%</span>
                </div>
                <Progress value={utilization} tone={utilization >= 70 ? 'ok' : 'brass'} />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
                <span className="text-[12.5px] text-faint">
                  Next report due {formatDate(grant.nextReport)}
                </span>
                <Button
                  size="sm"
                  onClick={() => notify(`Draft report prepared for ${grant.name}`)}
                >
                  Draft the report
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </>
  )
}
