import type { CountyPerformance, GrantProgram, ServiceGap } from './types'

export const STATEWIDE = {
  individualsServed: 1284,
  placements: 316,
  retention365: 87,
  avgDaysToHousing: 41,
  voucherUtilization: 72,
  organizations: 46,
  counties: 21,
  yoyPlacementChange: 18,
}

export const PLACEMENTS_BY_MONTH = [
  { month: 'Aug', value: 18 },
  { month: 'Sep', value: 21 },
  { month: 'Oct', value: 24 },
  { month: 'Nov', value: 22 },
  { month: 'Dec', value: 19 },
  { month: 'Jan', value: 26 },
  { month: 'Feb', value: 28 },
  { month: 'Mar', value: 31 },
  { month: 'Apr', value: 29 },
  { month: 'May', value: 33 },
  { month: 'Jun', value: 32 },
  { month: 'Jul', value: 33 },
]

export const COUNTY_PERFORMANCE: CountyPerformance[] = [
  { county: 'Essex', placements: 84, retention: 89, avgDays: 38, organizations: 11 },
  { county: 'Camden', placements: 61, retention: 85, avgDays: 44, organizations: 8 },
  { county: 'Hudson', placements: 52, retention: 91, avgDays: 36, organizations: 7 },
  { county: 'Mercer', placements: 38, retention: 82, avgDays: 47, organizations: 5 },
  { county: 'Passaic', placements: 27, retention: 84, avgDays: 49, organizations: 4 },
  { county: 'Union', placements: 24, retention: 88, avgDays: 41, organizations: 4 },
  { county: 'Bergen', placements: 16, retention: 90, avgDays: 39, organizations: 3 },
  { county: 'Atlantic', placements: 14, retention: 79, avgDays: 53, organizations: 2 },
  { county: 'Cumberland', placements: 0, retention: 0, avgDays: 0, organizations: 1 },
  { county: 'Salem', placements: 0, retention: 0, avgDays: 0, organizations: 1 },
]

export const SERVICE_GAPS: ServiceGap[] = [
  {
    id: 'gap-1',
    label: 'Transportation',
    county: 'Salem',
    severity: 'Critical',
    detail:
      'No fixed-route transit within 8 miles of the two participating providers. 11 open plans list transportation as a blocking barrier.',
  },
  {
    id: 'gap-2',
    label: 'Behavioral health',
    county: 'Cumberland',
    severity: 'Critical',
    detail:
      'Average wait for an outpatient intake is 34 days against a statewide median of 11. One provider serving the county.',
  },
  {
    id: 'gap-3',
    label: 'Unit supply',
    county: 'Hudson',
    severity: 'Watch',
    detail:
      'Voucher approvals outpaced enrolled units 3:1 last quarter. Landlord recruitment is the constraint, not funding.',
  },
  {
    id: 'gap-4',
    label: 'Legal aid capacity',
    county: 'Passaic',
    severity: 'Watch',
    detail:
      'Expungement referral acceptance fell to 58% as clinic capacity filled. Referrals are queuing rather than declining.',
  },
  {
    id: 'gap-5',
    label: 'Childcare',
    county: 'Essex',
    severity: 'Watch',
    detail:
      'Households with children reach employment placement 19 days later than households without.',
  },
]

export const GRANTS: GrantProgram[] = [
  {
    id: 'g-1',
    name: 'DCA Reentry Housing Initiative',
    agency: 'NJ Department of Community Affairs',
    status: 'Reporting current',
    awarded: 2400000,
    drawn: 1610000,
    nextReport: '2026-10-15',
  },
  {
    id: 'g-2',
    name: 'Continuum of Care — Essex',
    agency: 'HUD / Essex County CoC',
    status: 'Reporting current',
    awarded: 1150000,
    drawn: 812000,
    nextReport: '2026-09-30',
  },
  {
    id: 'g-3',
    name: 'Workforce Innovation Grant',
    agency: 'NJ Department of Labor',
    status: 'Due Aug 15',
    awarded: 640000,
    drawn: 388000,
    nextReport: '2026-08-15',
  },
  {
    id: 'g-4',
    name: 'State Rental Assistance Program',
    agency: 'NJ Department of Community Affairs',
    status: 'Reporting current',
    awarded: 3100000,
    drawn: 2240000,
    nextReport: '2026-11-01',
  },
]

export const PROVIDER_PERFORMANCE = [
  { org: 'Newark Reentry Coalition', county: 'Essex', clients: 214, placements: 71, retention: 90 },
  { org: 'Isaiah House', county: 'Essex', clients: 168, placements: 54, retention: 86 },
  { org: 'Hudson County Housing Alliance', county: 'Hudson', clients: 149, placements: 52, retention: 91 },
  { org: 'Camden County Homeless Network', county: 'Camden', clients: 177, placements: 61, retention: 85 },
  { org: 'Union Reentry Partners', county: 'Union', clients: 96, placements: 24, retention: 88 },
  { org: 'Passaic County One-Stop', county: 'Passaic', clients: 88, placements: 27, retention: 84 },
]

export const HOUSING_SUPPLY = [
  { county: 'Essex', enrolledUnits: 142, vacant: 18, landlords: 46, avgRent: 1385 },
  { county: 'Hudson', enrolledUnits: 61, vacant: 4, landlords: 21, avgRent: 1620 },
  { county: 'Camden', enrolledUnits: 118, vacant: 22, landlords: 39, avgRent: 1140 },
  { county: 'Mercer', enrolledUnits: 74, vacant: 11, landlords: 26, avgRent: 1290 },
  { county: 'Passaic', enrolledUnits: 53, vacant: 9, landlords: 18, avgRent: 1310 },
  { county: 'Union', enrolledUnits: 47, vacant: 6, landlords: 16, avgRent: 1445 },
]
