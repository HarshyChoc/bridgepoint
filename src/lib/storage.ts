/**
 * localStorage wrapper. Every access is guarded — a demo running in a
 * privacy-restricted browser must degrade to in-memory state, never throw.
 */

const PREFIX = 'bpj:'

export function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(PREFIX + key)
    if (raw === null) return fallback
    return JSON.parse(raw) as T
  } catch (error) {
    console.warn(`[bridgepoint] could not read "${key}" from storage`, error)
    return fallback
  }
}

export function writeJson(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch (error) {
    console.warn(`[bridgepoint] could not persist "${key}"`, error)
  }
}

export function clearAll(): void {
  try {
    const doomed = Object.keys(window.localStorage).filter((k) => k.startsWith(PREFIX))
    doomed.forEach((k) => window.localStorage.removeItem(k))
  } catch (error) {
    console.warn('[bridgepoint] could not clear storage', error)
  }
}
