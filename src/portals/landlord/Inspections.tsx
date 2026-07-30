import { PageHead } from '@/components/portal/PageHead'
import { StatusBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { INSPECTIONS } from '@/data/landlord'
import { dayAndMonth, formatDate } from '@/lib/format'
import { useToast } from '@/components/ui/Toast'

export function Inspections() {
  const notify = useToast()
  const upcoming = INSPECTIONS.filter((i) => i.status === 'Scheduled')

  return (
    <>
      <PageHead
        eyebrow="Housing quality standards"
        title="Inspections"
        meta={`${upcoming.length} scheduled · inspections are booked for you when a referral is accepted`}
      />

      <div className="flex flex-col gap-3">
        {INSPECTIONS.map((inspection) => {
          const { day, month } = dayAndMonth(inspection.scheduledOn)
          return (
            <Card key={inspection.id} className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
              <div className="flex w-14 shrink-0 flex-col items-center">
                <span className="font-serif text-[26px] leading-none font-light">{day}</span>
                <span className="font-mono text-[10px] text-faint">{month}</span>
              </div>

              <div className="flex flex-1 flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[15px]">{inspection.unit}</span>
                  <StatusBadge status={inspection.status} />
                </div>
                <span className="text-[12.5px] text-faint">
                  {formatDate(inspection.scheduledOn)} · {inspection.inspector}
                </span>
                <span className="text-[12.5px] text-ghost">{inspection.note}</span>
              </div>

              {inspection.status === 'Scheduled' && (
                <Button
                  size="sm"
                  className="shrink-0"
                  onClick={() => notify('Reschedule request sent to the housing coordinator')}
                >
                  Request a reschedule
                </Button>
              )}
            </Card>
          )
        })}
      </div>

      <Card tone="sunken" className="mt-8 p-6">
        <div className="eyebrow-sm mb-3">Before an inspection</div>
        <div className="grid max-w-3xl gap-x-10 gap-y-2.5 sm:grid-cols-2">
          {[
            'Working smoke and carbon monoxide detectors on every floor',
            'No peeling paint in units built before 1978',
            'Hot water, heat, and all outlets functioning',
            'Windows open, close, and lock',
            'No exposed wiring or plumbing leaks',
            'Secure handrails on every staircase',
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 text-[13px] text-text-2">
              <span className="h-1 w-1 shrink-0 rounded-full bg-brass" />
              {item}
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}
