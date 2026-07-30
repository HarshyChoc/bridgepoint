import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHead } from '@/components/portal/PageHead'
import { StatusBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Select } from '@/components/ui/Field'
import { EmptyState } from '@/components/ui/Bits'
import { relativeFromNow } from '@/lib/format'
import { useApp } from '@/state/AppStateContext'
import { useToast } from '@/components/ui/Toast'
import type { ReferralStatus } from '@/data/types'

const COLUMNS: ReferralStatus[] = ['Draft', 'Sent', 'Pending', 'Accepted', 'Completed']
const NEXT: Partial<Record<ReferralStatus, ReferralStatus>> = {
  Draft: 'Sent',
  Sent: 'Pending',
  Pending: 'Accepted',
  Accepted: 'Completed',
}

export function ReferralsBoard() {
  const { state, dispatch } = useApp()
  const notify = useToast()
  const [org, setOrg] = useState('All')

  const orgs = Array.from(new Set(state.referrals.map((r) => r.org))).sort()
  const visible = state.referrals.filter((r) => org === 'All' || r.org === org)
  const stalled = visible.filter((r) => r.status === 'Pending' || r.status === 'Sent')

  return (
    <>
      <PageHead
        eyebrow="Referral management"
        title="Referrals"
        meta={`${visible.length} referrals · ${stalled.length} awaiting a partner response`}
        actions={
          <Select value={org} onChange={(e) => setOrg(e.target.value)} className="w-60">
            <option value="All">All organizations</option>
            {orgs.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Select>
        }
      />

      <div className="grid gap-4 lg:grid-cols-5">
        {COLUMNS.map((column) => {
          const rows = visible.filter((r) => r.status === column)
          return (
            <div key={column} className="flex flex-col gap-3">
              <div className="flex items-center justify-between px-1">
                <span className="eyebrow-sm">{column}</span>
                <span className="font-mono text-[11px] text-ghost">{rows.length}</span>
              </div>

              <div className="flex min-h-[120px] flex-col gap-3">
                {rows.length === 0 ? (
                  <div className="rounded-md border border-dashed border-line-2 px-3 py-8 text-center text-[11.5px] text-ghost">
                    Empty
                  </div>
                ) : (
                  rows.map((referral) => {
                    const next = NEXT[referral.status]
                    return (
                      <Card key={referral.id} className="flex flex-col gap-3 p-4">
                        <Link
                          to={`/advocate/caseload/${referral.clientId}`}
                          className="text-[13.5px] transition-colors hover:text-brass"
                        >
                          {referral.clientName}
                        </Link>
                        <div className="flex flex-col gap-1">
                          <span className="text-[12px] text-muted">{referral.org}</span>
                          <span className="text-[11.5px] text-faint">{referral.service}</span>
                        </div>
                        <span className="font-mono text-[10.5px] text-ghost">
                          {relativeFromNow(referral.updatedOn)}
                        </span>
                        {next && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="justify-start px-0"
                            onClick={() => {
                              dispatch({
                                type: 'setReferralStatus',
                                referralId: referral.id,
                                status: next,
                              })
                              notify(`${referral.clientName} → ${next.toLowerCase()}`)
                            }}
                          >
                            Move to {next.toLowerCase()} →
                          </Button>
                        )}
                      </Card>
                    )
                  })
                )}
              </div>
            </div>
          )
        })}
      </div>

      {visible.filter((r) => r.status === 'Declined').length > 0 && (
        <div className="mt-10">
          <div className="eyebrow mb-4">Declined</div>
          <div className="flex flex-col gap-3">
            {visible
              .filter((r) => r.status === 'Declined')
              .map((referral) => (
                <Card key={referral.id} className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center">
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[13.5px]">{referral.clientName}</span>
                      <StatusBadge status={referral.status} />
                    </div>
                    <span className="text-[12px] text-faint">
                      {referral.org} · {referral.service}
                    </span>
                    <span className="text-[12px] text-ghost">{referral.note}</span>
                  </div>
                  <Button
                    size="sm"
                    className="shrink-0"
                    onClick={() => {
                      dispatch({
                        type: 'setReferralStatus',
                        referralId: referral.id,
                        status: 'Sent',
                      })
                      notify(`Re-offered to ${referral.org}`)
                    }}
                  >
                    Re-offer
                  </Button>
                </Card>
              ))}
          </div>
        </div>
      )}

      {visible.length === 0 && <EmptyState title="No referrals for that organization." />}
    </>
  )
}
