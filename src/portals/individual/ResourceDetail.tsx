import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Bookmark, Clock, MapPin, Navigation, Phone, ShieldCheck } from 'lucide-react'
import { PageHead } from '@/components/portal/PageHead'
import { Badge } from '@/components/ui/Badge'
import { Card, Panel } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/Bits'
import { resourceById } from '@/data/resources'
import { formatDate } from '@/lib/format'
import { useApp } from '@/state/AppStateContext'
import { useToast } from '@/components/ui/Toast'

export function ResourceDetail() {
  const { resourceId } = useParams()
  const { state, dispatch } = useApp()
  const notify = useToast()

  const resource = resourceId ? resourceById(resourceId) : undefined

  if (!resource) {
    return (
      <>
        <Link
          to="/app/resources"
          className="mb-6 inline-flex items-center gap-2 text-[13px] text-muted hover:text-brass"
        >
          <ArrowLeft size={14} /> All resources
        </Link>
        <EmptyState title="That resource could not be found." hint="It may have been removed during a verification pass." />
      </>
    )
  }

  const saved = state.savedResourceIds.includes(resource.id)

  return (
    <>
      <Link
        to="/app/resources"
        className="mb-6 inline-flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-brass"
      >
        <ArrowLeft size={14} /> All resources
      </Link>

      <PageHead
        eyebrow={resource.org}
        title={resource.name}
        meta={`${resource.city}, ${resource.county} County · ${resource.distanceMi} mi away`}
        actions={
          <>
            <a
              href={`tel:${resource.phone.replace(/\D/g, '')}`}
              className="inline-flex items-center gap-2 rounded-[4px] bg-text px-5 py-2.5 text-[13.5px] font-medium text-ink transition-colors hover:bg-white"
            >
              <Phone size={14} /> Call
            </a>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(resource.address)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-[4px] border border-line-3 px-5 py-2.5 text-[13.5px] transition-colors hover:border-brass hover:text-brass"
            >
              <Navigation size={14} /> Directions
            </a>
            <Button
              variant={saved ? 'brass' : 'outline'}
              onClick={() => {
                dispatch({ type: 'toggleSavedResource', resourceId: resource.id })
                notify(saved ? 'Removed from saved' : 'Saved to your list')
              }}
            >
              <Bookmark size={14} fill={saved ? 'currentColor' : 'none'} />
              {saved ? 'Saved' : 'Save'}
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="flex flex-col gap-5">
          <Card className="p-6">
            <p className="text-[15px] leading-[1.7] text-text-2">{resource.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge tone="brass">{resource.category}</Badge>
              {resource.acceptsReentry && <Badge tone="ok">Accepts reentry referrals</Badge>}
              {resource.walkIn && <Badge tone="info">Walk-in</Badge>}
            </div>
          </Card>

          <Panel label="Services offered" bodyClassName="p-0">
            {resource.services.map((service) => (
              <div
                key={service}
                className="flex items-center gap-3 border-b border-line px-5 py-3.5 text-[13.5px] text-text-2 last:border-0"
              >
                <span className="h-1 w-1 rounded-full bg-brass" />
                {service}
              </div>
            ))}
          </Panel>

          <Panel label="Eligibility" bodyClassName="p-0">
            {resource.eligibility.map((rule) => (
              <div
                key={rule}
                className="flex items-center gap-3 border-b border-line px-5 py-3.5 text-[13.5px] text-text-2 last:border-0"
              >
                <ShieldCheck size={14} className="text-faint" />
                {rule}
              </div>
            ))}
          </Panel>
        </div>

        <aside className="flex flex-col gap-5">
          <Panel label="Visit">
            <div className="flex flex-col gap-5">
              <div className="flex gap-3">
                <MapPin size={15} className="mt-0.5 shrink-0 text-faint" />
                <div className="text-[13.5px] leading-relaxed text-text-2">{resource.address}</div>
              </div>
              <div className="flex gap-3">
                <Clock size={15} className="mt-0.5 shrink-0 text-faint" />
                <div className="text-[13.5px] leading-relaxed text-text-2">{resource.hours}</div>
              </div>
              <div className="flex gap-3">
                <Phone size={15} className="mt-0.5 shrink-0 text-faint" />
                <a
                  href={`tel:${resource.phone.replace(/\D/g, '')}`}
                  className="text-[13.5px] text-text-2 transition-colors hover:text-brass"
                >
                  {resource.phone}
                </a>
              </div>
            </div>
          </Panel>

          <Card tone="sunken" className="flex flex-col gap-2 p-5">
            <div className="eyebrow-sm">Verification</div>
            <div className="text-[13.5px] text-text-2">
              Confirmed current on {formatDate(resource.verifiedOn)}
            </div>
            <div className="text-[12px] leading-relaxed text-ghost">
              Listings are re-verified on a rolling 90-day cycle. If something here is wrong, tell
              your advocate and it is corrected for everyone.
            </div>
          </Card>
        </aside>
      </div>
    </>
  )
}
