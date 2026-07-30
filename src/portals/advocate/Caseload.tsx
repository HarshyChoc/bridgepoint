import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { PageHead } from '@/components/portal/PageHead'
import { Badge, StatusBadge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { EmptyState, Progress } from '@/components/ui/Bits'
import { Input, Select } from '@/components/ui/Field'
import { ADVOCATES, CLIENTS, PRIMARY_CLIENT_ID } from '@/data/clients'
import { planTotals } from '@/lib/recommend'
import { relativeFromNow } from '@/lib/format'
import { useApp } from '@/state/AppStateContext'

const SORTS = ['Urgency', 'Last contact', 'Name', 'Progress'] as const
const URGENCY_RANK: Record<string, number> = { Urgent: 0, 'Follow up': 1, New: 2, 'On track': 3 }

export function Caseload() {
  const { state } = useApp()
  const [query, setQuery] = useState('')
  const [advocate, setAdvocate] = useState('All')
  const [sort, setSort] = useState<(typeof SORTS)[number]>('Urgency')

  const liveTotals = planTotals(state.planSteps, state.completedSubSteps)

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return CLIENTS.filter((client) => {
      if (advocate !== 'All' && client.advocate !== advocate) return false
      if (!q) return true
      return (
        client.name.toLowerCase().includes(q) ||
        client.county.toLowerCase().includes(q) ||
        client.phase.toLowerCase().includes(q)
      )
    }).sort((a, b) => {
      if (sort === 'Name') return a.name.localeCompare(b.name)
      if (sort === 'Last contact') return b.lastContactOn.localeCompare(a.lastContactOn)
      if (sort === 'Progress')
        return b.planComplete / b.planTotal - a.planComplete / a.planTotal
      return (URGENCY_RANK[a.urgency] ?? 9) - (URGENCY_RANK[b.urgency] ?? 9)
    })
  }, [query, advocate, sort])

  return (
    <>
      <PageHead
        eyebrow="Case management"
        title="Caseload"
        meta={`${CLIENTS.length} active clients · ${CLIENTS.filter((c) => c.urgency === 'Urgent').length} urgent`}
      />

      <div className="mb-6 grid gap-3 md:grid-cols-[1.8fr_1fr_1fr]">
        <div className="relative">
          <Search size={15} className="absolute top-1/2 left-3.5 -translate-y-1/2 text-ghost" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, county, or phase…"
            className="pl-10"
          />
        </div>
        <Select value={advocate} onChange={(e) => setAdvocate(e.target.value)}>
          <option value="All">All advocates</option>
          {ADVOCATES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </Select>
        <Select value={sort} onChange={(e) => setSort(e.target.value as (typeof SORTS)[number])}>
          {SORTS.map((option) => (
            <option key={option} value={option}>
              Sort by {option.toLowerCase()}
            </option>
          ))}
        </Select>
      </div>

      {rows.length === 0 ? (
        <EmptyState title="No clients match those filters." />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {rows.map((client) => {
            const isPrimary = client.id === PRIMARY_CLIENT_ID
            const done = isPrimary ? liveTotals.done : client.planComplete
            const total = isPrimary ? liveTotals.total : client.planTotal
            const percent = total === 0 ? 0 : Math.round((done / total) * 100)

            return (
              <Link key={client.id} to={`/advocate/caseload/${client.id}`}>
                <Card className="flex h-full flex-col gap-4 p-6 transition-colors hover:border-line-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[16px]">{client.name}</span>
                      <span className="text-[12px] text-faint">
                        {client.county} County · {client.advocate}
                      </span>
                    </div>
                    <StatusBadge status={client.urgency} />
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-muted">{client.phase}</span>
                      <span className="font-mono text-faint">
                        {done}/{total}
                        {isPrimary && <span className="ml-2 text-brass">live</span>}
                      </span>
                    </div>
                    <Progress value={percent} />
                  </div>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-4 text-[12.5px]">
                    <Detail label="Housing" value={client.housing} />
                    <Detail label="Employment" value={client.employment} />
                    <Detail label="Benefits" value={client.benefits} />
                    <Detail label="Last contact" value={relativeFromNow(client.lastContactOn)} />
                  </div>

                  {client.serviceGaps.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 border-t border-line pt-4">
                      <span className="eyebrow-sm">Service gaps</span>
                      {client.serviceGaps.map((gap) => (
                        <Badge key={gap} tone="alert">
                          {gap}
                        </Badge>
                      ))}
                    </div>
                  )}
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="eyebrow-sm">{label}</span>
      <span className="text-text-2">{value}</span>
    </div>
  )
}
