import { Link } from 'react-router-dom'
import { PageHead } from '@/components/portal/PageHead'
import { EmptyState } from '@/components/ui/Bits'
import { ResourceCard } from '@/components/resources/ResourceCard'
import { resourceById } from '@/data/resources'
import { useApp } from '@/state/AppStateContext'

export function Saved() {
  const { state } = useApp()
  const saved = state.savedResourceIds
    .map((id) => resourceById(id))
    .filter((r): r is NonNullable<typeof r> => Boolean(r))

  return (
    <>
      <PageHead
        eyebrow="Your list"
        title="Saved resources"
        meta={`${saved.length} ${saved.length === 1 ? 'resource' : 'resources'} kept for later`}
      />

      {saved.length === 0 ? (
        <EmptyState
          title="You have not saved anything yet."
          hint="Tap the bookmark on any resource to keep it here — it stays available even when you are offline."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {saved.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}

      <div className="mt-10">
        <Link to="/app/resources" className="text-[13.5px] text-brass">
          Browse the full resource database →
        </Link>
      </div>
    </>
  )
}
