import { Display, Eyebrow } from '@/components/ui/Bits'
import { LinkButton } from '@/components/ui/Button'
import { CheckList, ClosingCTA, Section, SectionHead } from '@/components/marketing/Section'
import { UnitPreview } from '@/components/marketing/PortalPreview'

const PORTAL_ACTIONS = [
  'Register available properties',
  'Manage vacancies',
  'Upload unit information',
  'Submit required documentation',
  'Track inspections',
  'Monitor referrals',
  'Message organizations securely',
  'Track incentive payments',
  'Request assistance when needed',
  'Monitor tenant progress',
]

export function Landlords() {
  return (
    <>
      <Section bordered={false} className="pt-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div className="flex flex-col gap-7">
            <Eyebrow brass>For housing providers</Eyebrow>
            <Display as="h1" className="text-[40px] sm:text-[52px]">
              Participate in supportive housing without the paperwork tax.
            </Display>
            <p className="max-w-[560px] text-[16.5px] leading-[1.65] text-muted">
              List a vacancy once, and the inspection, documentation, referral, and incentive payment
              all move through the same tracked thread — with an organization on the other side of
              it.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <LinkButton to="/signin" variant="primary" size="lg">
                Register a property
              </LinkButton>
              <LinkButton to="/signin" size="lg">
                See the portal
              </LinkButton>
            </div>
          </div>
          <UnitPreview />
        </div>
      </Section>

      <Section>
        <SectionHead title="What you can do in the landlord portal" className="mb-10" />
        <CheckList items={PORTAL_ACTIONS} />
      </Section>

      <Section className="bg-surface">
        <div className="grid gap-px overflow-hidden rounded-md border border-line-2 bg-line-2 sm:grid-cols-3">
          {[
            {
              n: '$1,400',
              l: 'Signing bonus per unit placed through a partner organization',
            },
            { n: '$2,500', l: 'Damage mitigation fund available per enrolled unit' },
            { n: '6 hrs', l: 'Median response time from coordinating organizations' },
          ].map((item) => (
            <div key={item.n} className="flex flex-col gap-2 bg-ink px-7 py-9">
              <div className="font-serif text-[32px] leading-none font-light text-brass">
                {item.n}
              </div>
              <div className="text-[13px] text-faint">{item.l}</div>
            </div>
          ))}
        </div>
      </Section>

      <ClosingCTA
        line="Every unit listed is one more door that opens on time."
        action="Register a property"
        to="/signin"
      />
    </>
  )
}
