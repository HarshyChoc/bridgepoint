import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { PageHead } from '@/components/portal/PageHead'
import { Input, Select } from '@/components/ui/Field'
import { EmptyState } from '@/components/ui/Bits'
import { ResourceCard } from '@/components/resources/ResourceCard'
import { RESOURCES, SERVICE_CATEGORIES } from '@/data/resources'
import { NJ_COUNTIES } from '@/data/counties'
import { useApp } from '@/state/AppStateContext'
import { cn } from '@/lib/cn'

const ALL = 'All'

export function Resources() {
  const { state } = useApp()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string>(ALL)
  const [county, setCounty] = useState<string>(state.intake.county || 'Essex')
  const [walkInOnly, setWalkInOnly] = useState(false)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return RESOURCES.filter((r) => {
      if (category !== ALL && r.category !== category) return false
      if (county !== ALL && r.county !== county) return false
      if (walkInOnly && !r.walkIn) return false
      if (!q) return true
      return (
        r.name.toLowerCase().includes(q) ||
        r.org.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.services.some((s) => s.toLowerCase().includes(q)) ||
        r.city.toLowerCase().includes(q)
      )
    }).sort((a, b) => a.distanceMi - b.distanceMi)
  }, [query, category, county, walkInOnly])

  return (
    <>
      <PageHead
        eyebrow="Verified resource database"
        title="Resources"
        meta={`${RESOURCES.length} verified listings across ${NJ_COUNTIES.length} counties · last verified July 2026`}
      />

      <div className="mb-7 flex flex-col gap-4">
        <div className="grid gap-3 md:grid-cols-[1.6fr_1fr_1fr]">
          <div className="relative">
            <Search size={15} className="absolute top-1/2 left-3.5 -translate-y-1/2 text-ghost" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search housing, legal aid, food, a city…"
              className="pl-10"
            />
          </div>
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value={ALL}>All categories</option>
            {SERVICE_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
          <Select value={county} onChange={(e) => setCounty(e.target.value)}>
            <option value={ALL}>All counties</option>
            {NJ_COUNTIES.map((c) => (
              <option key={c} value={c}>
                {c} County
              </option>
            ))}
          </Select>
        </div>

        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => setWalkInOnly((v) => !v)}
            className={cn(
              'cursor-pointer rounded-full border px-4 py-1.5 text-[12.5px] transition-colors',
              walkInOnly
                ? 'border-brass text-brass'
                : 'border-line-3 text-muted hover:border-brass hover:text-brass',
            )}
          >
            Walk-in only
          </button>
          <span className="font-mono text-[11.5px] text-ghost">
            {results.length} {results.length === 1 ? 'result' : 'results'}
          </span>
        </div>
      </div>

      {results.length === 0 ? (
        <EmptyState
          title="No resources match those filters."
          hint="Try widening the county filter — many providers accept referrals from outside their county."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </>
  )
}
