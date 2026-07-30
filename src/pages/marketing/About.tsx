import { Award } from 'lucide-react'
import { Display, Eyebrow } from '@/components/ui/Bits'
import { Card } from '@/components/ui/Card'
import { ClosingCTA, NumberedList, Section, SectionHead } from '@/components/marketing/Section'

const ENGAGEMENT = [
  {
    title: 'Nonprofit leaders',
    body: 'Reviewed resource categories and workflow design across the reentry service network.',
  },
  {
    title: 'Reentry professionals and case managers',
    body: 'Informed how the assistant frames questions and presents options.',
  },
  {
    title: 'Community organizations',
    body: 'Validated the accuracy and completeness of the resource database.',
  },
  {
    title: 'Government stakeholders',
    body: 'Provided context on how the platform complements existing public programs.',
  },
]

export function About() {
  return (
    <>
      <Section bordered={false} className="pt-20">
        <div className="flex max-w-3xl flex-col gap-7">
          <Eyebrow brass>About</Eyebrow>
          <Display as="h1" className="text-[40px] sm:text-[52px]">
            Built with the people closest to the problem, not in isolation from them.
          </Display>
          <p className="text-[16.5px] leading-[1.65] text-muted">
            BridgePoint Justice is developed by Kadima AI LLC through Engage NJ. Development has
            proceeded through continuous, structured engagement with nonprofit leaders, reentry
            professionals, community organizations, and government stakeholders across New Jersey.
          </p>
          <p className="text-[16.5px] leading-[1.65] text-muted">
            That engagement is ongoing rather than a one-time consultation. Each round of feedback
            has changed the product: how the assistant asks questions, which resource categories were
            prioritized, and how referral workflows are designed.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.4fr] lg:gap-16">
          <SectionHead title="Who shaped it" />
          <NumberedList items={ENGAGEMENT} />
        </div>
      </Section>

      <Section id="recognition" className="bg-surface">
        <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-5">
            <Eyebrow brass>Recognition</Eyebrow>
            <Display className="text-[30px] leading-[1.2]">
              Kesselman Fellowship for the Advancement of Democracy
            </Display>
            <p className="text-[15.5px] leading-[1.65] text-muted">
              Selected for its approach to strengthening public service delivery through technology,
              and for the civic model behind it.
            </p>
          </div>
          <Card tone="sunken" className="flex flex-col items-center gap-4 px-8 py-14 text-center">
            <Award size={38} className="text-brass" strokeWidth={1.2} />
            <div className="font-serif text-[20px] font-light">Kesselman Student Fellowship</div>
            <div className="eyebrow-sm">For the Advancement of Democracy</div>
          </Card>
        </div>
      </Section>

      <ClosingCTA
        line="New Jersey is where this model is being tested and refined."
        action="Talk with us"
      />
    </>
  )
}
