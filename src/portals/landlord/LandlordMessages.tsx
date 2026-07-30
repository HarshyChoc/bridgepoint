import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Send } from 'lucide-react'
import { PageHead } from '@/components/portal/PageHead'
import { Card } from '@/components/ui/Card'
import { relativeFromNow } from '@/lib/format'
import { useApp } from '@/state/AppStateContext'
import { cn } from '@/lib/cn'

const THREAD_ID = 'landlord-clinton'

export function LandlordMessages() {
  const { state, dispatch } = useApp()
  const [draft, setDraft] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  const thread = state.messages
    .filter((m) => m.threadId === THREAD_ID)
    .slice()
    .sort((a, b) => a.sentAt.localeCompare(b.sentAt))

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [thread.length])

  function send(event: FormEvent) {
    event.preventDefault()
    const body = draft.trim()
    if (!body) return

    dispatch({
      type: 'sendMessage',
      message: {
        id: `msg-${Date.now()}`,
        threadId: THREAD_ID,
        author: state.session?.org ?? 'Clinton Avenue Properties',
        authorRole: 'landlord',
        body,
        sentAt: new Date().toISOString(),
      },
    })
    setDraft('')
  }

  return (
    <>
      <PageHead
        eyebrow="Secure messaging"
        title="Newark Reentry Coalition"
        meta="Renee Carter · coordinating Unit 4B"
      />

      <Card className="flex h-[calc(100vh-19rem)] min-h-[420px] flex-col overflow-hidden">
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-6">
          {thread.map((message) => {
            const mine = message.authorRole === 'landlord'
            const system = message.authorRole === 'system'

            if (system) {
              return (
                <div
                  key={message.id}
                  className="self-center rounded-full border border-line-2 px-4 py-1.5 font-mono text-[11px] text-faint"
                >
                  {message.body}
                </div>
              )
            }

            return (
              <div
                key={message.id}
                className={cn('flex max-w-[76%] flex-col gap-1.5', mine && 'items-end self-end')}
              >
                <div
                  className={cn(
                    'rounded-[8px] px-4 py-3 text-[14px] leading-[1.65]',
                    mine ? 'bg-elevated text-text' : 'border border-line-2 bg-surface-2 text-text-2',
                  )}
                >
                  {message.body}
                </div>
                <span className="font-mono text-[10.5px] text-ghost">
                  {mine ? 'You' : message.author} · {relativeFromNow(message.sentAt)}
                </span>
              </div>
            )
          })}
          <div ref={endRef} />
        </div>

        <form onSubmit={send} className="flex items-center gap-3 border-t border-line px-5 py-4">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Write a message…"
            className="flex-1 bg-transparent py-2 text-[14px] text-text outline-none"
          />
          <button
            type="submit"
            disabled={!draft.trim()}
            aria-label="Send message"
            className="cursor-pointer rounded p-2 text-brass transition-colors hover:bg-raised disabled:opacity-30"
          >
            <Send size={16} />
          </button>
        </form>
      </Card>
    </>
  )
}
