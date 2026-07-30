import { PortalShell, type PortalLink } from '@/components/portal/PortalShell'

const LINKS: PortalLink[] = [
  { to: '/landlord', label: 'Properties', end: true },
  { to: '/landlord/referrals', label: 'Referrals' },
  { to: '/landlord/inspections', label: 'Inspections' },
  { to: '/landlord/documents', label: 'Documents' },
  { to: '/landlord/payments', label: 'Payments' },
  { to: '/landlord/messages', label: 'Messages' },
]

export function LandlordPortal() {
  return <PortalShell brand="Landlord portal" links={LINKS} role="landlord" />
}
