import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react'
import { INITIAL_STATE } from './initialState'
import { reducer } from './reducer'
import { readJson, writeJson } from '@/lib/storage'
import type { Action, AppState } from './types'

/** Bump when the seed data shape changes so saved demos do not show stale records. */
const STORAGE_KEY = 'state.v2'

interface AppStateValue {
  state: AppState
  dispatch: Dispatch<Action>
}

const AppStateContext = createContext<AppStateValue | null>(null)

function hydrate(): AppState {
  const persisted = readJson<Partial<AppState> | null>(STORAGE_KEY, null)
  if (!persisted) return INITIAL_STATE
  // Merge rather than replace so a schema addition never breaks a saved demo.
  return { ...INITIAL_STATE, ...persisted }
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, hydrate)

  useEffect(() => {
    writeJson(STORAGE_KEY, state)
  }, [state])

  const value = useMemo(() => ({ state, dispatch }), [state])

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useApp(): AppStateValue {
  const value = useContext(AppStateContext)
  if (!value) {
    throw new Error('useApp must be used inside <AppStateProvider>')
  }
  return value
}
