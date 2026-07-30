import { ADDITIONAL_CLIENTS } from './moreClients'
import type { CaseNote, Client, TimelineEvent } from './types'

export const PRIMARY_CLIENT_ID = 'c-reyes'

/** The eight clients with a full case record behind them. */
const FOCUS_CLIENTS: Client[] = [
  {
    id: 'c-reyes',
    name: 'Marcus Reyes',
    county: 'Essex',
    phase: 'Housing search',
    urgency: 'Urgent',
    advocate: 'Renee Carter',
    intakeOn: '2026-06-12',
    lastContactOn: '2026-07-28',
    housing: 'Transitional — searching',
    employment: 'Part-time, 22 hrs/wk',
    benefits: 'FamilyCare active',
    serviceGaps: ['Transportation'],
    planTotal: 14,
    planComplete: 8,
    aiSummary:
      'Marcus has completed ID documentation and healthcare enrollment. Housing is the active barrier: two of three transitional applications are stalled pending proof of income.',
    aiNextAction:
      'Submit the Section 8 preliminary application before the Aug 8 county deadline and request an income letter from Ironbound Workforce.',
    supportNetwork: [
      { org: 'Newark Reentry Coalition', role: 'Lead advocate', access: 'Full access' },
      { org: 'Ironbound Workforce', role: 'Employment', access: 'Consent granted' },
      { org: 'Essex County Legal Aid', role: 'Legal', access: 'Limited access' },
    ],
  },
  {
    id: 'c-okafor',
    name: 'Daniel Okafor',
    county: 'Essex',
    phase: 'Lease signing',
    urgency: 'On track',
    advocate: 'Renee Carter',
    intakeOn: '2026-04-02',
    lastContactOn: '2026-07-29',
    housing: 'Unit 2A matched — lease pending',
    employment: 'Full-time, warehouse',
    benefits: 'SNAP active',
    serviceGaps: [],
    planTotal: 12,
    planComplete: 11,
    aiSummary:
      'Daniel has a matched unit at 218 Clinton Ave with a passed inspection. Only the signed lease and the landlord W-9 remain before move-in coordination.',
    aiNextAction:
      'Schedule the lease signing for the week of Aug 4 and confirm the security deposit release from Union County emergency rental assistance.',
    supportNetwork: [
      { org: 'Newark Reentry Coalition', role: 'Lead advocate', access: 'Full access' },
      { org: 'Clinton Avenue Properties', role: 'Housing provider', access: 'Consent granted' },
    ],
  },
  {
    id: 'c-alvarez',
    name: 'Jasmine Alvarez',
    county: 'Hudson',
    phase: 'Intake',
    urgency: 'New',
    advocate: 'Renee Carter',
    intakeOn: '2026-07-30',
    lastContactOn: '2026-07-30',
    housing: 'Staying with family — 3 weeks',
    employment: 'Seeking',
    benefits: 'Not yet enrolled',
    serviceGaps: ['Healthcare', 'Childcare'],
    planTotal: 9,
    planComplete: 1,
    aiSummary:
      'Jasmine completed conversational intake six hours ago. Housing stability is time-limited and two children are in the household, which raises the priority of the family reunification and childcare tracks.',
    aiNextAction:
      'Complete the Hudson County coordinated entry assessment today and open a NJ FamilyCare application for the household.',
    supportNetwork: [
      { org: 'Newark Reentry Coalition', role: 'Lead advocate', access: 'Full access' },
    ],
  },
  {
    id: 'c-brooks',
    name: 'Tanya Brooks',
    county: 'Essex',
    phase: '90-day retention',
    urgency: 'Follow up',
    advocate: 'Renee Carter',
    intakeOn: '2026-01-15',
    lastContactOn: '2026-07-21',
    housing: 'Housed — 218 Clinton Ave, Unit 2A',
    employment: 'Full-time, home health aide',
    benefits: 'FamilyCare active',
    serviceGaps: ['Mental health'],
    planTotal: 14,
    planComplete: 14,
    aiSummary:
      'Tanya passed her 30 and 90-day retention checks. Contact has lapsed nine days and a behavioral health referral placed in June has not been acted on.',
    aiNextAction:
      'Place a retention check-in call this week and re-issue the Bridgeway Behavioral Health referral with a warm handoff.',
    supportNetwork: [
      { org: 'Newark Reentry Coalition', role: 'Lead advocate', access: 'Full access' },
      { org: 'Bridgeway Behavioral Health', role: 'Behavioral health', access: 'Requested' },
    ],
  },
  {
    id: 'c-whitfield',
    name: 'Samuel Whitfield',
    county: 'Union',
    phase: 'Unit matching',
    urgency: 'On track',
    advocate: 'Andre Boone',
    intakeOn: '2026-05-20',
    lastContactOn: '2026-07-27',
    housing: 'Voucher approved — matching',
    employment: 'Full-time, logistics',
    benefits: 'SNAP active',
    serviceGaps: [],
    planTotal: 13,
    planComplete: 9,
    aiSummary:
      'Samuel holds an approved voucher and stable employment. Two Union County units are under review; neither has completed inspection scheduling.',
    aiNextAction: 'Push both Union County landlords for an inspection date before the voucher expires Sep 3.',
    supportNetwork: [
      { org: 'Union Reentry Partners', role: 'Lead advocate', access: 'Full access' },
      { org: 'Second Chance Staffing', role: 'Employment', access: 'Consent granted' },
    ],
  },
  {
    id: 'c-nguyen',
    name: 'Robert Nguyen',
    county: 'Essex',
    phase: 'Assessment',
    urgency: 'Follow up',
    advocate: 'Andre Boone',
    intakeOn: '2026-07-08',
    lastContactOn: '2026-07-24',
    housing: 'Emergency shelter',
    employment: 'Seeking',
    benefits: 'SNAP pending',
    serviceGaps: ['Recovery', 'Transportation'],
    planTotal: 11,
    planComplete: 3,
    aiSummary:
      'Robert is in emergency shelter with a pending SNAP application and an unmet recovery referral. Shelter stay limit is Aug 12.',
    aiNextAction:
      'Escalate the Integrity House recovery intake and open a rapid rehousing application before the shelter limit.',
    supportNetwork: [
      { org: 'Union Reentry Partners', role: 'Lead advocate', access: 'Full access' },
      { org: 'Integrity House', role: 'Recovery', access: 'Requested' },
    ],
  },
  {
    id: 'c-dawson',
    name: 'Priya Dawson',
    county: 'Passaic',
    phase: '30-day retention',
    urgency: 'On track',
    advocate: 'Renee Carter',
    intakeOn: '2026-03-11',
    lastContactOn: '2026-07-26',
    housing: 'Housed — Paterson',
    employment: 'Part-time, retail',
    benefits: 'FamilyCare active',
    serviceGaps: [],
    planTotal: 12,
    planComplete: 12,
    aiSummary:
      'Priya passed her 30-day check with no flags. Employment hours are below the level needed to sustain rent without assistance after month six.',
    aiNextAction:
      'Refer to Passaic County Workforce Development for a full-time placement before the rental subsidy steps down.',
    supportNetwork: [
      { org: 'Newark Reentry Coalition', role: 'Lead advocate', access: 'Full access' },
      { org: 'Passaic County One-Stop', role: 'Employment', access: 'Consent granted' },
    ],
  },
  {
    id: 'c-ellis',
    name: 'Andre Ellis',
    county: 'Essex',
    phase: 'Move-in',
    urgency: 'Urgent',
    advocate: 'Andre Boone',
    intakeOn: '2026-04-28',
    lastContactOn: '2026-07-30',
    housing: 'Lease signed — move-in Aug 2',
    employment: 'Full-time, construction',
    benefits: 'None',
    serviceGaps: ['Furniture assistance'],
    planTotal: 13,
    planComplete: 11,
    aiSummary:
      'Andre signed a lease with a move-in date of Aug 2 and has no furniture assistance secured. Utility activation is also outstanding.',
    aiNextAction:
      'Submit a furniture bank request today and confirm PSE&G activation for the Aug 2 move-in date.',
    supportNetwork: [
      { org: 'Union Reentry Partners', role: 'Lead advocate', access: 'Full access' },
      { org: 'Clinton Avenue Properties', role: 'Housing provider', access: 'Consent granted' },
    ],
  },
]

/** The advocate organization's full active caseload. */
export const CLIENTS: Client[] = [...FOCUS_CLIENTS, ...ADDITIONAL_CLIENTS]

export const CASE_NOTES: CaseNote[] = [
  {
    id: 'note-1',
    clientId: 'c-reyes',
    author: 'Renee Carter',
    createdOn: '2026-07-28',
    body: 'Called re: income letter. Marcus confirmed his supervisor can provide one this week.',
  },
  {
    id: 'note-2',
    clientId: 'c-reyes',
    author: 'Renee Carter',
    createdOn: '2026-07-21',
    body: 'Reviewed three transitional options together. Isaiah House preferred — closest to work.',
  },
  {
    id: 'note-3',
    clientId: 'c-reyes',
    author: 'Renee Carter',
    createdOn: '2026-07-02',
    body: 'State ID replaced at MVC Newark. Marcus brought all six points on the first trip.',
  },
  {
    id: 'note-4',
    clientId: 'c-okafor',
    author: 'Renee Carter',
    createdOn: '2026-07-29',
    body: 'Unit 2A inspection passed. Waiting on landlord W-9 before lease signing can be scheduled.',
  },
  {
    id: 'note-5',
    clientId: 'c-brooks',
    author: 'Renee Carter',
    createdOn: '2026-07-21',
    body: '90-day check completed by phone. Tanya declined the behavioral health referral for now.',
  },
]

export const TIMELINE: TimelineEvent[] = [
  { id: 't-1', clientId: 'c-reyes', label: 'Housing application submitted', date: '2026-07-28', kind: 'housing' },
  { id: 't-2', clientId: 'c-reyes', label: 'FamilyCare enrollment approved', date: '2026-07-14', kind: 'milestone' },
  { id: 't-3', clientId: 'c-reyes', label: 'State ID replaced', date: '2026-07-02', kind: 'document' },
  { id: 't-4', clientId: 'c-reyes', label: 'Employment referral accepted', date: '2026-06-24', kind: 'referral' },
  { id: 't-5', clientId: 'c-reyes', label: 'Intake completed', date: '2026-06-12', kind: 'milestone' },
  { id: 't-6', clientId: 'c-okafor', label: 'Unit 2A inspection passed', date: '2026-07-29', kind: 'housing' },
  { id: 't-7', clientId: 'c-okafor', label: 'Unit matched — 218 Clinton Ave', date: '2026-07-12', kind: 'housing' },
  { id: 't-8', clientId: 'c-okafor', label: 'Voucher approved', date: '2026-06-05', kind: 'milestone' },
  { id: 't-9', clientId: 'c-brooks', label: '90-day retention check passed', date: '2026-07-21', kind: 'milestone' },
  { id: 't-10', clientId: 'c-brooks', label: 'Move-in completed', date: '2026-04-18', kind: 'housing' },
]

export const ADVOCATES = ['Renee Carter', 'Andre Boone', 'Michelle Park'] as const

export function clientById(id: string): Client | undefined {
  return CLIENTS.find((c) => c.id === id)
}
