import { useState } from 'react'
import { Download } from 'lucide-react'
import { PageHead } from '@/components/portal/PageHead'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useToast } from '@/components/ui/Toast'

const EXPORTS = [
  {
    id: 'exp-hmis',
    name: 'HMIS CSV export',
    detail:
      'HUD CSV 2026 specification. Client, enrollment, exit, and services files mapped from the coordinated record.',
    cadence: 'Nightly',
  },
  {
    id: 'exp-dca',
    name: 'DCA quarterly report',
    detail:
      'Placements, retention, time-to-housing, and unit supply by county in the Department of Community Affairs template.',
    cadence: 'Quarterly',
  },
  {
    id: 'exp-coc',
    name: 'Continuum of Care APR',
    detail: 'Annual Performance Report figures pre-populated for each participating CoC.',
    cadence: 'Annual',
  },
  {
    id: 'exp-raw',
    name: 'Aggregated analytics extract',
    detail:
      'County, provider, and gap tables as CSV for your own analysis. No individual records included.',
    cadence: 'On demand',
  },
]

export function Exports() {
  const notify = useToast()
  const [running, setRunning] = useState<string | null>(null)

  function run(id: string, name: string) {
    setRunning(id)
    window.setTimeout(() => {
      setRunning(null)
      notify(`${name} ready to download`)
    }, 1400)
  }

  return (
    <>
      <PageHead
        eyebrow="Integration"
        title="Exports"
        meta="Designed to feed existing reporting rather than duplicate it"
      />

      <div className="flex flex-col gap-4">
        {EXPORTS.map((item) => (
          <Card key={item.id} className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center">
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[16px]">{item.name}</span>
                <Badge tone="neutral">{item.cadence}</Badge>
              </div>
              <p className="max-w-3xl text-[13.5px] leading-relaxed text-faint">{item.detail}</p>
            </div>
            <Button
              variant="primary"
              className="shrink-0"
              disabled={running === item.id}
              onClick={() => run(item.id, item.name)}
            >
              <Download size={14} />
              {running === item.id ? 'Generating…' : 'Generate'}
            </Button>
          </Card>
        ))}
      </div>

      <Card tone="sunken" className="mt-6 p-6">
        <div className="eyebrow-sm mb-3">Why this matters more than it sounds</div>
        <p className="max-w-3xl text-[13.5px] leading-relaxed text-faint">
          Most coordination platforms become a second system someone has to key data into twice.
          BridgePoint Justice is built so the record a case manager already maintains produces HMIS
          and DCA reporting as a by-product — which is the difference between a tool organizations
          adopt and one they abandon after the pilot.
        </p>
      </Card>
    </>
  )
}
