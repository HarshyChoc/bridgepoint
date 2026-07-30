import { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  eyebrow?: string
  children: ReactNode
  footer?: ReactNode
  className?: string
}

export function Modal({ open, onClose, title, eyebrow, children, footer, className }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-[2px]"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'animate-fade-up relative z-10 flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-lg border border-line-3 bg-surface shadow-2xl',
          className,
        )}
      >
        <div className="flex items-start justify-between gap-6 border-b border-line px-6 py-5">
          <div className="flex flex-col gap-1.5">
            {eyebrow && <div className="eyebrow-sm">{eyebrow}</div>}
            <div className="font-serif text-[21px] font-light">{title}</div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="cursor-pointer rounded p-1 text-faint transition-colors hover:bg-raised hover:text-text"
          >
            <X size={16} />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-line px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
