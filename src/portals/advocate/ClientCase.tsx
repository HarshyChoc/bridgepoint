import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, PenLine, Send, Sparkles } from 'lucide-react'
import { PageHead } from '@/components/portal/PageHead'
import { Badge, StatusBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, Panel } from '@/components/ui/Card'
import { EmptyState, KeyValue, Progress } from '@/components/ui/Bits'
import { Modal } from '@/components/ui/Modal'
import { Field, Input, Select, Textarea } from '@/components/ui/Field'
import { PRIMARY_CLIENT_ID, TIMELINE, clientById } from '@/data/clients'
import { PARTNERS } from '@/data/casework'
import { resourceById } from '@/data/resources'
import { planTotals } from '@/lib/recommend'
import { formatDate, formatShortDate, relativeFromNow } from '@/lib/format'
import { useApp } from '@/state/AppStateContext'
import { useToast } from '@/components/ui/Toast'
import { cn } from '@/lib/cn'
import type { Referral } from '@/data/types'

const TABS = [
  'Overview',
  'Action plan',
  'Referrals',
  'Documents',
  'Appointments',
  'Messages',
  'Support network',
] as const

type Tab = (typeof TABS)[number]

export function ClientCase() {
  const { clientId } = useParams()
  const { state, dispatch } = useApp()
  const notify = useToast()

  const [tab, setTab] = useState<Tab>('Overview')
  const [noteOpen, setNoteOpen] = useState(false)
  const [referralOpen, setReferralOpen] = useState(false)

  const client = clientId ? clientById(clientId) : undefined
  const isPrimary = client?.id === PRIMARY_CLIENT_ID

  const liveTotals = useMemo(
    () => planTotals(state.planSteps, state.completedSubSteps),
    [state.planSteps, state.completedSubSteps],
  )

  if (!client) {
    return (
      <>
        <BackLink />
        <EmptyState title="No such client." hint="They may have been transferred to another advocate." />
      </>
    )
  }

  const done = isPrimary ? liveTotals.done : client.planComplete
  const total = isPrimary ? liveTotals.total : client.planTotal
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)

  const referrals = state.referrals.filter((r) => r.clientId === client.id)
  const documents = state.documents.filter((d) => d.clientId === client.id)
  const appointments = state.appointments
    .filter((a) => a.clientId === client.id)
    .slice()
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
  const notes = state.caseNotes.filter((n) => n.clientId === client.id)
  const messages = state.messages
    .filter((m) => m.threadId === client.id)
    .slice()
    .sort((a, b) => a.sentAt.localeCompare(b.sentAt))
  const timeline = TIMELINE.filter((t) => t.clientId === client.id)

  const insightId = `nba-${client.id}`
  const insightDismissed = state.dismissedInsights.includes(insightId)

  return (
    <>
      <BackLink />

      <PageHead
        eyebrow={client.phase.toUpperCase()}
        title={client.name}
        meta={`${client.county} County · Intake ${formatDate(client.intakeOn)} · Last contact ${relativeFromNow(client.lastContactOn)}`}
        actions={
          <>
            <Button onClick={() => setNoteOpen(true)}>
              <PenLine size={14} /> Add note
            </Button>
            <Button variant="primary" onClick={() => setReferralOpen(true)}>
              <Send size={14} /> Create referral
            </Button>
          </>
        }
      />

      {!insightDismissed && (
        <Card tone="sunken" className="mb-6 overflow-hidden">
          <div className="flex items-center gap-3 border-b border-line px-6 py-4">
            <Sparkles size={15} className="text-brass" />
            <span className="eyebrow-sm text-brass">AI case summary &amp; next best action</span>
            <span className="ml-auto font-mono text-[10.5px] text-ghost">Updated 6 min ago</span>
          </div>
          <div className="flex flex-col gap-5 px-6 py-5">
            <p className="max-w-4xl text-[14.5px] leading-[1.7] text-text-2">{client.aiSummary}</p>
            <p className="max-w-4xl border-l-2 border-brass-dim pl-4 text-[14.5px] leading-[1.7] text-text-2">
              <span className="text-brass">Recommended next action</span> — {client.aiNextAction}
            </p>
            <div className="flex gap-3">
              <Button
                variant="brass"
                size="sm"
                onClick={() => notify('Draft prepared — review it in the helper')}
              >
                Draft the request
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dispatch({ type: 'dismissInsight', insightId })}
              >
                Dismiss
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="mb-6 grid gap-px overflow-hidden rounded-md border border-line-2 bg-line-2 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Housing', value: client.housing },
          { label: 'Employment', value: client.employment },
          { label: 'Benefits', value: client.benefits },
          {
            label: 'Service gaps',
            value: client.serviceGaps.length > 0 ? client.serviceGaps.join(', ') : 'None flagged',
          },
        ].map((item) => (
          <div key={item.label} className="bg-surface px-5 py-4">
            <KeyValue label={item.label} value={item.value} />
          </div>
        ))}
      </div>

      <div className="mb-6 flex gap-1 overflow-x-auto border-b border-line">
        {TABS.map((option) => (
          <button
            key={option}
            onClick={() => setTab(option)}
            className={cn(
              'cursor-pointer border-b-2 px-4 py-3 text-[13.5px] whitespace-nowrap transition-colors',
              tab === option
                ? 'border-brass text-text'
                : 'border-transparent text-muted hover:text-text',
            )}
          >
            {option}
          </button>
        ))}
      </div>

      {tab === 'Overview' && (
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-5">
            <Panel label="Client-side progress">
              <div className="flex flex-col gap-4">
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-[28px] leading-none font-light">
                    {done} of {total}
                  </span>
                  <span className="font-mono text-[11.5px] text-faint">{percent}%</span>
                </div>
                <Progress value={percent} />
                <p className="text-[12.5px] leading-relaxed text-ghost">
                  {isPrimary
                    ? `Synced live from ${client.name.split(' ')[0]}'s app — no duplicate entry on either side.`
                    : 'Plan steps completed in the client app.'}
                </p>
              </div>
            </Panel>

            <Panel label="Case notes" bodyClassName="p-0">
              {notes.length === 0 ? (
                <div className="px-5 py-10 text-center text-[13px] text-ghost">No notes yet.</div>
              ) : (
                notes.map((note) => (
                  <div key={note.id} className="flex gap-5 border-b border-line px-5 py-4 last:border-0">
                    <span className="w-14 shrink-0 font-mono text-[10.5px] text-brass">
                      {formatShortDate(note.createdOn)}
                    </span>
                    <div className="flex flex-col gap-1">
                      <p className="text-[13.5px] leading-relaxed text-text-2">{note.body}</p>
                      <span className="text-[11px] text-ghost">{note.author}</span>
                    </div>
                  </div>
                ))
              )}
            </Panel>
          </div>

          <div className="flex flex-col gap-5">
            <Panel label="Timeline" bodyClassName="p-0">
              {timeline.length === 0 ? (
                <div className="px-5 py-10 text-center text-[13px] text-ghost">
                  No milestones recorded yet.
                </div>
              ) : (
                timeline.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5 last:border-0"
                  >
                    <span className="text-[13px] text-text-2">{event.label}</span>
                    <span className="font-mono text-[10.5px] text-faint">
                      {formatShortDate(event.date)}
                    </span>
                  </div>
                ))
              )}
            </Panel>

            <Panel label="Support network" bodyClassName="p-0">
              {client.supportNetwork.map((entry) => (
                <div
                  key={entry.org}
                  className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 last:border-0"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[13.5px]">{entry.org}</span>
                    <span className="text-[11.5px] text-faint">{entry.role}</span>
                  </div>
                  <Badge tone={entry.access === 'Full access' ? 'ok' : entry.access === 'Requested' ? 'warn' : 'info'}>
                    {entry.access}
                  </Badge>
                </div>
              ))}
            </Panel>
          </div>
        </div>
      )}

      {tab === 'Action plan' && (
        <div className="flex flex-col gap-3">
          {isPrimary ? (
            state.planSteps.map((step) => {
              const doneSet = new Set(state.completedSubSteps)
              const stepDone = step.subSteps.filter((s) => doneSet.has(s.id)).length
              const complete = stepDone === step.subSteps.length
              const resources = step.resourceIds
                .map((id) => resourceById(id))
                .filter((r): r is NonNullable<typeof r> => Boolean(r))

              return (
                <Card key={step.id} className="p-5">
                  <div className="flex items-start gap-4">
                    <span
                      className={cn(
                        'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                        complete ? 'bg-ok text-ink' : 'border-[1.5px] border-line-3',
                      )}
                    >
                      {complete && <Check size={12} strokeWidth={3} />}
                    </span>
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[14.5px]">{step.title}</span>
                        <Badge tone={complete ? 'ok' : 'neutral'}>
                          {stepDone}/{step.subSteps.length}
                        </Badge>
                        <Badge tone="neutral">{step.bucket}</Badge>
                      </div>
                      <p className="text-[13px] leading-relaxed text-faint">{step.detail}</p>
                      {resources.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {resources.map((r) => (
                            <span
                              key={r.id}
                              className="rounded-[3px] border border-line-3 px-2.5 py-1 text-[11.5px] text-muted"
                            >
                              {r.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              )
            })
          ) : (
            <EmptyState
              title={`${client.name.split(' ')[0]}'s plan is ${percent}% complete.`}
              hint="Full step-level detail syncs from the client app. Only Marcus Reyes has a live plan in this demo environment."
            />
          )}
        </div>
      )}

      {tab === 'Referrals' && (
        <Panel label={`Referrals — ${referrals.length}`} bodyClassName="p-0">
          {referrals.length === 0 ? (
            <div className="px-5 py-12 text-center text-[13px] text-ghost">
              No referrals for this client yet.
            </div>
          ) : (
            referrals.map((referral) => (
              <ReferralRow key={referral.id} referral={referral} />
            ))
          )}
        </Panel>
      )}

      {tab === 'Documents' && (
        <Panel label={`Documents — ${documents.length}`} bodyClassName="p-0">
          {documents.length === 0 ? (
            <div className="px-5 py-12 text-center text-[13px] text-ghost">No documents on file.</div>
          ) : (
            documents.map((doc) => (
              <div
                key={doc.id}
                className="flex flex-col gap-3 border-b border-line px-5 py-4 last:border-0 sm:flex-row sm:items-center"
              >
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[13.5px]">{doc.name}</span>
                    <StatusBadge status={doc.status} />
                  </div>
                  <span className="text-[12px] text-faint">{doc.note}</span>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="font-mono text-[10.5px] text-ghost">
                    {doc.uploadedOn ? formatDate(doc.uploadedOn) : '—'}
                  </span>
                  {(doc.status === 'Review' || doc.status === 'Uploaded') && (
                    <Button
                      size="sm"
                      variant="brass"
                      onClick={() => {
                        dispatch({
                          type: 'setDocumentStatus',
                          documentId: doc.id,
                          status: 'Verified',
                          reviewer: state.session?.name ?? 'Renee Carter',
                        })
                        notify(`${doc.name} verified`)
                      }}
                    >
                      Verify
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </Panel>
      )}

      {tab === 'Appointments' && (
        <Panel label={`Appointments — ${appointments.length}`} bodyClassName="p-0">
          {appointments.length === 0 ? (
            <div className="px-5 py-12 text-center text-[13px] text-ghost">Nothing scheduled.</div>
          ) : (
            appointments.map((appt) => (
              <div
                key={appt.id}
                className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 last:border-0"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[13.5px]">{appt.title}</span>
                  <span className="text-[11.5px] text-faint">
                    {formatDate(appt.startsAt)} · {appt.withWhom} · {appt.location}
                  </span>
                </div>
                <Badge tone={appt.confirmed ? 'ok' : 'warn'}>
                  {appt.confirmed ? 'Confirmed' : 'Awaiting client'}
                </Badge>
              </div>
            ))
          )}
        </Panel>
      )}

      {tab === 'Messages' && (
        <Card className="flex flex-col gap-4 p-6">
          {messages.length === 0 ? (
            <EmptyState title="No messages with this client yet." />
          ) : (
            messages.map((message) => {
              const fromAdvocate = message.authorRole === 'advocate'
              return (
                <div
                  key={message.id}
                  className={cn('flex max-w-[76%] flex-col gap-1.5', fromAdvocate && 'items-end self-end')}
                >
                  <div
                    className={cn(
                      'rounded-[8px] px-4 py-3 text-[13.5px] leading-[1.65]',
                      fromAdvocate
                        ? 'bg-elevated text-text'
                        : 'border border-line-2 bg-surface-2 text-text-2',
                    )}
                  >
                    {message.body}
                  </div>
                  <span className="font-mono text-[10.5px] text-ghost">
                    {message.author} · {relativeFromNow(message.sentAt)}
                  </span>
                </div>
              )
            })
          )}
        </Card>
      )}

      {tab === 'Support network' && (
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Panel label="Consent-aware coordination" bodyClassName="p-0">
            {client.supportNetwork.map((entry) => (
              <div key={entry.org} className="flex flex-col gap-2 border-b border-line px-5 py-5 last:border-0">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[14px]">{entry.org}</span>
                  <Badge tone={entry.access === 'Full access' ? 'ok' : entry.access === 'Requested' ? 'warn' : 'info'}>
                    {entry.access}
                  </Badge>
                </div>
                <span className="text-[12.5px] text-faint">{entry.role}</span>
              </div>
            ))}
          </Panel>
          <Card tone="sunken" className="p-6">
            <div className="eyebrow-sm mb-3">How access works</div>
            <p className="text-[13.5px] leading-relaxed text-faint">
              Each organization sees only the part of the record their referral covers. Adding a new
              organization sends {client.name.split(' ')[0]} a consent request in the client app
              before anything is shared, and every view is written to an audit log the client can
              read.
            </p>
          </Card>
        </div>
      )}

      <AddNoteModal
        open={noteOpen}
        onClose={() => setNoteOpen(false)}
        clientId={client.id}
        clientName={client.name}
      />
      <CreateReferralModal
        open={referralOpen}
        onClose={() => setReferralOpen(false)}
        clientId={client.id}
        clientName={client.name}
      />
    </>
  )
}

function BackLink() {
  return (
    <Link
      to="/advocate/caseload"
      className="mb-6 inline-flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-brass"
    >
      <ArrowLeft size={14} /> Caseload
    </Link>
  )
}

function ReferralRow({ referral }: { referral: Referral }) {
  const { dispatch } = useApp()
  const notify = useToast()

  return (
    <div className="flex flex-col gap-3 border-b border-line px-5 py-4 last:border-0 sm:flex-row sm:items-center">
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[13.5px]">{referral.org}</span>
          <StatusBadge status={referral.status} />
        </div>
        <span className="text-[12px] text-faint">
          {referral.service} · updated {relativeFromNow(referral.updatedOn)}
        </span>
        <span className="text-[12px] text-ghost">{referral.note}</span>
      </div>
      {referral.status === 'Draft' && (
        <Button
          size="sm"
          variant="brass"
          className="shrink-0"
          onClick={() => {
            dispatch({ type: 'setReferralStatus', referralId: referral.id, status: 'Sent' })
            notify(`Referral sent to ${referral.org}`)
          }}
        >
          Send
        </Button>
      )}
    </div>
  )
}

function AddNoteModal({
  open,
  onClose,
  clientId,
  clientName,
}: {
  open: boolean
  onClose: () => void
  clientId: string
  clientName: string
}) {
  const { state, dispatch } = useApp()
  const notify = useToast()
  const [body, setBody] = useState('')
  const [error, setError] = useState('')

  function save() {
    if (body.trim().length < 5) {
      setError('A note needs at least a sentence.')
      return
    }
    dispatch({
      type: 'addCaseNote',
      note: {
        id: `note-${Date.now()}`,
        clientId,
        author: state.session?.name ?? 'Renee Carter',
        body: body.trim(),
        createdOn: new Date().toISOString().slice(0, 10),
      },
    })
    notify('Case note added')
    setBody('')
    setError('')
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      eyebrow={clientName}
      title="Add a case note"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={save}>
            Save note
          </Button>
        </>
      }
    >
      <Field
        label="Note"
        error={error || undefined}
        hint="Notes are visible to everyone on the support network with full access."
      >
        <Textarea
          rows={5}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Called re: income letter. Supervisor can provide one this week."
        />
      </Field>
    </Modal>
  )
}

function CreateReferralModal({
  open,
  onClose,
  clientId,
  clientName,
}: {
  open: boolean
  onClose: () => void
  clientId: string
  clientName: string
}) {
  const { dispatch } = useApp()
  const notify = useToast()
  const [org, setOrg] = useState(PARTNERS[0].name)
  const [service, setService] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState('')

  function create(send: boolean) {
    if (service.trim().length < 3) {
      setError('Describe the service being referred for.')
      return
    }
    const now = new Date().toISOString().slice(0, 10)
    dispatch({
      type: 'addReferral',
      referral: {
        id: `ref-${Date.now()}`,
        clientId,
        clientName,
        org,
        service: service.trim(),
        status: send ? 'Sent' : 'Draft',
        createdOn: now,
        updatedOn: now,
        note: note.trim() || 'Created from the client case file.',
      },
    })
    notify(send ? `Referral sent to ${org}` : 'Referral saved as a draft')
    setService('')
    setNote('')
    setError('')
    onClose()
  }

  const partner = PARTNERS.find((p) => p.name === org)

  return (
    <Modal
      open={open}
      onClose={onClose}
      eyebrow={clientName}
      title="Create a referral"
      footer={
        <>
          <Button variant="ghost" onClick={() => create(false)}>
            Save as draft
          </Button>
          <Button variant="primary" onClick={() => create(true)}>
            Send referral
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <Field
          label="Partner organization"
          hint={
            partner
              ? `${partner.acceptanceRate}% acceptance rate · median response ${partner.avgResponseHrs}h`
              : undefined
          }
        >
          <Select value={org} onChange={(e) => setOrg(e.target.value)}>
            {PARTNERS.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name} — {p.focus}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Service" error={error || undefined}>
          <Input
            value={service}
            onChange={(e) => setService(e.target.value)}
            placeholder="Transitional housing"
          />
        </Field>

        <Field label="Note to the partner">
          <Textarea
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Employed part-time, voucher pending. Available for a viewing any weekday."
          />
        </Field>

        <div className="rounded-[4px] border border-line-2 bg-surface-2 px-4 py-3 text-[12.5px] leading-relaxed text-ghost">
          The partner receives only the fields relevant to this referral. {clientName.split(' ')[0]}{' '}
          is notified and can see exactly what was shared.
        </div>
      </div>
    </Modal>
  )
}
