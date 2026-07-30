import { useState } from 'react'
import { Calendar, Check, Navigation } from 'lucide-react'
import { PageHead } from '@/components/portal/PageHead'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/Bits'
import { Modal } from '@/components/ui/Modal'
import { Field, Input, Select } from '@/components/ui/Field'
import { PRIMARY_CLIENT_ID } from '@/data/clients'
import { dayAndMonth, formatDate } from '@/lib/format'
import { useApp } from '@/state/AppStateContext'
import { useToast } from '@/components/ui/Toast'
import type { Appointment } from '@/data/types'

const KINDS: Array<Appointment['kind']> = ['advocate', 'viewing', 'intake', 'clinic', 'court']

export function Appointments() {
  const { state, dispatch } = useApp()
  const notify = useToast()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [withWhom, setWithWhom] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('10:00')
  const [kind, setKind] = useState<Appointment['kind']>('advocate')
  const [error, setError] = useState('')

  const mine = state.appointments
    .filter((a) => a.clientId === PRIMARY_CLIENT_ID)
    .slice()
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))

  function book() {
    if (title.trim().length < 3 || !date) {
      setError('A title and a date are both required.')
      return
    }
    dispatch({
      type: 'addAppointment',
      appointment: {
        id: `appt-${Date.now()}`,
        clientId: PRIMARY_CLIENT_ID,
        title: title.trim(),
        withWhom: withWhom.trim() || 'BridgePoint',
        location: 'To be confirmed',
        startsAt: `${date}T${time}:00`,
        kind,
        confirmed: true,
      },
    })
    notify('Appointment added to your plan')
    setOpen(false)
    setTitle('')
    setWithWhom('')
    setDate('')
    setError('')
  }

  return (
    <>
      <PageHead
        eyebrow="Scheduling"
        title="Appointments"
        meta="Confirming an appointment sends you directions the morning of."
        actions={
          <Button variant="primary" onClick={() => setOpen(true)}>
            <Calendar size={14} /> Add an appointment
          </Button>
        }
      />

      {mine.length === 0 ? (
        <EmptyState title="Nothing scheduled." hint="Appointments created by your advocate appear here automatically." />
      ) : (
        <div className="flex flex-col gap-3">
          {mine.map((appt) => {
            const { day, month } = dayAndMonth(appt.startsAt)
            return (
              <Card key={appt.id} className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
                <div className="flex w-14 shrink-0 flex-col items-center">
                  <span className="font-serif text-[26px] leading-none font-light">{day}</span>
                  <span className="font-mono text-[10px] text-faint">{month}</span>
                </div>

                <div className="flex flex-1 flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[15px]">{appt.title}</span>
                    <Badge tone={appt.confirmed ? 'ok' : 'warn'}>
                      {appt.confirmed ? 'Confirmed' : 'To confirm'}
                    </Badge>
                  </div>
                  <span className="text-[13px] text-faint">
                    {formatDate(appt.startsAt)} at {timeOf(appt.startsAt)} · {appt.withWhom}
                  </span>
                  <span className="text-[12.5px] text-ghost">{appt.location}</span>
                </div>

                <div className="flex shrink-0 gap-2.5">
                  {!appt.confirmed && (
                    <Button
                      variant="brass"
                      size="sm"
                      onClick={() => {
                        dispatch({ type: 'confirmAppointment', appointmentId: appt.id })
                        notify('Appointment confirmed — directions will be sent')
                      }}
                    >
                      <Check size={13} /> Confirm
                    </Button>
                  )}
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(appt.location)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-[4px] border border-line-3 px-3 py-1.5 text-[12.5px] text-muted transition-colors hover:border-brass hover:text-brass"
                  >
                    <Navigation size={12} /> Directions
                  </a>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        eyebrow="Scheduling"
        title="Add an appointment"
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={book}>
              Add to my plan
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-5">
          <Field label="What is it?" error={error && title.trim().length < 3 ? error : undefined}>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="SNAP application appointment"
            />
          </Field>
          <Field label="With whom">
            <Input
              value={withWhom}
              onChange={(e) => setWithWhom(e.target.value)}
              placeholder="Essex County Board of Social Services"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Date" error={error && !date ? error : undefined}>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Field>
            <Field label="Time">
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </Field>
          </div>
          <Field label="Type">
            <Select value={kind} onChange={(e) => setKind(e.target.value as Appointment['kind'])}>
              {KINDS.map((k) => (
                <option key={k} value={k}>
                  {k[0].toUpperCase() + k.slice(1)}
                </option>
              ))}
            </Select>
          </Field>
        </div>
      </Modal>
    </>
  )
}

function timeOf(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }).toLowerCase()
}
