import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'outline' | 'ghost' | 'brass' | 'danger'
type Size = 'sm' | 'md' | 'lg'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-text text-ink hover:bg-white font-medium',
  brass: 'bg-brass text-ink hover:bg-[#d8bb90] font-medium',
  outline: 'border border-line-3 text-text hover:border-brass hover:text-brass',
  ghost: 'text-muted hover:text-text hover:bg-raised',
  danger: 'border border-[#5b3833] text-alert hover:bg-[#201614]',
}

const SIZES: Record<Size, string> = {
  sm: 'text-[12.5px] px-3 py-1.5',
  md: 'text-[13.5px] px-5 py-2.5',
  lg: 'text-[14px] px-6 py-3.5',
}

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-[4px] transition-colors duration-150 whitespace-nowrap disabled:opacity-40 disabled:pointer-events-none cursor-pointer'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: ReactNode
}

export function Button({
  variant = 'outline',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={cn(BASE, VARIANTS[variant], SIZES[size], className)} {...rest}>
      {children}
    </button>
  )
}

interface LinkButtonProps {
  to: string
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

export function LinkButton({
  to,
  variant = 'outline',
  size = 'md',
  className,
  children,
}: LinkButtonProps) {
  return (
    <Link to={to} className={cn(BASE, VARIANTS[variant], SIZES[size], className)}>
      {children}
    </Link>
  )
}
