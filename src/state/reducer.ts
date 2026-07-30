import { INITIAL_STATE } from './initialState'
import type { Action, AppState } from './types'

/**
 * Every branch returns a new object — nothing in state is mutated in place.
 * Keeping this pure is what lets the same record drive the individual portal
 * and the advocate case file without either one surprising the other.
 */
export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'signIn':
      return { ...state, session: action.session }

    case 'signOut':
      return { ...state, session: null }

    case 'completeIntake':
      return {
        ...state,
        intake: { ...action.profile, completed: true },
        planSteps: action.steps,
        completedSubSteps: [],
      }

    case 'toggleSubStep': {
      const done = state.completedSubSteps.includes(action.subStepId)
      return {
        ...state,
        completedSubSteps: done
          ? state.completedSubSteps.filter((id) => id !== action.subStepId)
          : [...state.completedSubSteps, action.subStepId],
      }
    }

    case 'toggleSavedResource': {
      const saved = state.savedResourceIds.includes(action.resourceId)
      return {
        ...state,
        savedResourceIds: saved
          ? state.savedResourceIds.filter((id) => id !== action.resourceId)
          : [...state.savedResourceIds, action.resourceId],
      }
    }

    case 'addReferral':
      return { ...state, referrals: [action.referral, ...state.referrals] }

    case 'setReferralStatus':
      return {
        ...state,
        referrals: state.referrals.map((referral) =>
          referral.id === action.referralId
            ? { ...referral, status: action.status, updatedOn: today() }
            : referral,
        ),
      }

    case 'setDocumentStatus':
      return {
        ...state,
        documents: state.documents.map((doc) =>
          doc.id === action.documentId
            ? { ...doc, status: action.status, reviewer: action.reviewer }
            : doc,
        ),
      }

    case 'uploadDocument':
      return { ...state, documents: [action.document, ...state.documents] }

    case 'confirmAppointment':
      return {
        ...state,
        appointments: state.appointments.map((appt) =>
          appt.id === action.appointmentId ? { ...appt, confirmed: true } : appt,
        ),
      }

    case 'addAppointment':
      return { ...state, appointments: [...state.appointments, action.appointment] }

    case 'sendMessage':
      return { ...state, messages: [...state.messages, action.message] }

    case 'addCaseNote':
      return { ...state, caseNotes: [action.note, ...state.caseNotes] }

    case 'dismissInsight':
      return state.dismissedInsights.includes(action.insightId)
        ? state
        : { ...state, dismissedInsights: [...state.dismissedInsights, action.insightId] }

    case 'decideLandlordReferral':
      return {
        ...state,
        landlordDecisions: { ...state.landlordDecisions, [action.referralId]: action.decision },
      }

    case 'addUnit':
      return state.addedUnitIds.includes(action.unitId)
        ? state
        : { ...state, addedUnitIds: [...state.addedUnitIds, action.unitId] }

    case 'reset':
      return { ...INITIAL_STATE, session: state.session }

    default:
      return state
  }
}

function today(): string {
  return new Date().toISOString().slice(0, 10)
}
