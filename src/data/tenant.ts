export const TENANCY = {
  address: '218 Clinton Ave, Unit 2A',
  leaseThrough: 'March 2027',
  housedSinceMonths: 4,
  rent: 1600,
  rentDue: '2026-08-01',
  reminderOn: '2026-07-29',
  nextReview: '180-day review',
  nextReviewOn: '2026-09-12',
  landlord: 'Clinton Avenue Properties',
  advocate: 'Renee Carter',
}

export const RETENTION_MILESTONES = [
  { label: '30-day check', status: 'Complete' as const, on: '2026-05-18' },
  { label: '90-day check', status: 'Complete' as const, on: '2026-07-17' },
  { label: '180-day review', status: 'Scheduled' as const, on: '2026-09-12' },
  { label: '365-day retention review', status: 'Upcoming' as const, on: '2027-04-18' },
]

export const LEARN_MODULES = [
  {
    id: 'lease',
    title: 'Lease education',
    blurb: 'What your lease actually requires, in plain language.',
    minutes: 8,
    lessons: [
      'What you are responsible for versus the landlord',
      'Notice periods for repairs and entry',
      'What happens at renewal',
      'How a lease violation is cured',
    ],
  },
  {
    id: 'rights',
    title: 'Tenant rights',
    blurb: 'What a landlord can and cannot do in New Jersey.',
    minutes: 11,
    lessons: [
      'Anti-Eviction Act: the grounds a landlord must prove',
      'Entry, notice, and privacy',
      'Habitability and rent withholding',
      'Retaliation protections',
      'Where to get free representation',
    ],
  },
  {
    id: 'money',
    title: 'Financial literacy',
    blurb: 'Budgeting for rent, credit repair, and savings.',
    minutes: 14,
    lessons: [
      'Building a monthly rent-first budget',
      'Reading and disputing a credit report',
      'Second-chance banking',
      'Emergency savings on an irregular income',
    ],
  },
  {
    id: 'maintenance',
    title: 'Maintenance guidance',
    blurb: 'How to report an issue and what to do first.',
    minutes: 6,
    lessons: [
      'What counts as an emergency repair',
      'Documenting an issue properly',
      'Escalating when nothing happens',
      'What never to fix yourself',
    ],
  },
]

export const SUPPORT_SERVICES = [
  {
    label: 'Employment services',
    detail: 'Ironbound Workforce Center — advancement coaching and higher-wage placement.',
  },
  { label: 'Healthcare', detail: 'Newark Community Health Center — walk-in primary care and pharmacy.' },
  { label: 'Mental health', detail: 'Essex County Behavioral Health Access — screening without insurance.' },
  { label: 'Recovery services', detail: 'Newark Recovery Community Center — peer meetings daily.' },
  { label: 'Life coaching', detail: 'Newark Reentry Coalition — monthly goal-setting sessions.' },
  { label: 'Legal aid', detail: 'Essex County Legal Aid — eviction defense and expungement.' },
]

export const COMMUNITY_EVENTS = [
  {
    id: 'ev-1',
    title: 'Neighborhood resource fair',
    when: '2026-08-08',
    where: 'Lincoln Park, Newark',
    detail: 'Twenty organizations, free lunch, and on-site benefits screening.',
  },
  {
    id: 'ev-2',
    title: 'Tenant rights workshop',
    when: '2026-08-15',
    where: 'Essex County Legal Aid, 5 Commerce St',
    detail: 'Two hours with an attorney on what a landlord can and cannot do.',
  },
  {
    id: 'ev-3',
    title: 'Peer support dinner',
    when: '2026-08-21',
    where: 'Newark Reentry Coalition, 62 Halsey St',
    detail: 'Open table for people in their first year of housing.',
  },
  {
    id: 'ev-4',
    title: 'Credit repair clinic',
    when: '2026-09-05',
    where: 'Newark Public Library, Main Branch',
    detail: 'Bring a recent credit report and leave with a dispute filed.',
  },
]
