import { FileText, Upload } from 'lucide-react'
import { PageHead } from '@/components/portal/PageHead'
import { StatusBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { LANDLORD_DOCUMENTS } from '@/data/landlord'
import { formatDate } from '@/lib/format'
import { useToast } from '@/components/ui/Toast'

export function LandlordDocuments() {
  const notify = useToast()
  const outstanding = LANDLORD_DOCUMENTS.filter((d) => d.status === 'Missing')

  return (
    <>
      <PageHead
        eyebrow="Compliance"
        title="Documents"
        meta={
          outstanding.length > 0
            ? `${outstanding.length} outstanding — Unit 1C cannot receive a referral until these are filed`
            : 'All documentation current'
        }
        actions={
          <Button variant="primary" onClick={() => notify('Upload received — review takes one business day')}>
            <Upload size={14} /> Upload a document
          </Button>
        }
      />

      <div className="flex flex-col gap-3">
        {LANDLORD_DOCUMENTS.map((doc) => (
          <Card key={doc.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] border border-line-2 bg-surface-2">
              <FileText size={16} className="text-faint" />
            </span>

            <div className="flex flex-1 flex-col gap-1.5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[14.5px]">{doc.name}</span>
                <StatusBadge status={doc.status} />
              </div>
              <span className="text-[12.5px] text-faint">{doc.unit}</span>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              {doc.due && (
                <span className="font-mono text-[10.5px] text-ghost">Due {formatDate(doc.due)}</span>
              )}
              {doc.status === 'Missing' && (
                <Button size="sm" variant="brass" onClick={() => notify(`${doc.name} uploaded`)}>
                  Upload
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
