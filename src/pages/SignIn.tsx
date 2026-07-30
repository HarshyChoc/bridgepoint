import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Building2, Landmark, Home, User, Users } from 'lucide-react'
import { Wordmark } from '@/components/brand/Wordmark'
import { Button } from '@/components/ui/Button'
import { Field, Input } from '@/components/ui/Field'
import { Display, Eyebrow } from '@/components/ui/Bits'
import { useApp } from '@/state/AppStateContext'
import type { Role } from '@/state/types'
import type { LucideIcon } from 'lucide-react'

interface RoleOption {
  role: Role
  title: string
  who: string
  landing: string
  icon: LucideIcon
  name: string
  org: string
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    role: 'individual',
    title: 'Individual',
    who: 'A guided plan, verified resources, and a person to message.',
    landing: '/app',
    icon: User,
    name: 'Marcus Reyes',
    org: 'Essex County',
  },
  {
    role: 'advocate',
    title: 'Advocate',
    who: 'Caseload, referrals, documents, and next best action.',
    landing: '/advocate',
    icon: Users,
    name: 'Renee Carter',
    org: 'Newark Reentry Coalition',
  },
  {
    role: 'landlord',
    title: 'Landlord',
    who: 'Vacancies, inspections, and incentive payments.',
    landing: '/landlord',
    icon: Building2,
    name: 'Yvette Sandoval',
    org: 'Clinton Avenue Properties',
  },
  {
    role: 'tenant',
    title: 'Tenant success',
    who: 'Retention support from move-in through the 365-day review.',
    landing: '/tenant',
    icon: Home,
    name: 'Tanya Brooks',
    org: '218 Clinton Ave, Unit 2A',
  },
  {
    role: 'government',
    title: 'Government',
    who: 'Placements, retention, gaps, and grant compliance.',
    landing: '/admin',
    icon: Landmark,
    name: 'Dir. Amara Okonjo',
    org: 'NJ Dept. of Community Affairs',
  },
]

export function SignIn() {
  const { dispatch } = useApp()
  const navigate = useNavigate()
  const [selected, setSelected] = useState<RoleOption>(ROLE_OPTIONS[0])
  const [email, setEmail] = useState('')

  function signIn(option: RoleOption) {
    dispatch({
      type: 'signIn',
      session: {
        role: option.role,
        name: option.name,
        org: option.org,
        signedInAt: new Date().toISOString(),
      },
    })
    navigate(option.landing)
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    signIn(selected)
  }

  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <div className="border-b border-line px-6 py-5 lg:px-14">
        <div className="mx-auto flex max-w-[1080px] items-center justify-between">
          <Wordmark />
          <Link to="/" className="text-[13.5px] text-muted transition-colors hover:text-brass">
            Back to site
          </Link>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-16 lg:px-14">
        <div className="w-full max-w-[1080px]">
          <div className="flex max-w-2xl flex-col gap-4">
            <Eyebrow brass>Demonstration environment</Eyebrow>
            <Display as="h1" className="text-[36px] sm:text-[44px]">
              Choose a vantage point.
            </Display>
            <p className="text-[15.5px] leading-[1.65] text-muted">
              Every role below opens the same coordinated record from a different side. Changes you
              make in one portal appear in the others — completing a plan step as Marcus updates
              Renee&rsquo;s case file in real time.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-line-2 bg-line-2 sm:grid-cols-2 lg:grid-cols-5">
            {ROLE_OPTIONS.map((option) => {
              const Icon = option.icon
              const active = option.role === selected.role
              return (
                <button
                  key={option.role}
                  onClick={() => setSelected(option)}
                  onDoubleClick={() => signIn(option)}
                  className={
                    'group flex cursor-pointer flex-col gap-3 p-6 text-left transition-colors ' +
                    (active ? 'bg-raised' : 'bg-surface hover:bg-raised')
                  }
                >
                  <Icon
                    size={20}
                    strokeWidth={1.4}
                    className={active ? 'text-brass' : 'text-faint'}
                  />
                  <div className={'text-[15px] font-medium ' + (active ? 'text-brass' : '')}>
                    {option.title}
                  </div>
                  <div className="text-[12.5px] leading-[1.6] text-faint">{option.who}</div>
                </button>
              )
            })}
          </div>

          <form
            onSubmit={onSubmit}
            className="mt-8 flex flex-col gap-6 rounded-md border border-line-2 bg-surface p-8 sm:flex-row sm:items-end"
          >
            <Field label="Signing in as" className="flex-1">
              <Input value={`${selected.name} · ${selected.org}`} readOnly className="text-muted" />
            </Field>
            <Field label="Work email (optional in the demo)" className="flex-1">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@organization.org"
                autoComplete="email"
              />
            </Field>
            <Button type="submit" variant="primary" size="lg" className="shrink-0">
              Enter the {selected.title.toLowerCase()} portal
              <ArrowRight size={15} />
            </Button>
          </form>

          <p className="mt-6 text-[12.5px] text-ghost">
            No password is required. This environment contains illustrative records only — no real
            client data is present.
          </p>
        </div>
      </div>
    </div>
  )
}
