import { useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { PageHead } from '@/components/portal/PageHead'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Progress } from '@/components/ui/Bits'
import { LEARN_MODULES } from '@/data/tenant'
import { useToast } from '@/components/ui/Toast'
import { cn } from '@/lib/cn'

export function Learn() {
  const notify = useToast()
  const [completed, setCompleted] = useState<string[]>([])
  const [openId, setOpenId] = useState<string | null>(LEARN_MODULES[0].id)

  const totalLessons = LEARN_MODULES.reduce((sum, m) => sum + m.lessons.length, 0)
  const percent = Math.round((completed.length / totalLessons) * 100)

  function toggle(key: string, label: string) {
    const wasDone = completed.includes(key)
    setCompleted((current) =>
      wasDone ? current.filter((id) => id !== key) : [...current, key],
    )
    if (!wasDone) notify(`Completed: ${label}`)
  }

  return (
    <>
      <PageHead
        eyebrow="Keeping stable"
        title="Learn"
        meta={`${completed.length} of ${totalLessons} lessons complete · about 39 minutes total`}
      />

      <Card className="mb-6 flex flex-col gap-3 p-5">
        <div className="flex items-baseline justify-between">
          <span className="eyebrow-sm">Overall progress</span>
          <span className="font-mono text-[11.5px] text-faint">{percent}%</span>
        </div>
        <Progress value={percent} tone={percent === 100 ? 'ok' : 'brass'} />
      </Card>

      <div className="flex flex-col gap-3">
        {LEARN_MODULES.map((module) => {
          const open = openId === module.id
          const moduleDone = module.lessons.filter((_, i) =>
            completed.includes(`${module.id}-${i}`),
          ).length

          return (
            <Card key={module.id} className="overflow-hidden">
              <button
                onClick={() => setOpenId(open ? null : module.id)}
                className="flex w-full cursor-pointer items-center gap-4 p-6 text-left"
              >
                <div className="flex flex-1 flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[16px]">{module.title}</span>
                    <Badge tone={moduleDone === module.lessons.length ? 'ok' : 'neutral'}>
                      {moduleDone}/{module.lessons.length}
                    </Badge>
                  </div>
                  <span className="text-[13px] text-faint">{module.blurb}</span>
                </div>
                <span className="font-mono text-[10.5px] text-ghost">{module.minutes} min</span>
                <ChevronDown
                  size={16}
                  className={cn('shrink-0 text-faint transition-transform', open && 'rotate-180')}
                />
              </button>

              {open && (
                <div className="animate-fade flex flex-col gap-2 border-t border-line px-6 py-5">
                  {module.lessons.map((lesson, i) => {
                    const key = `${module.id}-${i}`
                    const checked = completed.includes(key)
                    return (
                      <button
                        key={key}
                        onClick={() => toggle(key, lesson)}
                        className="flex cursor-pointer items-center gap-3 rounded-[4px] px-2 py-2.5 text-left transition-colors hover:bg-surface-2"
                      >
                        <span
                          className={cn(
                            'flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[3px] border transition-colors',
                            checked ? 'border-brass bg-brass text-ink' : 'border-line-3',
                          )}
                        >
                          {checked && <Check size={11} strokeWidth={3} />}
                        </span>
                        <span className={cn('text-[13.5px]', checked && 'text-ghost line-through')}>
                          {lesson}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </>
  )
}
