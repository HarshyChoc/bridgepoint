import { PageHead } from '@/components/portal/PageHead'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { SUPPORT_SERVICES, TENANCY } from '@/data/tenant'
import { useToast } from '@/components/ui/Toast'

export function Support() {
  const notify = useToast()

  return (
    <>
      <PageHead
        eyebrow="Ongoing support"
        title="Support"
        meta="Housing was the beginning. These stay available through the 365-day review and beyond."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {SUPPORT_SERVICES.map((service) => (
          <Card key={service.label} className="flex flex-col gap-4 p-6">
            <div className="flex flex-col gap-2">
              <span className="text-[15.5px]">{service.label}</span>
              <span className="text-[13px] leading-relaxed text-faint">{service.detail}</span>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="mt-auto self-start"
              onClick={() => notify(`Connection request sent for ${service.label.toLowerCase()}`)}
            >
              Connect me
            </Button>
          </Card>
        ))}
      </div>

      <Card tone="sunken" className="mt-6 flex flex-col gap-4 p-6">
        <div className="eyebrow-sm">Talk to a person</div>
        <p className="max-w-3xl text-[14px] leading-relaxed text-text-2">
          {TENANCY.advocate} is still your advocate. Nothing here requires reopening a case or
          re-explaining your situation — she already has the full record.
        </p>
        <Button
          variant="brass"
          className="self-start"
          onClick={() => notify('Message sent — Renee usually replies within a few hours')}
        >
          Message {TENANCY.advocate.split(' ')[0]}
        </Button>
      </Card>
    </>
  )
}
