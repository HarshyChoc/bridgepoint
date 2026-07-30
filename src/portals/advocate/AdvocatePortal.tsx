import { PortalShell, type PortalLink } from '@/components/portal/PortalShell'
import { Helper } from '@/features/assistant/Helper'

const LINKS: PortalLink[] = [
  { to: '/advocate', label: 'Dashboard', end: true },
  { to: '/advocate/caseload', label: 'Caseload' },
  { to: '/advocate/referrals', label: 'Referrals' },
  { to: '/advocate/tasks', label: 'Tasks' },
  { to: '/advocate/documents', label: 'Documents' },
  { to: '/advocate/partners', label: 'Partners' },
  { to: '/advocate/analytics', label: 'Analytics' },
]

export function AdvocatePortal() {
  return (
    <PortalShell brand="Advocate portal" links={LINKS} role="advocate">
      <Helper variant="advocate" />
    </PortalShell>
  )
}
