import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText } from 'lucide-react'
import { PageHead } from '@/components/portal/PageHead'
import { StatusBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/Bits'
import { Select, Textarea } from '@/components/ui/Field'
import { Modal } from '@/components/ui/Modal'
import { clientById } from '@/data/clients'
import { formatDate } from '@/lib/format'
import { useApp } from '@/state/AppStateContext'
import { useToast } from '@/components/ui/Toast'
import type { ClientDocument, DocumentStatus } from '@/data/types'

const FILTERS: Array<DocumentStatus | 'All'> = ['All', 'Review', 'Uploaded', 'Missing', 'Verified']

export function DocumentCenter() {
  const { state, dispatch } = useApp()
  const notify = useToast()
  const [filter, setFilter] = useState<DocumentStatus | 'All'>('All')
  const [reviewing, setReviewing] = useState<ClientDocument | null>(null)
  const [followUp, setFollowUp] = useState('')

  const rows = state.documents.filter((d) => filter === 'All' || d.status === filter)
  const needing = state.documents.filter((d) => d.status === 'Review' || d.status === 'Uploaded')

  function verify(doc: ClientDocument) {
    dispatch({
      type: 'setDocumentStatus',
      documentId: doc.id,
      status: 'Verified',
      reviewer: state.session?.name ?? 'Renee Carter',
    })
    notify(`${doc.name} verified`)
    setReviewing(null)
    setFollowUp('')
  }

  return (
    <>
      <PageHead
        eyebrow="Document center"
        title="Documents"
        meta={`${state.documents.length} documents across the caseload · ${needing.length} awaiting review`}
        actions={
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value as DocumentStatus | 'All')}
            className="w-52"
          >
            {FILTERS.map((option) => (
              <option key={option} value={option}>
                {option === 'All' ? 'All statuses' : option}
              </option>
            ))}
          </Select>
        }
      />

      {rows.length === 0 ? (
        <EmptyState title="Nothing in that status." />
      ) : (
        <div className="flex flex-col gap-3">
          {rows.map((doc) => {
            const client = clientById(doc.clientId)
            return (
              <Card key={doc.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] border border-line-2 bg-surface-2">
                  <FileText size={16} className="text-faint" />
                </span>

                <div className="flex flex-1 flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[14.5px]">{doc.name}</span>
                    <StatusBadge status={doc.status} />
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5 text-[12px] text-faint">
                    {client && (
                      <Link
                        to={`/advocate/caseload/${client.id}`}
                        className="transition-colors hover:text-brass"
                      >
                        {client.name}
                      </Link>
                    )}
                    <span>·</span>
                    <span>{doc.note}</span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span className="font-mono text-[10.5px] text-ghost">
                    {doc.uploadedOn ? formatDate(doc.uploadedOn) : 'Not uploaded'}
                  </span>
                  {(doc.status === 'Review' || doc.status === 'Uploaded') && (
                    <Button size="sm" variant="brass" onClick={() => setReviewing(doc)}>
                      Review
                    </Button>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      )}

      <Modal
        open={reviewing !== null}
        onClose={() => setReviewing(null)}
        eyebrow={reviewing ? (clientById(reviewing.clientId)?.name ?? 'Client') : ''}
        title={reviewing?.name ?? ''}
        footer={
          <>
            <Button
              variant="ghost"
              onClick={() => {
                if (reviewing) {
                  dispatch({
                    type: 'setDocumentStatus',
                    documentId: reviewing.id,
                    status: 'Missing',
                    reviewer: state.session?.name ?? 'Renee Carter',
                  })
                  notify('Marked as needing a replacement')
                }
                setReviewing(null)
                setFollowUp('')
              }}
            >
              Request a replacement
            </Button>
            <Button variant="primary" onClick={() => reviewing && verify(reviewing)}>
              Verify
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-5">
          <div className="rounded-[5px] border border-line-2 bg-surface-2 px-4 py-8 text-center">
            <FileText size={22} className="mx-auto mb-2 text-ghost" />
            <div className="text-[12.5px] text-faint">Document preview</div>
            <div className="mt-1 text-[11.5px] text-ghost">
              Demo environment — no file content is stored
            </div>
          </div>
          <div className="text-[13px] leading-relaxed text-faint">{reviewing?.note}</div>
          <Textarea
            rows={3}
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
            placeholder="Follow-up note for the client (optional)"
          />
        </div>
      </Modal>
    </>
  )
}
