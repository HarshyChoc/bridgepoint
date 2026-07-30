import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Wordmark } from '@/components/brand/Wordmark'
import { LinkButton } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

const LINKS = [
  { to: '/platform', label: 'Platform' },
  { to: '/individuals', label: 'Individuals' },
  { to: '/organizations', label: 'Organizations' },
  { to: '/landlords', label: 'Landlords' },
  { to: '/government', label: 'Government' },
  { to: '/roadmap', label: 'Roadmap' },
]

export function SiteNav({ cta = 'Request a briefing', ctaTo = '/contact' }: { cta?: string; ctaTo?: string }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-8 px-6 py-4 lg:px-14">
        <Wordmark />

        <nav className="hidden items-center gap-8 text-[13.5px] text-muted lg:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn('transition-colors hover:text-brass', isActive && 'text-text')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link to="/signin" className="text-[13.5px] text-muted transition-colors hover:text-brass">
            Sign in
          </Link>
          <LinkButton to={ctaTo} size="sm" className="py-2.5">
            {cta}
          </LinkButton>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          className="cursor-pointer p-1 text-muted lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav className="animate-fade flex flex-col border-t border-line bg-ink px-6 py-4 lg:hidden">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="border-b border-line py-3 text-[14px] text-muted last:border-0"
            >
              {link.label}
            </NavLink>
          ))}
          <div className="flex gap-3 pt-4">
            <LinkButton to="/signin" size="sm" className="flex-1">
              Sign in
            </LinkButton>
            <LinkButton to={ctaTo} size="sm" variant="primary" className="flex-1">
              {cta}
            </LinkButton>
          </div>
        </nav>
      )}
    </header>
  )
}
