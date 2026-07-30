import { Check, Circle, Minus } from 'lucide-react'
import { Display, Eyebrow } from '@/components/ui/Bits'
import { ClosingCTA, NumberedList, Section, SectionHead } from '@/components/marketing/Section'
import { cn } from '@/lib/cn'

const PHASES = [
  {
    label: 'Current',
    tone: 'brass' as const,
    items: [
      'AI conversational assistant',
      'Verified statewide resource database',
      'County recommendation engine',
      'Stakeholder engagement across NJ',
      'Kesselman Fellowship recognition',
    ],
  },
  {
    label: 'Next',
    tone: 'muted' as const,
    items: [
      'Advocate dashboard',
      'Referral management workflow',
      'Onboarding of pilot organizations',
      'Expanded database coverage',
      'Analytics and reporting',
    ],
  },
  {
    label: 'Future',
    tone: 'faint' as const,
    items: [
      'Statewide implementation',
      'HMIS and DCA integration',
      'Homelessness and affordable housing',
      'Behavioral health and workforce',
      'Multi-state expansion',
    ],
  },
]

const WHY_NOW = [
  {
    title: 'A widening coordination gap',
    body: 'The number of organizations one person must navigate keeps growing, with no matching investment in the infrastructure between them.',
  },
  {
    title: 'AI crossed a usability threshold',
    body: 'Conversational systems can now hold a nuanced intake conversation reliably and affordably — which was not practical a few years ago.',
  },
  {
    title: 'Rising expectations for public services',
    body: 'Residents expect plain language on a phone, and state and county agencies are actively looking for ways to meet that.',
  },
]

const ICONS = {
  brass: <Check size={13} className="text-brass" />,
  muted: <Circle size={11} className="text-muted" />,
  faint: <Minus size={12} className="text-ghost" />,
}

export function Roadmap() {
  return (
    <>
      <Section bordered={false} className="pt-20">
        <div className="flex max-w-3xl flex-col gap-7">
          <Eyebrow brass>Roadmap</Eyebrow>
          <Display as="h1" className="text-[40px] sm:text-[52px]">
            From New Jersey&rsquo;s reentry ecosystem to the full continuum of human services.
          </Display>
          <p className="text-[16.5px] leading-[1.65] text-muted">
            The roadmap below distinguishes clearly between what is built today, what is in active
            development, and what represents future direction contingent on continued development and
            partnership.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-line-2 bg-line-2 md:grid-cols-3">
          {PHASES.map((phase) => (
            <div key={phase.label} className="flex flex-col gap-6 bg-surface p-8">
              <div
                className={cn(
                  'eyebrow',
                  phase.tone === 'brass' && 'text-brass',
                  phase.tone === 'muted' && 'text-muted',
                )}
              >
                {phase.label}
              </div>
              <div className="flex flex-col gap-4">
                {phase.items.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-[14px]">
                    <span className="pt-[3px]">{ICONS[phase.tone]}</span>
                    <span className={phase.tone === 'faint' ? 'text-faint' : 'text-text-2'}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.4fr] lg:gap-16">
          <SectionHead eyebrow="Why now" title="Three trends converging at once." />
          <NumberedList items={WHY_NOW} />
        </div>
      </Section>

      <ClosingCTA
        line="Ready for the next stage of the conversation."
        action="Request a briefing"
      />
    </>
  )
}
