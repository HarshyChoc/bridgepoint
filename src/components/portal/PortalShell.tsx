import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LogOut, Menu, RotateCcw, X } from 'lucide-react'
import { Wordmark } from '@/components/brand/Wordmark'
import { Badge } from '@/components/ui/Badge'
import { useApp } from '@/state/AppStateContext'
import { useToast } from '@/components/ui/Toast'
import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'
import type { Role } from '@/state/types'

export interface PortalLink {
  to: string
  label: string
  end?: boolean
}

interface PortalShellProps {
  brand: string
  links: PortalLink[]
  role: Role
  right?: ReactNode
  children?: ReactNode
}

/** Shared chrome for all five portals: top bar, section nav, session controls. */
export function PortalShell({ brand, links, role, right, children }: PortalShellProps) {
  const { state, dispatch } = useApp()
  const navigate = useNavigate()
  const notify = useToast()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0 })
    setMenuOpen(false)
  }, [pathname])

  // Anyone landing here directly gets a session so the demo never dead-ends.
  useEffect(() => {
    if (state.session?.role !== role) {
      dispatch({
        type: 'signIn',
        session: {
          role,
          name: DEFAULT_IDENTITY[role].name,
          org: DEFAULT_IDENTITY[role].org,
          signedInAt: new Date().toISOString(),
        },
      })
    }
  }, [dispatch, role, state.session?.role])

  function signOut() {
    dispatch({ type: 'signOut' })
    navigate('/')
  }

  function resetDemo() {
    dispatch({ type: 'reset' })
    notify('Demo data reset')
  }

  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <header className="sticky top-0 z-30 border-b border-line bg-ink/94 backdrop-blur-md">
        <div className="flex items-center justify-between gap-6 px-6 py-3.5 lg:px-8">
          <div className="flex items-center gap-5">
            <Wordmark label={brand} to="/" size="sm" />
            <Badge tone="neutral" className="hidden sm:inline-flex">
              Demo
            </Badge>
          </div>

          <nav className="hidden min-w-0 items-center gap-1 overflow-x-auto lg:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  cn(
                    'rounded-[4px] px-3 py-2 text-[13px] whitespace-nowrap transition-colors',
                    isActive ? 'bg-raised text-text' : 'text-muted hover:text-text',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            {right}
            <div className="hidden shrink-0 flex-col items-end whitespace-nowrap xl:flex">
              <span className="text-[12.5px] text-text-2">{state.session?.name}</span>
              <span className="text-[11px] text-ghost">{state.session?.org}</span>
            </div>
            <button
              onClick={resetDemo}
              title="Reset demo data"
              aria-label="Reset demo data"
              className="hidden cursor-pointer rounded p-2 text-faint transition-colors hover:bg-raised hover:text-text sm:block"
            >
              <RotateCcw size={15} />
            </button>
            <button
              onClick={signOut}
              title="Sign out"
              aria-label="Sign out"
              className="hidden cursor-pointer rounded p-2 text-faint transition-colors hover:bg-raised hover:text-text sm:block"
            >
              <LogOut size={15} />
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className="cursor-pointer p-1 text-muted lg:hidden"
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="animate-fade flex flex-col border-t border-line px-6 py-2 lg:hidden">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className="border-b border-line py-3 text-[14px] text-muted last:border-0"
              >
                {link.label}
              </NavLink>
            ))}
            <button
              onClick={signOut}
              className="cursor-pointer border-t border-line py-3 text-left text-[14px] text-muted"
            >
              Sign out
            </button>
          </nav>
        )}
      </header>

      <main className="flex-1 px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-[1320px]">
          <Outlet />
        </div>
      </main>

      {children}
    </div>
  )
}

const DEFAULT_IDENTITY: Record<Role, { name: string; org: string }> = {
  individual: { name: 'Marcus Reyes', org: 'Essex County' },
  advocate: { name: 'Renee Carter', org: 'Newark Reentry Coalition' },
  landlord: { name: 'Yvette Sandoval', org: 'Clinton Avenue Properties' },
  tenant: { name: 'Tanya Brooks', org: '218 Clinton Ave, Unit 2A' },
  government: { name: 'Dir. Amara Okonjo', org: 'NJ Dept. of Community Affairs' },
}
