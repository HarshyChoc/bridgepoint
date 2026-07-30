import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

/** The brass rule + serif wordmark used as the mark across every surface. */
export function Wordmark({
  label = 'BridgePoint Justice',
  to = '/',
  size = 'md',
  className,
}: {
  label?: string
  to?: string
  size?: 'sm' | 'md'
  className?: string
}) {
  const bar = size === 'sm' ? 'h-[20px] w-[7px]' : 'h-[26px] w-[9px]'
  const text = size === 'sm' ? 'text-[16px]' : 'text-[20px]'

  return (
    <Link to={to} className={cn('flex items-center gap-3', className)}>
      <span className={cn('block shrink-0 bg-brass', bar)} />
      <span className={cn('font-serif whitespace-nowrap text-text', text)}>{label}</span>
    </Link>
  )
}
