import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { Wordmark } from '@/components/brand/Wordmark'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Field'
import { INTAKE_CLOSING, INTAKE_QUESTIONS, type IntakeOption } from '@/data/intakeScript'
import { NJ_COUNTIES } from '@/data/counties'
import { buildPlan } from '@/lib/recommend'
import { useApp } from '@/state/AppStateContext'
import { cn } from '@/lib/cn'
import type { ServiceCategory } from '@/data/types'

interface Turn {
  id: string
  from: 'assistant' | 'person'
  body: string
}

const TYPING_MS = 850

export function Intake() {
  const { dispatch } = useApp()
  const navigate = useNavigate()

  const [step, setStep] = useState(0)
  const [turns, setTurns] = useState<Turn[]>([
    {
      id: 't0',
      from: 'assistant',
      body: "I'm going to ask you a few questions so I can build a plan that actually fits your situation. There are five, and none of them are a form.",
    },
  ])
  const [typing, setTyping] = useState(false)
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [urgentFlags, setUrgentFlags] = useState<string[]>([])
  const [county, setCounty] = useState('Essex')
  const [multiSelection, setMultiSelection] = useState<string[]>([])
  const [done, setDone] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const question = INTAKE_QUESTIONS[step]

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [turns, typing, done])

  const say = useCallback((from: Turn['from'], body: string) => {
    setTurns((current) => [...current, { id: `t${current.length}-${from}`, from, body }])
  }, [])

  const advance = useCallback(
    (personSaid: string, assistantReplies: string, added: ServiceCategory[], urgent?: string) => {
      say('person', personSaid)
      setCategories((current) => Array.from(new Set([...current, ...added])))
      if (urgent) setUrgentFlags((current) => [...current, urgent])

      setTyping(true)
      window.setTimeout(() => {
        setTyping(false)
        say('assistant', assistantReplies)
        setStep((current) => current + 1)
      }, TYPING_MS)
    },
    [say],
  )

  function chooseOption(option: IntakeOption) {
    advance(
      option.label,
      option.reply,
      option.implies,
      option.urgent ? `${question.stage.split('—')[1]?.trim() ?? question.id}: ${option.label}` : undefined,
    )
  }

  function submitMulti() {
    if (multiSelection.length === 0) return
    const chosen = (question.options ?? []).filter((o) => multiSelection.includes(o.id))
    const labels = chosen.map((o) => o.label).join(', ')
    const implied = chosen.flatMap((o) => o.implies)
    advance(
      labels,
      `Noted — ${chosen.map((o) => o.reply.toLowerCase()).join(', ')}. I'll sequence these so you're not doing everything in the same week.`,
      implied,
    )
    setMultiSelection([])
  }

  function submitCounty() {
    setTyping(true)
    say('person', `${county} County`)
    window.setTimeout(() => {
      setTyping(false)
      say(
        'assistant',
        `${county} County it is. Everything I recommend from here is verified for ${county} and ranked by how close it is to you.`,
      )
      window.setTimeout(() => {
        setTyping(true)
        window.setTimeout(() => {
          setTyping(false)
          say('assistant', INTAKE_CLOSING)
          setDone(true)
        }, TYPING_MS)
      }, 400)
    }, TYPING_MS)
  }

  function openPlan() {
    const finalCategories =
      categories.length > 0 ? categories : (['Housing', 'Government assistance'] as ServiceCategory[])
    const steps = buildPlan(finalCategories, county)

    dispatch({
      type: 'completeIntake',
      profile: { county, categories: finalCategories, urgentFlags },
      steps,
    })
    dispatch({
      type: 'signIn',
      session: {
        role: 'individual',
        name: 'Marcus Reyes',
        org: `${county} County`,
        signedInAt: new Date().toISOString(),
      },
    })
    navigate('/app')
  }

  const progress = Math.round((Math.min(step, INTAKE_QUESTIONS.length) / INTAKE_QUESTIONS.length) * 100)

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-ink">
      <header className="border-b border-line px-6 py-5 lg:px-14">
        <div className="mx-auto flex max-w-[820px] items-center justify-between">
          <Wordmark />
          <Link to="/" className="text-[13.5px] text-muted transition-colors hover:text-brass">
            Leave
          </Link>
        </div>
      </header>

      <div className="h-[2px] w-full bg-elevated">
        <div
          className="h-full bg-brass transition-[width] duration-500"
          style={{ width: `${done ? 100 : progress}%` }}
        />
      </div>

      <div className="mx-auto flex w-full max-w-[820px] min-h-0 flex-1 flex-col px-6 lg:px-0">
        <div ref={scrollRef} className="flex flex-1 flex-col justify-end overflow-y-auto py-10">
          <div className="flex flex-col gap-4">
            {turns.map((turn) => (
              <div
                key={turn.id}
                className={cn(
                  'animate-fade-up max-w-[85%] rounded-[8px] px-5 py-4 text-[15px] leading-[1.65]',
                  turn.from === 'assistant'
                    ? 'border border-line-2 bg-surface text-text-2'
                    : 'self-end bg-elevated text-text',
                )}
              >
                {turn.body}
              </div>
            ))}

            {typing && (
              <div className="flex w-fit gap-1.5 rounded-[8px] border border-line-2 bg-surface px-5 py-5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-brass"
                    style={{ animation: `bp-blink 1.2s ${i * 0.18}s infinite` }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="shrink-0 border-t border-line bg-ink pt-6 pb-8">
          {done ? (
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2.5 text-[13.5px] text-ok">
                <Check size={15} />
                Plan generated from the verified {county} County database
              </div>
              <Button variant="brass" size="lg" className="self-start" onClick={openPlan}>
                Open my plan
                <ArrowRight size={15} />
              </Button>
            </div>
          ) : (
            question && !typing && (
              <div className="animate-fade-up flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <div className="eyebrow-sm text-brass">{question.stage}</div>
                  <div className="font-serif text-[24px] leading-snug font-light">
                    {question.prompt}
                  </div>
                  {question.helper && (
                    <div className="text-[13.5px] text-faint">{question.helper}</div>
                  )}
                </div>

                {question.kind === 'choice' && (
                  <div className="grid gap-2 sm:grid-cols-2">
                    {question.options?.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => chooseOption(option)}
                        className="cursor-pointer rounded-[5px] border border-line-3 bg-surface px-5 py-4 text-left text-[14px] text-text-2 transition-colors hover:border-brass hover:text-text"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}

                {question.kind === 'multi' && (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                      {question.options?.map((option) => {
                        const active = multiSelection.includes(option.id)
                        return (
                          <button
                            key={option.id}
                            onClick={() =>
                              setMultiSelection((current) =>
                                active
                                  ? current.filter((id) => id !== option.id)
                                  : [...current, option.id],
                              )
                            }
                            className={cn(
                              'cursor-pointer rounded-full border px-4 py-2 text-[13.5px] transition-colors',
                              active
                                ? 'border-brass bg-brass-deep/40 text-brass'
                                : 'border-line-3 text-muted hover:border-brass hover:text-text',
                            )}
                          >
                            {option.label}
                          </button>
                        )
                      })}
                    </div>
                    <Button
                      variant="primary"
                      className="self-start"
                      disabled={multiSelection.length === 0}
                      onClick={submitMulti}
                    >
                      Continue
                      <ArrowRight size={14} />
                    </Button>
                  </div>
                )}

                {question.kind === 'county' && (
                  <div className="flex flex-wrap items-end gap-3">
                    <Select
                      value={county}
                      onChange={(e) => setCounty(e.target.value)}
                      className="w-56"
                    >
                      {NJ_COUNTIES.map((name) => (
                        <option key={name} value={name}>
                          {name} County
                        </option>
                      ))}
                    </Select>
                    <Button variant="primary" onClick={submitCounty}>
                      Build my plan
                      <ArrowRight size={14} />
                    </Button>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
