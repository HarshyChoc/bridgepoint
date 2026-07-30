import { Link } from 'react-router-dom'
import { Wordmark } from '@/components/brand/Wordmark'

const COLUMNS = [
  {
    label: 'Platform',
    links: [
      { to: '/platform', label: 'How it works' },
      { to: '/platform#technology', label: 'Technology' },
      { to: '/roadmap', label: 'Roadmap' },
    ],
  },
  {
    label: 'Who it serves',
    links: [
      { to: '/individuals', label: 'Individuals' },
      { to: '/organizations', label: 'Organizations' },
      { to: '/landlords', label: 'Landlords' },
      { to: '/government', label: 'Government' },
    ],
  },
  {
    label: 'Organization',
    links: [
      { to: '/about', label: 'About' },
      { to: '/about#recognition', label: 'Recognition' },
      { to: '/contact', label: 'Contact' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-14">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-4">
            <Wordmark />
            <p className="max-w-xs text-[13px] leading-relaxed text-faint">
              A project of Kadima AI LLC, developed through Engage NJ and the Kesselman Fellowship
              for the Advancement of Democracy.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.label} className="flex flex-col gap-4">
              <div className="eyebrow-sm">{column.label}</div>
              <div className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="text-[13px] text-muted transition-colors hover:text-brass"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-7 text-[12px] text-ghost sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Kadima AI LLC</span>
          <span>Privacy · Security · Accessibility</span>
        </div>
      </div>
    </footer>
  )
}
