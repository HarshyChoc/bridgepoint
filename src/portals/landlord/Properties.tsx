import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LifeBuoy, Plus } from 'lucide-react'
import { PageHead } from '@/components/portal/PageHead'
import { Badge, StatusBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, Panel } from '@/components/ui/Card'
import { MetricTile } from '@/components/ui/Bits'
import { Modal } from '@/components/ui/Modal'
import { Field, Input, Select } from '@/components/ui/Field'
import { INCENTIVES, INCOMING_REFERRALS, LANDLORD_PROFILE, UNITS } from '@/data/landlord'
import { currency, formatDate } from '@/lib/format'
import { useApp } from '@/state/AppStateContext'
import { useToast } from '@/components/ui/Toast'

export function Properties() {
  const { state, dispatch } = useApp()
  const notify = useToast()
  const [addOpen, setAddOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [label, setLabel] = useState('')
  const [beds, setBeds] = useState('1 bed')
  const [rent, setRent] = useState('')
  const [error, setError] = useState('')

  const openReferrals = INCOMING_REFERRALS.filter((r) => !state.landlordDecisions[r.id]).length
  const inspectionsDue = UNITS.filter((u) => u.inspectionOn !== null).length
  const docsOutstanding = UNITS.reduce((sum, u) => sum + u.missingDocs.length, 0)
  const processing = INCENTIVES.filter((i) => i.status === 'Processing').reduce(
    (sum, i) => sum + i.amount,
    0,
  )
  const addedCount = state.addedUnitIds.length

  function addUnit() {
    if (label.trim().length < 2 || !rent) {
      setError('A unit label and monthly rent are both required.')
      return
    }
    dispatch({ type: 'addUnit', unitId: `u-${label.trim().toLowerCase().replace(/\s+/g, '-')}` })
    notify(`${label.trim()} listed — a housing coordinator will confirm within one business day`)
    setAddOpen(false)
    setLabel('')
    setRent('')
    setError('')
  }

  return (
    <>
      <PageHead
        eyebrow={LANDLORD_PROFILE.contact}
        title={LANDLORD_PROFILE.name}
        meta={`${LANDLORD_PROFILE.unitsEnrolled + addedCount} units enrolled · ${LANDLORD_PROFILE.vacant} vacant · ${currency(LANDLORD_PROFILE.incentivesPaidYtd)} in incentives paid this year`}
        actions={
          <>
            <Button onClick={() => setHelpOpen(true)}>
              <LifeBuoy size={14} /> Request assistance
            </Button>
            <Button variant="primary" onClick={() => setAddOpen(true)}>
              <Plus size={14} /> Add a unit
            </Button>
          </>
        }
      />

      <div className="mb-6 grid gap-px overflow-hidden rounded-md border border-line-2 bg-line-2 sm:grid-cols-2 lg:grid-cols-4">
        <MetricTile label="Open referrals" value={openReferrals} className="bg-surface" />
        <MetricTile label="Inspections due" value={inspectionsDue} className="bg-surface" />
        <MetricTile label="Docs outstanding" value={docsOutstanding} className="bg-surface" />
        <MetricTile label="Payment processing" value={currency(processing)} className="bg-surface" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="flex flex-col gap-3">
          <div className="eyebrow mb-1">Your units</div>
          {UNITS.map((unit) => (
            <Card key={unit.id} className="flex flex-col gap-5 p-5 sm:flex-row">
              <div
                className="flex h-24 w-full shrink-0 items-end justify-start rounded-[4px] border border-line-2 p-2.5 sm:w-36"
                style={{ background: `linear-gradient(140deg, ${unit.tone}, #0E1013)` }}
              >
                <span className="eyebrow-sm text-ghost">Unit photo</span>
              </div>

              <div className="flex flex-1 flex-col gap-2.5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[15.5px]">{unit.label}</span>
                  <StatusBadge status={unit.status} />
                  {unit.referrals > 0 && (
                    <Badge tone="info">
                      {unit.referrals} {unit.referrals === 1 ? 'referral' : 'referrals'}
                    </Badge>
                  )}
                </div>
                <span className="text-[12.5px] text-faint">
                  {unit.beds} · {currency(unit.rent)}/mo · {unit.address}
                </span>

                <div className="flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-3 text-[12px]">
                  {unit.inspectionOn && (
                    <Detail label="Inspection" value={formatDate(unit.inspectionOn)} />
                  )}
                  {unit.missingDocs.length > 0 && (
                    <Detail label="Missing" value={unit.missingDocs.join(', ')} />
                  )}
                  {unit.retentionNote && <Detail label="Retention" value={unit.retentionNote} />}
                  {unit.status === 'Available' && (
                    <Detail label="Available" value={formatDate(unit.availableOn)} />
                  )}
                </div>
              </div>
            </Card>
          ))}

          {state.addedUnitIds.map((id) => (
            <Card key={id} className="flex items-center gap-4 border-dashed p-5">
              <Badge tone="warn">Pending review</Badge>
              <span className="text-[13.5px] text-muted">
                New listing submitted — a housing coordinator confirms enrollment within one business
                day.
              </span>
            </Card>
          ))}
        </div>

        <div className="flex flex-col gap-5">
          <Panel
            label="Incoming referrals"
            bodyClassName="p-0"
            action={
              <Link to="/landlord/referrals" className="text-[12px] text-brass">
                View all
              </Link>
            }
          >
            {INCOMING_REFERRALS.map((referral) => (
              <div
                key={referral.id}
                className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 last:border-0"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[13.5px]">
                    {referral.initials} · {referral.unit}
                  </span>
                  <span className="text-[11.5px] text-faint">{referral.org}</span>
                </div>
                <StatusBadge status={state.landlordDecisions[referral.id] ?? referral.status} />
              </div>
            ))}
          </Panel>

          <Panel
            label="Incentive payments"
            bodyClassName="p-0"
            action={
              <Link to="/landlord/payments" className="text-[12px] text-brass">
                View all
              </Link>
            }
          >
            {INCENTIVES.slice(0, 3).map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 last:border-0"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[13.5px]">{payment.label}</span>
                  <span className="text-[11.5px] text-faint">{payment.unit}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-mono text-[12px] text-text-2">
                    {currency(payment.amount)}
                  </span>
                  <StatusBadge status={payment.status} />
                </div>
              </div>
            ))}
          </Panel>
        </div>
      </div>

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        eyebrow={LANDLORD_PROFILE.name}
        title="List a unit"
        footer={
          <>
            <Button variant="ghost" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={addUnit}>
              Submit listing
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-5">
          <Field label="Unit label" error={error && label.trim().length < 2 ? error : undefined}>
            <Input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Unit 6A" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Size">
              <Select value={beds} onChange={(e) => setBeds(e.target.value)}>
                {['Studio', '1 bed', '2 bed', '3 bed'].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Monthly rent" error={error && !rent ? error : undefined}>
              <Input
                type="number"
                value={rent}
                onChange={(e) => setRent(e.target.value)}
                placeholder="1350"
              />
            </Field>
          </div>
          <div className="rounded-[4px] border border-line-2 bg-surface-2 px-4 py-3 text-[12.5px] leading-relaxed text-ghost">
            Listing a unit enrolls it for the $1,400 signing bonus and the damage mitigation fund.
            Inspection scheduling is handled for you once a referral is accepted.
          </div>
        </div>
      </Modal>

      <Modal
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        eyebrow="Support"
        title="Request assistance"
        footer={
          <>
            <Button variant="ghost" onClick={() => setHelpOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                notify('Request sent — a housing coordinator will call within one business day')
                setHelpOpen(false)
              }}
            >
              Send request
            </Button>
          </>
        }
      >
        <p className="text-[13.5px] leading-relaxed text-muted">
          A housing coordinator handles inspection rescheduling, missing documentation, tenant issues,
          and incentive payment questions. Requests are answered within one business day.
        </p>
      </Modal>
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
