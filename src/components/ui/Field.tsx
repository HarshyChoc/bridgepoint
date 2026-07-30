import { cn } from '@/lib/cn'
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

const CONTROL =
  'w-full rounded-[4px] border border-line-3 bg-surface-2 px-3.5 py-2.5 text-[13.5px] text-text outline-none transition-colors focus:border-brass'

export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return <label className={cn('eyebrow-sm block', className)}>{children}</label>
}

export function Field({
  label,
  hint,
  error,
  children,
  className,
}: {
  label?: string
  hint?: string
  error?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && <Label>{label}</Label>}
      {children}
      {error ? (
        <span className="text-[12px] text-alert">{error}</span>
      ) : (
        hint && <span className="text-[12px] text-ghost">{hint}</span>
      )}
    </div>
  )
}

export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(CONTROL, className)} {...rest} />
}

export function Textarea({ className, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(CONTROL, 'resize-y leading-relaxed', className)} {...rest} />
}

export function Select({
  className,
  children,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <select className={cn(CONTROL, 'cursor-pointer appearance-none pr-9', className)} {...rest}>
      {children}
    </select>
  )
}
