import { useState, type FormEvent } from 'react'
import { Check } from 'lucide-react'
import { Display, Eyebrow } from '@/components/ui/Bits'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Field, Input, Select, Textarea } from '@/components/ui/Field'
import { Section } from '@/components/marketing/Section'

const CHANNELS = [
  { label: 'Pilot partnerships', email: 'partners@bridgepointjustice.org' },
  { label: 'Government and funders', email: 'policy@bridgepointjustice.org' },
  { label: 'Press', email: 'press@bridgepointjustice.org' },
]

const ROLES = ['Government agency', 'Nonprofit', 'Funder', 'Housing provider', 'Other']

interface FormValues {
  name: string
  organization: string
  email: string
  role: string
  message: string
}

const EMPTY: FormValues = { name: '', organization: '', email: '', role: ROLES[0], message: '' }

export function Contact() {
  const [values, setValues] = useState<FormValues>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({})
  const [sent, setSent] = useState(false)

  const update = (key: keyof FormValues, value: string) =>
    setValues((current) => ({ ...current, [key]: value }))

  function validate(input: FormValues): Partial<Record<keyof FormValues, string>> {
    const next: Partial<Record<keyof FormValues, string>> = {}
    if (input.name.trim().length < 2) next.name = 'Please enter your name.'
    if (input.organization.trim().length < 2) next.organization = 'Please enter your organization.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.email.trim()))
      next.email = 'Please enter a valid email address.'
    if (input.message.trim().length < 10)
      next.message = 'A sentence or two about what you would like to discuss.'
    return next
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length === 0) setSent(true)
  }

  return (
    <Section bordered={false} className="pt-20">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="flex flex-col gap-7">
          <Eyebrow brass>Partner with us</Eyebrow>
          <Display as="h1" className="text-[40px] sm:text-[50px]">
            Ready for the next stage of the conversation.
          </Display>
          <p className="text-[16.5px] leading-[1.65] text-muted">
            Pilot programs, strategic partnerships, and closer collaboration with the nonprofit
            organizations and government agencies already doing this work across New Jersey.
          </p>

          <div className="mt-4 flex flex-col">
            {CHANNELS.map((channel) => (
              <div
                key={channel.label}
                className="flex flex-col gap-1 border-b border-line py-5 last:border-0"
              >
                <div className="eyebrow-sm">{channel.label}</div>
                <a
                  href={`mailto:${channel.email}`}
                  className="text-[14.5px] text-text-2 transition-colors hover:text-brass"
                >
                  {channel.email}
                </a>
              </div>
            ))}
          </div>
        </div>

        <Card className="p-8">
          {sent ? (
            <div className="flex flex-col items-start gap-4 py-10">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brass-dim">
                <Check size={18} className="text-brass" />
              </span>
              <Display className="text-[24px]">Request received.</Display>
              <p className="text-[14.5px] leading-relaxed text-muted">
                Thank you, {values.name.split(' ')[0]}. Someone from the BridgePoint Justice team
                will follow up at {values.email} within two business days to schedule a briefing.
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setValues(EMPTY)
                  setSent(false)
                }}
              >
                Submit another request
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
              <div className="eyebrow">Request a briefing</div>

              <Field label="Name" error={errors.name}>
                <Input
                  value={values.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="Jordan Ellis"
                  autoComplete="name"
                />
              </Field>

              <Field label="Organization" error={errors.organization}>
                <Input
                  value={values.organization}
                  onChange={(e) => update('organization', e.target.value)}
                  placeholder="Department of Community Affairs"
                  autoComplete="organization"
                />
              </Field>

              <Field label="Email" error={errors.email}>
                <Input
                  type="email"
                  value={values.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="jordan.ellis@example.gov"
                  autoComplete="email"
                />
              </Field>

              <Field label="I am writing as">
                <Select value={values.role} onChange={(e) => update('role', e.target.value)}>
                  {ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field label="What would you like to discuss?" error={errors.message}>
                <Textarea
                  rows={4}
                  value={values.message}
                  onChange={(e) => update('message', e.target.value)}
                  placeholder="We are exploring a county-level pilot for the 2027 fiscal year."
                />
              </Field>

              <Button type="submit" variant="primary" size="lg" className="self-start">
                Send request
              </Button>
            </form>
          )}
        </Card>
      </div>
    </Section>
  )
}
