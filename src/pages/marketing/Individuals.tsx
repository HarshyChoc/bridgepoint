import { Display, Eyebrow } from '@/components/ui/Bits'
import { LinkButton } from '@/components/ui/Button'
import { CheckList, ClosingCTA, FeatureGrid, Section, SectionHead } from '@/components/marketing/Section'
import { ChatPreview } from '@/components/marketing/PortalPreview'
import { SERVICE_CATEGORIES } from '@/data/resources'

const CAPABILITIES = [
  {
    title: 'A step-by-step plan',
    body: 'Today, this week, next steps — with the exact resource attached to each action.',
  },
  {
    title: 'Verified local resources',
    body: 'Confirmed, current listings in your county — not a list someone last updated years ago.',
  },
  {
    title: 'Eligibility, answered',
    body: 'Know what you qualify for before you make the trip across town.',
  },
  {
    title: 'Appointments and reminders',
    body: 'Scheduling, notifications, and directions so nothing is missed.',
  },
  {
    title: 'Secure document storage',
    body: 'Birth certificate, ID, release papers, and lease documents kept in one place.',
  },
  {
    title: 'A person to message',
    body: 'Secure messaging with your assigned advocate, who already sees your progress.',
  },
]

export function Individuals() {
  return (
    <>
      <Section bordered={false} className="pt-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div className="flex flex-col gap-7">
            <Eyebrow brass>For individuals</Eyebrow>
            <Display as="h1" className="text-[40px] sm:text-[52px]">
              You tell us your situation once. We handle the rest.
            </Display>
            <p className="max-w-[560px] text-[16.5px] leading-[1.65] text-muted">
              No forms to decode, no directory to search, no explaining your story to eleven
              different offices. A short conversation becomes a plan built for your county, your
              circumstances, and your goals.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <LinkButton to="/start" variant="primary" size="lg">
                Start the conversation
              </LinkButton>
              <LinkButton to="/signin" size="lg">
                See the portal
              </LinkButton>
            </div>
          </div>

          <ChatPreview
            turns={[
              {
                from: 'assistant',
                body: 'What would you like to work on first — a place to stay, work, or getting your documents back?',
              },
              { from: 'person', body: 'Documents, then work.' },
              {
                from: 'assistant',
                body: 'Got it. There are two MVC locations in Essex County that accept a corrections release document. I have added the appointment steps to your plan.',
              },
            ]}
            chips={['What do I need to bring?', 'How do I get there?']}
          />
        </div>
      </Section>

      <Section>
        <SectionHead title="What the platform does for you" className="mb-12" />
        <FeatureGrid items={CAPABILITIES} />
      </Section>

      <Section className="bg-surface">
        <SectionHead
          eyebrow="Categories covered today"
          title="Eleven service categories, verified across 21 counties."
          className="mb-10"
        />
        <CheckList items={SERVICE_CATEGORIES} />
      </Section>

      <ClosingCTA
        line="It is free, private, and works on the phone in your pocket."
        action="Start now"
        to="/start"
      />
    </>
  )
}
