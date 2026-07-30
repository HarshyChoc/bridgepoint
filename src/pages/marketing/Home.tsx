import { Link } from 'react-router-dom'
import { Display, Eyebrow, Stat } from '@/components/ui/Bits'
import { LinkButton } from '@/components/ui/Button'
import { ClosingCTA, NumberedList, Section, SplitSection } from '@/components/marketing/Section'
import { PlanPreview } from '@/components/marketing/PortalPreview'
import { STATEWIDE } from '@/data/analytics'

const PROBLEMS = [
  {
    title: 'Individuals are handed phone numbers, not a path',
    body: 'A dead end is discovered only after a difficult trip across town, during the hardest months of a person’s life.',
  },
  {
    title: 'Case managers absorb the coordination cost',
    body: 'Referrals tracked by hand, the same intake re-explained, paperwork chased across systems that do not speak to one another.',
  },
  {
    title: 'Agencies cannot see where people get stuck',
    body: 'Without real-time outcome data, investment is targeted on instinct rather than evidence.',
  },
]

const JOURNEY = [
  {
    when: 'Day 1',
    title: 'A conversation, not a directory',
    body: 'The assistant asks about housing, ID, work, and obligations — then builds a plan grounded in verified county data.',
  },
  {
    when: 'Week 2',
    title: 'An advocate already knows the story',
    body: 'Referrals, documents, and completed steps arrive before the first meeting — no re-explaining.',
  },
  {
    when: 'Month 2',
    title: 'Keys, with the paperwork already done',
    body: 'Unit matching, inspection, and lease signing coordinated between landlord and organization in one thread.',
  },
  {
    when: 'Year 1',
    title: 'Still housed, and counted',
    body: '30, 90, 180, and 365-day retention checks feed the outcome data agencies have never reliably had.',
  },
]

const VANTAGE_POINTS = [
  {
    role: 'Individual',
    body: 'A guided plan, verified resources, reminders, and a person to message.',
    to: '/individuals',
  },
  {
    role: 'Advocate',
    body: 'Caseload, referrals, documents, and next best action in one workspace.',
    to: '/organizations',
  },
  {
    role: 'Landlord',
    body: 'Vacancies, inspections, incentive payments, and secure messaging.',
    to: '/landlords',
  },
  {
    role: 'Tenant success',
    body: 'Retention support from move-in through the 365-day review.',
    to: '/platform',
  },
  {
    role: 'Government',
    body: 'Placements, retention, gaps, and grant compliance, statewide.',
    to: '/government',
  },
]

export function Home() {
  return (
    <>
      <section className="px-6 pt-24 pb-20 lg:px-14 lg:pt-28">
        <div className="mx-auto grid max-w-[1280px] items-center gap-14 lg:grid-cols-[1.12fr_1fr] lg:gap-[72px]">
          <div className="flex flex-col gap-7">
            <Eyebrow brass>Kesselman Fellowship for the Advancement of Democracy</Eyebrow>
            <Display as="h1" className="text-[46px] sm:text-[58px] lg:text-[72px]">
              Everything a person needs already exists. Nothing is connected.
            </Display>
            <p className="max-w-[560px] text-[17px] leading-[1.65] text-muted">
              BridgePoint Justice is the coordination layer for New Jersey&rsquo;s housing and human
              services — one secure system linking individuals, nonprofits, landlords, healthcare
              providers, and government agencies.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <LinkButton to="/contact" variant="primary" size="lg">
                Request a pilot briefing
              </LinkButton>
              <LinkButton to="/platform" size="lg">
                See the platform
              </LinkButton>
            </div>
          </div>
          <PlanPreview />
        </div>
      </section>

      <div className="border-t border-line">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 lg:grid-cols-4">
          <Stat
            value={STATEWIDE.counties}
            label="NJ counties covered by the verified resource database"
            className="border-r border-b border-line px-8 py-9 lg:border-b-0"
          />
          <Stat
            value="9"
            label="Service categories, from housing to family reunification"
            className="border-b border-line px-8 py-9 lg:border-r lg:border-b-0"
          />
          <Stat
            value="5"
            label="Role-based portals inside one coordinated system"
            className="border-r border-line px-8 py-9"
          />
          <Stat
            value="365"
            label="Days of housing-retention follow-up per placement"
            className="px-8 py-9"
          />
        </div>
      </div>

      <SplitSection
        eyebrow="The problem"
        title="The problem is not a lack of resources. It is a lack of coordination."
      >
        <NumberedList items={PROBLEMS} />
      </SplitSection>

      <Section className="bg-surface">
        <div className="flex max-w-3xl flex-col gap-5">
          <Display className="text-[30px] leading-[1.22] sm:text-[36px]">
            On the day Marcus came home, he was given a court date and eleven phone numbers.
          </Display>
          <p className="text-[16px] leading-[1.65] text-muted">
            Each of those services exists. None of them knew about the other ten calls. This is what
            the same year looks like inside one coordinated record.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-line-2 bg-line-2 sm:grid-cols-2 lg:grid-cols-4">
          {JOURNEY.map((entry) => (
            <div key={entry.when} className="flex flex-col gap-3 bg-ink p-7">
              <div className="eyebrow-sm text-brass">{entry.when}</div>
              <div className="text-[16px] font-medium">{entry.title}</div>
              <div className="text-[13.5px] leading-[1.65] text-faint">{entry.body}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex max-w-3xl flex-col gap-4">
          <Display className="text-[32px] leading-[1.18] sm:text-[38px]">
            One system, five vantage points
          </Display>
          <p className="text-[16px] leading-[1.65] text-muted">
            Every stakeholder works inside the same coordinated record, with role-based access to
            only what their responsibility requires.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-line-2 bg-line-2 sm:grid-cols-2 lg:grid-cols-5">
          {VANTAGE_POINTS.map((point, i) => (
            <Link
              key={point.role}
              to={point.to}
              className="group flex flex-col gap-3 bg-surface p-7 transition-colors hover:bg-raised"
            >
              <div className="font-mono text-[12px] text-brass">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="text-[16px] font-medium transition-colors group-hover:text-brass">
                {point.role}
              </div>
              <div className="text-[13.5px] leading-[1.6] text-faint">{point.body}</div>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <blockquote className="mx-auto max-w-4xl text-center">
          <Display className="text-[28px] leading-[1.3] italic sm:text-[34px]">
            &ldquo;Reentry support should not depend on how many phone numbers a person is willing
            to try before giving up.&rdquo;
          </Display>
        </blockquote>
      </Section>

      <ClosingCTA
        line="Partner with us."
        action="Request a briefing"
        secondary="Try the platform"
        secondaryTo="/signin"
      />
    </>
  )
}
