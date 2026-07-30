import { Display, Eyebrow } from '@/components/ui/Bits'
import { LinkButton } from '@/components/ui/Button'
import { CheckList, ClosingCTA, Section, SectionHead } from '@/components/marketing/Section'
import { CaseloadPreview } from '@/components/marketing/PortalPreview'

const WORKSPACE = [
  'Client intake and assessment',
  'Eligibility determination',
  'Referral creation and status tracking',
  'Appointments and case notes',
  'Housing search and unit matching',
  'Document review and follow-up',
  'Partner organization directory',
  'Supervisor workload view',
]

const AI_WORK = [
  'Summarize a client case',
  'Draft documentation',
  'Generate referrals',
  'Recommend next best action',
  'Flag missing paperwork',
  'Detect service gaps',
  'Prioritize a caseload',
  'Generate outcome reports',
]

export function Organizations() {
  return (
    <>
      <Section bordered={false} className="pt-20">
        <div className="flex max-w-3xl flex-col gap-7">
          <Eyebrow brass>For nonprofits and advocates</Eyebrow>
          <Display as="h1" className="text-[40px] sm:text-[52px]">
            Your caseload, your referrals, and your reporting — in one workspace.
          </Display>
          <p className="text-[16.5px] leading-[1.65] text-muted">
            We do not ask your organization to change its programs or its mission. We make them
            easier to find, easier to refer into, and easier to coordinate around.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-5">
            <Display className="text-[30px] leading-[1.2]">
              The client&rsquo;s work and yours, finally the same record
            </Display>
            <p className="text-[15.5px] leading-[1.65] text-muted">
              See what a client has completed, where they are stuck, and which intervention would
              help most — before the first meeting rather than thirty minutes into it.
            </p>
            <div className="pt-2">
              <LinkButton to="/signin" variant="primary">
                Open the advocate portal
              </LinkButton>
            </div>
          </div>
          <CaseloadPreview />
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHead title="In the workspace" className="mb-10" />
        <CheckList items={WORKSPACE} />
      </Section>

      <Section>
        <SectionHead
          eyebrow="Where AI carries the weight"
          title="Rather than replacing case managers, the assistant removes the work that never should have been theirs."
          className="mb-10"
        />
        <CheckList items={AI_WORK} />
      </Section>

      <ClosingCTA
        line="Pilot partnerships are open to nonprofit organizations across New Jersey."
        action="Become a pilot partner"
      />
    </>
  )
}
