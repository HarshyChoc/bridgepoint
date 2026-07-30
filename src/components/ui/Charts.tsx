import { cn } from '@/lib/cn'

interface BarDatum {
  label: string
  value: number
}

/** Column chart drawn with divs — no chart library, no runtime cost. */
export function BarChart({
  data,
  height = 150,
  highlightLast = true,
  className,
}: {
  data: BarDatum[]
  height?: number
  highlightLast?: boolean
  className?: string
}) {
  const max = Math.max(...data.map((d) => d.value), 1)

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {/* items-stretch (the default) is required: the bars size themselves as a
          percentage of the column, which only has a height if the column fills the row. */}
      <div className="flex gap-1.5" style={{ height }}>
        {data.map((d, i) => {
          const isLast = highlightLast && i === data.length - 1
          return (
            <div key={d.label} className="group flex flex-1 flex-col items-center justify-end gap-2">
              <span className="font-mono text-[10px] text-faint opacity-0 transition-opacity group-hover:opacity-100">
                {d.value}
              </span>
              <div
                className={cn(
                  'w-full rounded-t-[2px] transition-colors',
                  isLast ? 'bg-brass' : 'bg-elevated group-hover:bg-brass-dim',
                )}
                style={{ height: `${Math.max((d.value / max) * 100, 3)}%` }}
              />
            </div>
          )
        })}
      </div>
      <div className="flex gap-1.5">
        {data.map((d) => (
          <div key={d.label} className="flex-1 text-center font-mono text-[10px] text-faint">
            {d.label}
          </div>
        ))}
      </div>
    </div>
  )
}

/** Horizontal comparison bars — used for placements by county. */
export function RankedBars({
  data,
  suffix = '',
  className,
}: {
  data: BarDatum[]
  suffix?: string
  className?: string
}) {
  const max = Math.max(...data.map((d) => d.value), 1)

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-4">
          <div className="w-24 shrink-0 text-[12.5px] text-muted">{d.label}</div>
          <div className="h-[7px] flex-1 overflow-hidden rounded-full bg-elevated">
            <div
              className="h-full rounded-full bg-brass-dim transition-[width] duration-700"
              style={{ width: `${(d.value / max) * 100}%` }}
            />
          </div>
          <div className="w-14 shrink-0 text-right font-mono text-[11.5px] text-text-2">
            {d.value}
            {suffix}
          </div>
        </div>
      ))}
    </div>
  )
}

/** Compact donut for a single percentage. */
export function Gauge({ value, label }: { value: number; label: string }) {
  const clamped = Math.max(0, Math.min(100, value))
  const radius = 34
  const circumference = 2 * Math.PI * radius

  return (
    <div className="flex items-center gap-4">
      <svg width="84" height="84" viewBox="0 0 84 84" className="-rotate-90">
        <circle cx="42" cy="42" r={radius} fill="none" stroke="#24262A" strokeWidth="6" />
        <circle
          cx="42"
          cy="42"
          r={radius}
          fill="none"
          stroke="#C8A97E"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - clamped / 100)}
        />
      </svg>
      <div className="flex flex-col gap-1">
        <div className="font-serif text-[28px] leading-none font-light">{clamped}%</div>
        <div className="text-[12.5px] text-faint">{label}</div>
      </div>
    </div>
  )
}
