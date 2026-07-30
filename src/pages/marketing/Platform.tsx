import { Badge } from '@/components/ui/Badge'
import { Display, Eyebrow } from '@/components/ui/Bits'
import {
  ClosingCTA,
  FeatureGrid,
  Section,
  SectionHead,
} from '@/components/marketing/Section'
import { ChatPreview, PreviewFrame } from '@/components/marketing/PortalPreview'

const TECHNOLOGY = [
  {
    title: 'AI conversational assistant',
    body: "Translates a person's situation into relevant service categories and follow-up questions.",
  },
  {
    title: 'Verified resource database',
    body: 'A structured, maintained repository of housing, employment, healthcare, legal, and family services.',
  },
  {
    title: 'County recommendation engine',
    body: 'Filters and ranks resources by county and user-specific eligibility factors.',
  },
  {
    title: 'Responsive web application',
    body: 'Usable on any device, no app download required.',
  },
  {
    title: 'Secure cloud architecture',
    body: 'Role-based access, consent-aware coordination, and audit trails on every record.',
  },
  {
    title: 'Modular integration layer',
    body: 'Designed for HMIS and Department of Community Affairs reporting to reduce duplicate entry.',
  },
]

const WORKFLOW_STAGES = [
  { label: 'Unit matched', status: 'Done' },
  { label: 'Inspection scheduled', status: 'Done' },
  { label: 'Lease signing', status: 'In progress' },
  { label: 'Move-in coordination', status: 'Pending' },
]

export function Platform() {
  return (
    <>
      <Section bordered={false} className="pt-20">
        <SectionHead
          eyebrow="The platform"
          title="Intake once. Coordinated everywhere, for as long as it takes."
          lead="A single record follows a person from the first conversation through housing placement and the year that follows — visible to each partner only where their responsibility begins."
        />
      </Section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-5">
            <Eyebrow brass>Stage 01</Eyebrow>
            <Display className="text-[30px] leading-[1.2]">Conversational intake</Display>
            <p className="text-[15.5px] leading-[1.65] text-muted">
              Housing status, employment, transportation, identification, legal obligations,
              healthcare, family, finances, and personal goals — gathered in plain language rather
              than a twelve-page form.
            </p>
          </div>
          <ChatPreview
            turns={[
              { from: 'assistant', body: 'Where are you staying right now?' },
              { from: 'person', body: 'With my sister in Newark, but only for a few weeks.' },
              {
                from: 'assistant',
                body: 'Understood. Do you have a state ID or birth certificate on hand?',
              },
            ]}
          />
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <PreviewFrame label="Today — 2 of 6 complete" className="order-2 lg:order-1">
            <div className="flex flex-col gap-2.5">
              {[
                { label: 'Gather documents for ID replacement', done: true },
                { label: 'Call Essex County housing intake line', done: true },
                { label: 'Confirm Thursday advocate appointment', done: false },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center gap-3.5 rounded-[4px] border border-line-2 bg-surface-2 p-4 text-[13.5px]"
                >
                  <span
                    className={
                      row.done
                        ? 'h-4 w-4 shrink-0 rounded-full bg-brass'
                        : 'h-4 w-4 shrink-0 rounded-full border-[1.5px] border-line-3'
                    }
                  />
                  <span className={row.done ? 'text-faint line-through' : ''}>{row.label}</span>
                </div>
              ))}
            </div>
          </PreviewFrame>
          <div className="order-1 flex flex-col gap-5 lg:order-2">
            <Eyebrow brass>Stage 02</Eyebrow>
            <Display className="text-[30px] leading-[1.2]">A personalized action plan</Display>
            <p className="text-[15.5px] leading-[1.65] text-muted">
              The platform generates a step-by-step roadmap with verified local resources attached to
              each action, eligibility already checked, and reminders scheduled.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-5">
            <Eyebrow brass>Stage 03</Eyebrow>
            <Display className="text-[30px] leading-[1.2]">
              Structured referral and housing workflow
            </Display>
            <p className="text-[15.5px] leading-[1.65] text-muted">
              Housing search, unit matching, landlord communication, inspection scheduling, lease
              signing, and move-in coordination move through defined stages every partner can see.
            </p>
          </div>
          <PreviewFrame label="Housing workflow — M. Reyes">
            <div className="flex flex-col">
              {WORKFLOW_STAGES.map((stage) => (
                <div
                  key={stage.label}
                  className="flex items-center justify-between gap-4 border-b border-line py-3.5 text-[13.5px] last:border-0"
                >
                  <span className="text-text-2">{stage.label}</span>
                  <Badge
                    tone={
                      stage.status === 'Done'
                        ? 'ok'
                        : stage.status === 'In progress'
                          ? 'warn'
                          : 'neutral'
                    }
                  >
                    {stage.status}
                  </Badge>
                </div>
              ))}
            </div>
          </PreviewFrame>
        </div>
      </Section>

      <Section className="bg-surface">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-5">
            <Eyebrow brass>Stage 04</Eyebrow>
            <Display className="text-[30px] leading-[1.2]">Retention, measured</Display>
            <p className="text-[15.5px] leading-[1.65] text-muted">
              30, 90, 180, and 365-day reviews turn a placement into an outcome — the evidence
              funders and agencies have never reliably had.
            </p>
          </div>
          <div className="grid grid-cols-4 gap-px overflow-hidden rounded-md border border-line-2 bg-line-2">
            {[
              { n: '30', l: 'day check' },
              { n: '90', l: 'day check' },
              { n: '180', l: 'day check' },
              { n: '365', l: 'retention review' },
            ].map((item) => (
              <div key={item.n} className="flex flex-col gap-1.5 bg-ink px-4 py-8 text-center">
                <div className="font-serif text-[30px] leading-none font-light text-brass">
                  {item.n}
                </div>
                <div className="text-[11.5px] text-faint">{item.l}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="technology">
        <SectionHead
          eyebrow="Technology overview"
          title="Grounded in a verified database, not open-ended generation."
          lead="Recommendations come from confirmed, current information. When the platform does not know something, it says so and routes the question to a person."
          className="mb-12"
        />
        <FeatureGrid items={TECHNOLOGY} />
      </Section>

      <ClosingCTA
        line="See the platform with your county's data in front of you."
        action="Request a briefing"
        secondary="Open the demo"
        secondaryTo="/signin"
      />
    </>
  )
}
