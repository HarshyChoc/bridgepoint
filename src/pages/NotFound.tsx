import { Wordmark } from '@/components/brand/Wordmark'
import { Display, Eyebrow } from '@/components/ui/Bits'
import { LinkButton } from '@/components/ui/Button'

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <div className="border-b border-line px-6 py-5 lg:px-14">
        <Wordmark />
      </div>
      <div className="flex flex-1 items-center px-6 lg:px-14">
        <div className="mx-auto flex w-full max-w-[720px] flex-col gap-6">
          <Eyebrow brass>404</Eyebrow>
          <Display as="h1" className="text-[38px] sm:text-[48px]">
            That page is not part of the platform.
          </Display>
          <p className="text-[15.5px] leading-relaxed text-muted">
            The link may be out of date. Everything is reachable from the home page or by signing
            into a portal.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <LinkButton to="/" variant="primary">
              Back to home
            </LinkButton>
            <LinkButton to="/signin">Sign in</LinkButton>
          </div>
        </div>
      </div>
    </div>
  )
}
