import { PortalShell, type PortalLink } from '@/components/portal/PortalShell'
import { Helper } from '@/features/assistant/Helper'

const LINKS: PortalLink[] = [
  { to: '/app', label: 'My plan', end: true },
  { to: '/app/resources', label: 'Resources' },
  { to: '/app/saved', label: 'Saved' },
  { to: '/app/appointments', label: 'Appointments' },
  { to: '/app/documents', label: 'Documents' },
  { to: '/app/messages', label: 'Messages' },
]

export function IndividualPortal() {
  return (
    <PortalShell brand="BridgePoint" links={LINKS} role="individual">
      <Helper variant="client" />
    </PortalShell>
  )
}
