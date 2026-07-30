import { AlertTriangle } from 'lucide-react'
import { PageHead } from '@/components/portal/PageHead'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { MetricTile } from '@/components/ui/Bits'
import { SERVICE_GAPS } from '@/data/analytics'
import { useToast } from '@/components/ui/Toast'

export function ServiceGapsView() {
  const notify = useToast()

  const critical = SERVICE_GAPS.filter((g) => g.severity === 'Critical')
  const watch = SERVICE_GAPS.filter((g) => g.severity === 'Watch')

  return (
    <>
      <PageHead
        eyebrow="Where people get stuck"
        title="Service gaps"
        meta="Derived from blocking barriers recorded on active plans, not from provider self-report"
      />

      <div className="mb-6 grid gap-px overflow-hidden rounded-md border border-line-2 bg-line-2 sm:grid-cols-3">
        <MetricTile label="Critical" value={critical.length} className="bg-surface" />
        <MetricTile label="Watch" value={watch.length} className="bg-surface" />
        <MetricTile label="Counties affected" value={new Set(SERVICE_GAPS.map((g) => g.county)).size} className="bg-surface" />
      </div>

      <div className="flex flex-col gap-4">
        {SERVICE_GAPS.map((gap) => (
          <Card
            key={gap.id}
            className={gap.severity === 'Critical' ? 'border-[#5b3833]/60 p-6' : 'p-6'}
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
              <AlertTriangle
                size={16}
                className={gap.severity === 'Critical' ? 'mt-1 shrink-0 text-alert' : 'mt-1 shrink-0 text-brass'}
              />

              <div className="flex flex-1 flex-col gap-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[16px]">{gap.label}</span>
                  <span className="text-[13px] text-faint">{gap.county} County</span>
                  <Badge tone={gap.severity === 'Critical' ? 'alert' : 'warn'}>{gap.severity}</Badge>
                </div>
                <p className="max-w-3xl text-[13.5px] leading-relaxed text-muted">{gap.detail}</p>
              </div>

              <Button
                size="sm"
                className="shrink-0"
                onClick={() => notify(`${gap.label} in ${gap.county} added to the investment brief`)}
              >
                Add to investment brief
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card tone="sunken" className="mt-6 p-6">
        <div className="eyebrow-sm mb-3">How a gap is identified</div>
        <p className="max-w-3xl text-[13.5px] leading-relaxed text-faint">
          A gap is recorded when a plan step stalls and the reason is that no provider is available,
          reachable, or accepting — not when a person declines a service. That distinction is what
          separates a supply problem you can fund from an engagement problem you cannot.
        </p>
      </Card>
    </>
  )
}
