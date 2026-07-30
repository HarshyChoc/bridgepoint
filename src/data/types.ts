/** Shared domain types for the BridgePoint Justice demo. */

export type ServiceCategory =
  | 'Housing'
  | 'Employment'
  | 'Education'
  | 'Healthcare'
  | 'Mental health'
  | 'Recovery'
  | 'Legal aid'
  | 'Government assistance'
  | 'Family reunification'
  | 'Transportation'
  | 'Food'

export interface Resource {
  id: string
  name: string
  org: string
  category: ServiceCategory
  county: string
  city: string
  address: string
  phone: string
  distanceMi: number
  hours: string
  verifiedOn: string
  description: string
  eligibility: string[]
  services: string[]
  acceptsReentry: boolean
  walkIn: boolean
}

export interface SubStep {
  id: string
  label: string
}

export type PlanBucket = 'today' | 'week' | 'next'

export interface PlanStep {
  id: string
  bucket: PlanBucket
  title: string
  detail: string
  category: ServiceCategory
  subSteps: SubStep[]
  resourceIds: string[]
  meta?: string
}

export type ReferralStatus = 'Draft' | 'Sent' | 'Pending' | 'Accepted' | 'Declined' | 'Completed'

export interface Referral {
  id: string
  clientId: string
  clientName: string
  org: string
  service: string
  status: ReferralStatus
  createdOn: string
  updatedOn: string
  note: string
}

export type DocumentStatus = 'Verified' | 'Review' | 'Missing' | 'Uploaded'

export interface ClientDocument {
  id: string
  clientId: string
  name: string
  status: DocumentStatus
  uploadedOn: string | null
  reviewer: string | null
  note: string
}

export interface Appointment {
  id: string
  clientId: string
  title: string
  withWhom: string
  location: string
  startsAt: string
  kind: 'advocate' | 'viewing' | 'inspection' | 'intake' | 'clinic' | 'court'
  confirmed: boolean
}

export interface Message {
  id: string
  threadId: string
  author: string
  authorRole: 'client' | 'advocate' | 'landlord' | 'system'
  body: string
  sentAt: string
}

export interface CaseNote {
  id: string
  clientId: string
  author: string
  body: string
  createdOn: string
}

export interface TimelineEvent {
  id: string
  clientId: string
  label: string
  date: string
  kind: 'milestone' | 'referral' | 'document' | 'contact' | 'housing'
}

export type CasePhase =
  | 'Intake'
  | 'Assessment'
  | 'Housing search'
  | 'Unit matching'
  | 'Lease signing'
  | 'Move-in'
  | '30-day retention'
  | '90-day retention'
  | '180-day retention'
  | '365-day retention'

export type Urgency = 'New' | 'On track' | 'Follow up' | 'Urgent'

export interface SupportNetworkEntry {
  org: string
  role: string
  access: 'Full access' | 'Consent granted' | 'Limited access' | 'Requested'
}

export interface Client {
  id: string
  name: string
  county: string
  phase: CasePhase
  urgency: Urgency
  advocate: string
  intakeOn: string
  lastContactOn: string
  housing: string
  employment: string
  benefits: string
  serviceGaps: string[]
  planTotal: number
  planComplete: number
  aiSummary: string
  aiNextAction: string
  supportNetwork: SupportNetworkEntry[]
}

export type UnitStatus = 'Available' | 'Occupied' | 'Docs due' | 'Inspection'

export interface Unit {
  id: string
  label: string
  address: string
  beds: string
  rent: number
  status: UnitStatus
  availableOn: string
  referrals: number
  inspectionOn: string | null
  missingDocs: string[]
  retentionNote: string | null
  tone: string
}

export interface IncentivePayment {
  id: string
  label: string
  unit: string
  amount: number
  status: 'Paid' | 'Processing' | 'Eligible'
}

export interface PartnerOrg {
  id: string
  name: string
  focus: ServiceCategory
  county: string
  contact: string
  phone: string
  activeReferrals: number
  acceptanceRate: number
  avgResponseHrs: number
}

export interface CountyPerformance {
  county: string
  placements: number
  retention: number
  avgDays: number
  organizations: number
}

export interface ServiceGap {
  id: string
  label: string
  county: string
  severity: 'Critical' | 'Watch'
  detail: string
}

export interface GrantProgram {
  id: string
  name: string
  agency: string
  status: 'Reporting current' | 'Due Aug 15' | 'Action needed'
  awarded: number
  drawn: number
  nextReport: string
}
