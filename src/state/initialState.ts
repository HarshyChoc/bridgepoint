import { APPOINTMENTS, CASE_NOTES_SEED, DOCUMENTS, MESSAGES, REFERRALS } from './seed'
import { PLAN_STEPS, PRECOMPLETED_SUBSTEPS, SAVED_RESOURCE_IDS } from '@/data/plan'
import type { AppState } from './types'

export const INITIAL_STATE: AppState = {
  session: null,
  intake: { completed: false, county: 'Essex', categories: [], urgentFlags: [] },
  planSteps: PLAN_STEPS,
  completedSubSteps: PRECOMPLETED_SUBSTEPS,
  savedResourceIds: SAVED_RESOURCE_IDS,
  referrals: REFERRALS,
  documents: DOCUMENTS,
  appointments: APPOINTMENTS,
  messages: MESSAGES,
  caseNotes: CASE_NOTES_SEED,
  dismissedInsights: [],
  landlordDecisions: {},
  addedUnitIds: [],
}
