import type {
  Appointment,
  CaseNote,
  ClientDocument,
  Message,
  PlanStep,
  Referral,
  ServiceCategory,
} from '@/data/types'

export type Role = 'individual' | 'advocate' | 'landlord' | 'tenant' | 'government'

export interface Session {
  role: Role
  name: string
  org: string
  signedInAt: string
}

export interface IntakeProfile {
  completed: boolean
  county: string
  categories: ServiceCategory[]
  urgentFlags: string[]
}

export interface AppState {
  session: Session | null
  intake: IntakeProfile
  planSteps: PlanStep[]
  completedSubSteps: string[]
  savedResourceIds: string[]
  referrals: Referral[]
  documents: ClientDocument[]
  appointments: Appointment[]
  messages: Message[]
  caseNotes: CaseNote[]
  /** Ids of AI recommendation cards the user has dismissed. */
  dismissedInsights: string[]
  /** Landlord-side referral decisions, keyed by referral id. */
  landlordDecisions: Record<string, 'accepted' | 'declined'>
  /** Ids of units the landlord has marked as listed this session. */
  addedUnitIds: string[]
}

export type Action =
  | { type: 'signIn'; session: Session }
  | { type: 'signOut' }
  | { type: 'completeIntake'; profile: Omit<IntakeProfile, 'completed'>; steps: PlanStep[] }
  | { type: 'toggleSubStep'; subStepId: string }
  | { type: 'toggleSavedResource'; resourceId: string }
  | { type: 'addReferral'; referral: Referral }
  | { type: 'setReferralStatus'; referralId: string; status: Referral['status'] }
  | { type: 'setDocumentStatus'; documentId: string; status: ClientDocument['status']; reviewer: string }
  | { type: 'uploadDocument'; document: ClientDocument }
  | { type: 'confirmAppointment'; appointmentId: string }
  | { type: 'addAppointment'; appointment: Appointment }
  | { type: 'sendMessage'; message: Message }
  | { type: 'addCaseNote'; note: CaseNote }
  | { type: 'dismissInsight'; insightId: string }
  | { type: 'decideLandlordReferral'; referralId: string; decision: 'accepted' | 'declined' }
  | { type: 'addUnit'; unitId: string }
  | { type: 'reset' }
