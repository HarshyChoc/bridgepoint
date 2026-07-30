import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import type { ReactNode } from 'react'

interface ToastItem {
  id: number
  message: string
}

const ToastContext = createContext<((message: string) => void) | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])
  const nextId = useRef(1)

  const notify = useCallback((message: string) => {
    const id = nextId.current++
    setItems((current) => [...current, { id, message }])
    window.setTimeout(() => {
      setItems((current) => current.filter((item) => item.id !== id))
    }, 3200)
  }, [])

  const value = useMemo(() => notify, [notify])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-6 left-1/2 z-[60] flex -translate-x-1/2 flex-col items-center gap-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="animate-fade-up flex items-center gap-2.5 rounded-[4px] border border-line-3 bg-elevated px-4 py-2.5 text-[13px] text-text shadow-xl"
          >
            <Check size={14} className="text-brass" />
            {item.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

/** Returns a notifier. Safe to call outside the provider — it simply no-ops. */
export function useToast(): (message: string) => void {
  return useContext(ToastContext) ?? (() => undefined)
}
