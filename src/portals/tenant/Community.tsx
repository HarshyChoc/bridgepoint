import { useState } from 'react'
import { MapPin } from 'lucide-react'
import { PageHead } from '@/components/portal/PageHead'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { COMMUNITY_EVENTS } from '@/data/tenant'
import { dayAndMonth, formatDate } from '@/lib/format'
import { useToast } from '@/components/ui/Toast'

export function Community() {
  const notify = useToast()
  const [rsvps, setRsvps] = useState<string[]>([])

  return (
    <>
      <PageHead
        eyebrow="Nearby"
        title="Community"
        meta={`${COMMUNITY_EVENTS.length} events in the next six weeks · all free`}
      />

      <div className="flex flex-col gap-3">
        {COMMUNITY_EVENTS.map((event) => {
          const { day, month } = dayAndMonth(event.when)
          const going = rsvps.includes(event.id)

          return (
            <Card key={event.id} className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
              <div className="flex w-14 shrink-0 flex-col items-center">
                <span className="font-serif text-[26px] leading-none font-light">{day}</span>
                <span className="font-mono text-[10px] text-faint">{month}</span>
              </div>

              <div className="flex flex-1 flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[15.5px]">{event.title}</span>
                  {going && <Badge tone="ok">Going</Badge>}
                </div>
                <span className="flex items-center gap-2 text-[12.5px] text-faint">
                  <MapPin size={12} /> {event.where} · {formatDate(event.when)}
                </span>
                <span className="text-[13px] leading-relaxed text-ghost">{event.detail}</span>
              </div>

              <Button
                size="sm"
                variant={going ? 'outline' : 'brass'}
                className="shrink-0"
                onClick={() => {
                  setRsvps((current) =>
                    going ? current.filter((id) => id !== event.id) : [...current, event.id],
                  )
                  notify(going ? 'RSVP removed' : `Added to your calendar — ${event.title}`)
                }}
              >
                {going ? 'Cancel RSVP' : 'RSVP'}
              </Button>
            </Card>
          )
        })}
      </div>
    </>
  )
}
