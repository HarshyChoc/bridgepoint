import { PortalShell, type PortalLink } from '@/components/portal/PortalShell'

const LINKS: PortalLink[] = [
  { to: '/tenant', label: 'Home', end: true },
  { to: '/tenant/lease', label: 'My lease' },
  { to: '/tenant/rent', label: 'Rent' },
  { to: '/tenant/learn', label: 'Learn' },
  { to: '/tenant/support', label: 'Support' },
  { to: '/tenant/community', label: 'Community' },
]

export function TenantPortal() {
  return <PortalShell brand="Tenant success" links={LINKS} role="tenant" />
}
