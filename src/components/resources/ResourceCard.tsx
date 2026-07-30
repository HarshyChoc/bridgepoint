import { Link } from 'react-router-dom'
import { Bookmark, Navigation, Phone } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { useApp } from '@/state/AppStateContext'
import { useToast } from '@/components/ui/Toast'
import { cn } from '@/lib/cn'
import type { Resource } from '@/data/types'

/** Compact resource row used inside plan steps and lists. */
export function ResourceRow({ resource, compact = false }: { resource: Resource; compact?: boolean }) {
  const { state, dispatch } = useApp()
  const notify = useToast()
  const saved = state.savedResourceIds.includes(resource.id)

  function toggleSave() {
    dispatch({ type: 'toggleSavedResource', resourceId: resource.id })
    notify(saved ? `Removed ${resource.name}` : `Saved ${resource.name}`)
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-[5px] border border-line-2 bg-surface-2 p-4',
        compact && 'p-3.5',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Link
            to={`/app/resources/${resource.id}`}
            className="text-[13.5px] transition-colors hover:text-brass"
          >
            {resource.name}
          </Link>
          <div className="text-[11.5px] text-faint">
            {resource.distanceMi} mi · {resource.hours.split(',')[0]}
          </div>
        </div>
        <Badge tone="neutral">{resource.category}</Badge>
      </div>

      <div className="flex flex-wrap gap-2">
        <a
          href={`tel:${resource.phone.replace(/\D/g, '')}`}
          className="flex items-center gap-1.5 rounded-[3px] border border-line-3 px-3 py-1.5 text-[12px] text-muted transition-colors hover:border-brass hover:text-brass"
        >
          <Phone size={12} /> Call
        </a>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(resource.address)}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 rounded-[3px] border border-line-3 px-3 py-1.5 text-[12px] text-muted transition-colors hover:border-brass hover:text-brass"
        >
          <Navigation size={12} /> Directions
        </a>
        <button
          onClick={toggleSave}
          className={cn(
            'flex cursor-pointer items-center gap-1.5 rounded-[3px] border px-3 py-1.5 text-[12px] transition-colors',
            saved
              ? 'border-brass-dim text-brass'
              : 'border-line-3 text-muted hover:border-brass hover:text-brass',
          )}
        >
          <Bookmark size={12} fill={saved ? 'currentColor' : 'none'} />
          {saved ? 'Saved' : 'Save'}
        </button>
      </div>
    </div>
  )
}

/** Larger card used in the resource directory grid. */
export function ResourceCard({ resource }: { resource: Resource }) {
  const { state, dispatch } = useApp()
  const notify = useToast()
  const saved = state.savedResourceIds.includes(resource.id)

  return (
    <div className="group flex flex-col gap-4 rounded-md border border-line-2 bg-surface p-6 transition-colors hover:border-line-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <Link
            to={`/app/resources/${resource.id}`}
            className="text-[15px] leading-snug transition-colors group-hover:text-brass"
          >
            {resource.name}
          </Link>
          <div className="text-[12px] text-faint">{resource.org}</div>
        </div>
        <button
          onClick={() => {
            dispatch({ type: 'toggleSavedResource', resourceId: resource.id })
            notify(saved ? `Removed ${resource.name}` : `Saved ${resource.name}`)
          }}
          aria-label={saved ? 'Remove from saved' : 'Save resource'}
          className={cn(
            'cursor-pointer rounded p-1.5 transition-colors',
            saved ? 'text-brass' : 'text-ghost hover:text-brass',
          )}
        >
          <Bookmark size={15} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <p className="line-clamp-2 text-[13px] leading-[1.6] text-faint">{resource.description}</p>

      <div className="mt-auto flex flex-wrap items-center gap-2">
        <Badge tone="brass">{resource.category}</Badge>
        <Badge tone="neutral">{resource.county} County</Badge>
        {resource.walkIn && <Badge tone="ok">Walk-in</Badge>}
        <span className="ml-auto font-mono text-[11px] text-ghost">{resource.distanceMi} mi</span>
      </div>
    </div>
  )
}
