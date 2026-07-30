import { useState } from 'react'
import { FileText, Upload } from 'lucide-react'
import { PageHead } from '@/components/portal/PageHead'
import { Badge, StatusBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { Field, Input } from '@/components/ui/Field'
import { PRIMARY_CLIENT_ID } from '@/data/clients'
import { formatDate } from '@/lib/format'
import { useApp } from '@/state/AppStateContext'
import { useToast } from '@/components/ui/Toast'

export function Documents() {
  const { state, dispatch } = useApp()
  const notify = useToast()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const mine = state.documents.filter((d) => d.clientId === PRIMARY_CLIENT_ID)
  const needsAttention = mine.filter((d) => d.status === 'Review' || d.status === 'Missing').length

  function upload() {
    if (name.trim().length < 2) {
      setError('Give the document a name so your advocate can find it.')
      return
    }
    dispatch({
      type: 'uploadDocument',
      document: {
        id: `doc-${Date.now()}`,
        clientId: PRIMARY_CLIENT_ID,
        name: name.trim(),
        status: 'Uploaded',
        uploadedOn: new Date().toISOString().slice(0, 10),
        reviewer: null,
        note: 'Uploaded from the individual portal. Awaiting advocate review.',
      },
    })
    notify('Document uploaded — Renee has been notified')
    setOpen(false)
    setName('')
    setError('')
  }

  return (
    <>
      <PageHead
        eyebrow="Secure storage"
        title="Documents"
        meta={
          needsAttention > 0
            ? `${mine.length} documents · ${needsAttention} need attention`
            : `${mine.length} documents · all current`
        }
        actions={
          <Button variant="primary" onClick={() => setOpen(true)}>
            <Upload size={14} /> Upload a document
          </Button>
        }
      />

      <div className="flex flex-col gap-3">
        {mine.map((doc) => (
          <Card key={doc.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] border border-line-2 bg-surface-2">
              <FileText size={16} className="text-faint" />
            </span>

            <div className="flex flex-1 flex-col gap-1.5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[14.5px]">{doc.name}</span>
                <StatusBadge status={doc.status} />
              </div>
              <span className="text-[12.5px] leading-relaxed text-faint">{doc.note}</span>
            </div>

            <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
              <span className="font-mono text-[11px] text-ghost">
                {doc.uploadedOn ? formatDate(doc.uploadedOn) : 'Not uploaded'}
              </span>
              {doc.reviewer && <Badge tone="neutral">Reviewed by {doc.reviewer}</Badge>}
            </div>
          </Card>
        ))}
      </div>

      <Card tone="sunken" className="mt-8 p-6">
        <div className="eyebrow-sm mb-3">Who can see these</div>
        <p className="max-w-2xl text-[13.5px] leading-relaxed text-faint">
          Only you and Renee Carter at Newark Reentry Coalition. Ironbound Workforce and Essex County
          Legal Aid see the documents relevant to their referral and nothing else. Every view is
          logged, and you can withdraw an organization&rsquo;s access at any time.
        </p>
      </Card>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        eyebrow="Secure storage"
        title="Upload a document"
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={upload}>
              Upload
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-5">
          <Field
            label="What is this document?"
            error={error || undefined}
            hint="Your advocate is notified as soon as it lands."
          >
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Employer income letter"
            />
          </Field>
          <div className="flex flex-col items-center gap-2 rounded-[5px] border border-dashed border-line-3 px-6 py-10 text-center">
            <Upload size={20} className="text-ghost" />
            <span className="text-[13px] text-faint">Drag a file here, or tap to browse</span>
            <span className="text-[11.5px] text-ghost">
              Demo environment — no file is actually transmitted
            </span>
          </div>
        </div>
      </Modal>
    </>
  )
}
