import { useEffect, useRef, useState } from 'react'
import { MessageSquare, Send, Sparkles, X } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { ADVOCATE_ASSISTANT, CLIENT_ASSISTANT, matchAnswer } from '@/data/assistantScript'
import type { AssistantScript } from '@/data/assistantScript'
import { cn } from '@/lib/cn'

interface Turn {
  id: number
  from: 'assistant' | 'person'
  body: string
  followUps?: string[]
}

const THINKING_MS = 700

export function Helper({ variant }: { variant: 'client' | 'advocate' }) {
  const script: AssistantScript = variant === 'advocate' ? ADVOCATE_ASSISTANT : CLIENT_ASSISTANT

  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [thinking, setThinking] = useState(false)
  const [turns, setTurns] = useState<Turn[]>([
    { id: 0, from: 'assistant', body: script.greeting, followUps: script.suggestions },
  ])

  const nextId = useRef(1)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' })
  }, [turns, thinking, open])

  function ask(question: string) {
    const trimmed = question.trim()
    if (!trimmed || thinking) return

    setTurns((current) => [...current, { id: nextId.current++, from: 'person', body: trimmed }])
    setDraft('')
    setThinking(true)

    window.setTimeout(() => {
      const match = matchAnswer(script, trimmed)
      setThinking(false)
      setTurns((current) => [
        ...current,
        {
          id: nextId.current++,
          from: 'assistant',
          body: match?.answer ?? script.fallback,
          followUps: match?.followUps,
        },
      ])
    }, THINKING_MS)
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Open the BridgePoint Helper"
        className="fixed right-6 bottom-6 z-40 flex cursor-pointer items-center gap-2.5 rounded-full border border-brass-dim bg-elevated px-5 py-3.5 text-[13.5px] text-text shadow-2xl transition-colors hover:border-brass"
      >
        <MessageSquare size={16} className="text-brass" />
        BridgePoint Helper
      </button>
    )
  }

  return (
    <div className="fixed right-6 bottom-6 z-40 flex h-[560px] w-[400px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-lg border border-line-3 bg-surface shadow-2xl">
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <div className="flex items-center gap-2.5">
          <Sparkles size={15} className="text-brass" />
          <span className="text-[14px]">BridgePoint Helper</span>
          <Badge tone="neutral">Grounded</Badge>
        </div>
        <button
          onClick={() => setOpen(false)}
          aria-label="Close the helper"
          className="cursor-pointer rounded p-1 text-faint transition-colors hover:bg-raised hover:text-text"
        >
          <X size={15} />
        </button>
      </div>

      <div ref={bodyRef} className="flex flex-1 flex-col gap-3 overflow-y-auto px-5 py-5">
        {turns.map((turn) => (
          <div key={turn.id} className="flex flex-col gap-2.5">
            <div
              className={cn(
                'max-w-[92%] rounded-[7px] px-4 py-3 text-[13.5px] leading-[1.65] whitespace-pre-line',
                turn.from === 'assistant'
                  ? 'border border-line-2 bg-surface-2 text-text-2'
                  : 'self-end bg-elevated text-text',
              )}
            >
              {turn.body}
            </div>
            {turn.followUps && turn.followUps.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {turn.followUps.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => ask(chip)}
                    className="cursor-pointer rounded-full border border-line-3 px-3 py-1.5 text-[12px] text-muted transition-colors hover:border-brass hover:text-brass"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {thinking && (
          <div className="flex w-fit gap-1.5 rounded-[7px] border border-line-2 bg-surface-2 px-4 py-4">
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

      <form
        onSubmit={(event) => {
          event.preventDefault()
          ask(draft)
        }}
        className="flex items-center gap-2 border-t border-line px-4 py-3"
      >
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ask anything…"
          className="flex-1 bg-transparent py-2 text-[13.5px] text-text outline-none"
        />
        <button
          type="submit"
          aria-label="Send"
          disabled={!draft.trim() || thinking}
          className="cursor-pointer rounded p-2 text-brass transition-colors hover:bg-raised disabled:opacity-30"
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  )
}
