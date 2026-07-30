import { PageHead } from '@/components/portal/PageHead'
import { StatusBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { INCOMING_REFERRALS } from '@/data/landlord'
import { formatDate } from '@/lib/format'
import { useApp } from '@/state/AppStateContext'
import { useToast } from '@/components/ui/Toast'

export function LandlordReferrals() {
  const { state, dispatch } = useApp()
  const notify = useToast()

  const undecided = INCOMING_REFERRALS.filter((r) => !state.landlordDecisions[r.id]).length

  return (
    <>
      <PageHead
        eyebrow="Incoming referrals"
        title="Referrals"
        meta={`${INCOMING_REFERRALS.length} referrals · ${undecided} awaiting your decision`}
      />

      <div className="flex flex-col gap-3">
        {INCOMING_REFERRALS.map((referral) => {
          const decision = state.landlordDecisions[referral.id]

          return (
            <Card key={referral.id} className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center">
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[15.5px]">{referral.initials}</span>
                  <span className="text-[13px] text-faint">referred for {referral.unit}</span>
                  <StatusBadge
                    status={
                      decision === 'accepted'
                        ? 'Accepted'
                        : decision === 'declined'
                          ? 'Declined'
                          : referral.status
                    }
                  />
                </div>
                <span className="text-[12.5px] text-muted">
                  {referral.org} · received {formatDate(referral.received)}
                </span>
                <p className="max-w-2xl text-[13px] leading-relaxed text-faint">{referral.note}</p>
              </div>

              <div className="flex shrink-0 gap-2.5">
                {decision ? (
                  <span className="text-[13px] text-faint">
                    {decision === 'accepted'
                      ? 'Viewing coordinated with the referring organization.'
                      : 'The organization has been notified.'}
                  </span>
                ) : (
                  <>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        dispatch({
                          type: 'decideLandlordReferral',
                          referralId: referral.id,
                          decision: 'declined',
                        })
                        notify(`${referral.org} notified`)
                      }}
                    >
                      Decline
                    </Button>
                    <Button
                      variant="brass"
                      size="sm"
                      onClick={() => {
                        dispatch({
                          type: 'decideLandlordReferral',
                          referralId: referral.id,
                          decision: 'accepted',
                        })
                        notify(`Accepted — viewing coordinated with ${referral.org}`)
                      }}
                    >
                      Accept and schedule a viewing
                    </Button>
                  </>
                )}
              </div>
            </Card>
          )
        })}
      </div>

      <Card tone="sunken" className="mt-8 p-6">
        <div className="eyebrow-sm mb-3">What you see, and what you do not</div>
        <p className="max-w-3xl text-[13.5px] leading-relaxed text-faint">
          Referrals show only what a housing decision requires: voucher status, income sufficiency,
          move-in timing, and the referring organization. Case history, health information, and
          service records are never shared with a housing provider.
        </p>
      </Card>
    </>
  )
}
