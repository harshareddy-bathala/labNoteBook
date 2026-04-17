import { Link } from 'react-router-dom'

type ContentErrorProps = {
  title?: string
  message?: string
  backLink?: string
  backLabel?: string
}

export default function ContentError({
  title = 'Content Unavailable',
  message = 'We couldn\'t load this content. It may have been moved or there was a problem loading it.',
  backLink = '/',
  backLabel = '← Back to Home',
}: ContentErrorProps) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-cream-base px-8 text-center">
      <div className="w-full max-w-md">
        <p className="font-mono text-[11px] uppercase tracking-[0.88px] text-ink-muted">
          [ CONTENT ERROR ]
        </p>

        <h2 className="mt-4 font-display text-[28px] leading-[1.1] text-ink sm:text-[36px]">
          {title}
        </h2>

        <p className="mx-auto mt-4 max-w-[32ch] font-body text-[15px] leading-[1.7] text-ink-muted">
          {message}
        </p>

        <div className="mt-8">
          <Link
            to={backLink}
            className="inline-flex min-h-[44px] items-center font-mono text-[12px] text-accent-red transition-colors duration-200 hover:text-ink"
          >
            {backLabel}
          </Link>
        </div>
      </div>
    </div>
  )
}
