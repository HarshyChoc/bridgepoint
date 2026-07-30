import { ShieldCheck } from 'lucide-react'
import { PortalShell, type PortalLink } from '@/components/portal/PortalShell'

const LINKS: PortalLink[] = [
  { to: '/admin', label: 'Statewide overview', end: true },
  { to: '/admin/counties', label: 'Counties' },
  { to: '/admin/providers', label: 'Providers' },
  { to: '/admin/housing-supply', label: 'Housing supply' },
  { to: '/admin/grants', label: 'Grant compliance' },
  { to: '/admin/service-gaps', label: 'Service gaps' },
  { to: '/admin/exports', label: 'Exports' },
]

export function GovernmentPortal() {
  return (
    <PortalShell
      brand="Administration"
      links={LINKS}
      role="government"
      right={
        <span className="hidden items-center gap-2 rounded-[3px] border border-brass-dim px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-brass uppercase xl:inline-flex">
          <ShieldCheck size={11} />
          Privacy mode
        </span>
      }
    />
  )
}
