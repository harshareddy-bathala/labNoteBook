import { Link } from 'react-router-dom'
import { observations } from '../data/observations'
import EmptyState from '../components/ui/EmptyState'
import { usePageMeta } from '../hooks/usePageMeta'

type ObservationEntry = (typeof observations)[number]

function toTimestamp(date: string) {
  const parsed = Date.parse(date)
  return Number.isNaN(parsed) ? 0 : parsed
}

function formatEntryNumber(position: number, total: number) {
  return `No. ${String(Math.max(total - position + 1, 1)).padStart(3, '0')}`
}

function ArchiveRow({ observation, number }: { observation: ObservationEntry; number: string }) {
  const rowClassName =
    'block w-full border-b border-cream-line py-6 first:border-t first:border-cream-line transition-colors duration-200 sm:py-6 lg:first:border-t-0 lg:grid lg:grid-cols-[76px_126px_minmax(0,1fr)_76px_164px] lg:items-center lg:gap-x-4 lg:px-4 lg:py-6'

  const content = (
    <>
      <div className="lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[11px] leading-[16.5px] text-ink-muted">{number}</p>
          <p className="font-mono text-[11px] leading-[16.5px] text-ink-muted">{observation.date}</p>
        </div>

        <h3 className="mt-2.5 font-display text-[28px] leading-[1.12] text-ink sm:text-[30px]">
          {observation.title}
        </h3>

        <div className="mt-3.5 flex flex-wrap items-center gap-x-3 gap-y-2.5">
          <p className="font-mono text-[11px] leading-[16.5px] text-ink-muted">[ {observation.readTime} min ]</p>
          <div className="flex flex-wrap gap-1.5">
            {observation.tags.map((tag, tagIndex) => (
              <span
                key={`${number}-${tag}-${tagIndex}`}
                className="rounded-full border border-cream-line px-2.5 py-1 font-mono text-[10px] leading-[15px] text-ink-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden lg:contents">
        <p className="whitespace-nowrap font-mono text-[11px] leading-[16.5px] text-ink-muted">{number}</p>
        <p className="whitespace-nowrap font-mono text-[11px] leading-[16.5px] text-ink-muted">{observation.date}</p>
        <h3 className="font-display text-[22px] leading-[27.5px] text-ink">{observation.title}</h3>
        <p className="whitespace-nowrap font-mono text-[11px] leading-[16.5px] text-ink-muted">[ {observation.readTime} min ]</p>
        <div className="flex flex-wrap items-center gap-1.5">
          {observation.tags.map((tag, tagIndex) => (
            <span
              key={`${number}-${tag}-${tagIndex}`}
              className="rounded-full border border-cream-line px-2.5 py-1 font-mono text-[10px] leading-[15px] text-ink-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  )

  return (
    <Link
      to={`/observations/${observation.slug}`}
      className={`${rowClassName} no-underline hover:bg-cream-line/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-red`}
    >
      {content}
    </Link>
  )
}

export default function Observations() {
  usePageMeta({
    title: 'Observations',
    description: 'Notes and observations on craft, systems, and building software.',
  })

  const sortedObservations = [...observations].sort((a, b) => toTimestamp(b.date) - toTimestamp(a.date))
  const publishedCount = sortedObservations.length
  const latestEntry = sortedObservations[0]
  const listEntries = sortedObservations

  return (
    <div className="overflow-x-hidden bg-cream-base text-ink">
      <section className="mx-auto w-full max-w-[1160px] border-b border-cream-line px-5 pb-px pt-12 sm:px-8 sm:pt-16 lg:px-14 xl:px-16">
        <div className="pt-3 sm:pt-6">
          <Link
            to="/"
            className="font-mono text-[11px] leading-[16.5px] text-ink-muted no-underline"
            style={{ letterSpacing: '0.44px' }}
          >
            ← The Lab Notebook
          </Link>
        </div>

        <div className="mt-5 flex flex-col gap-6 pb-1 lg:mt-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-display text-[44px] leading-[0.98] text-ink sm:text-[72px] sm:leading-[72px]">
              Observations
            </h1>
            <p className="mt-3 font-mono text-[12px] leading-[18px] text-ink-muted sm:text-[13px] sm:leading-[19.5px]">
              [ {publishedCount} published · entries on craft, systems &amp; building ]
            </p>
          </div>

          <p className="max-w-[34ch] font-body text-[15px] leading-[1.65] text-ink-muted lg:text-right">
            Not a blog. A running record of things I notice while building.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1160px] border-b border-cream-line px-5 pb-10 pt-9 sm:px-8 sm:pb-12 sm:pt-12 lg:px-14 lg:pb-16 xl:px-16">
        <div className="flex items-center gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[1.1px] text-accent-red">Latest Entry</p>
          <div className="h-px flex-1 bg-cream-line" />
        </div>

        {latestEntry ? (
          <Link
            to={`/observations/${latestEntry.slug}`}
            className="group mt-6 block border border-cream-line bg-cream-surface p-5 no-underline transition-colors duration-200 hover:bg-cream-base sm:p-8 md:p-12 lg:pl-12"
          >
            <div className="flex items-center gap-3">
              <p className="font-mono text-[10px] tracking-[0.8px] text-accent-red">LATEST ENTRY</p>
              <div className="h-px flex-1 bg-cream-line" />
              <p className="font-mono text-[11px] text-ink-muted">{formatEntryNumber(1, publishedCount)}</p>
            </div>

            <p className="mt-4 font-mono text-[11px] tracking-[0.44px] text-ink-muted">{latestEntry.date}</p>

            <h2 className="mt-3 max-w-[644px] font-display text-[34px] leading-[1.1] text-ink sm:text-[40px] sm:leading-[1.08] md:text-[48px] md:leading-[1]">
              {latestEntry.title}
            </h2>

            <p className="mt-4 max-w-[560px] font-body text-[15px] leading-[1.65] text-ink-muted sm:text-[16px] sm:leading-7">
              {latestEntry.excerpt}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <p className="mr-2 font-mono text-[11px] leading-[16.5px] text-ink-muted">[ {latestEntry.readTime} min read ]</p>
                {latestEntry.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="rounded-full border border-cream-line px-2.5 py-1 font-mono text-[10px] leading-[15px] text-ink-muted">
                    {tag}
                  </span>
                ))}
              </div>

              <span className="inline-flex min-h-[44px] items-center font-mono text-[12px] text-accent-red opacity-60 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100 sm:text-[13px]">
                → Read entry
              </span>
            </div>
          </Link>
        ) : (
          <EmptyState
            id="[ NO OBSERVATIONS ]"
            label="Nothing published yet"
            message="Observations will appear here"
            hint="Add an .mdx file to src/content/observations/ to get started"
          />
        )}
      </section>

      <section className="mx-auto w-full max-w-[1160px] px-5 pb-20 pt-9 sm:px-8 sm:pb-24 sm:pt-12 lg:px-14 xl:px-16">
        <div className="flex items-center gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[1.1px] text-ink-muted">All Entries</p>
          <div className="h-px flex-1 bg-cream-line" />
        </div>

        <div className="mt-6">
          <div className="hidden border-b border-cream-line pb-3 lg:grid lg:grid-cols-[76px_126px_minmax(0,1fr)_76px_164px] lg:gap-x-4 lg:px-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.8px] text-ink-muted">No.</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.8px] text-ink-muted">Date</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.8px] text-ink-muted">Title</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.8px] text-ink-muted">Read</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.8px] text-ink-muted">Tags</p>
          </div>

          {listEntries.length > 0 && (
            <div>
              {listEntries.map((entry, index) => (
                <ArchiveRow
                  key={entry.id}
                  observation={entry}
                  number={formatEntryNumber(index + 1, publishedCount)}
                />
              ))}
            </div>
          )}

          {observations.length === 0 && (
            <EmptyState
              id="[ NO OBSERVATIONS ]"
              label="Nothing published yet"
              message="Observations will appear here"
              hint="Add an .mdx file to src/content/observations/ to get started"
            />
          )}
        </div>
      </section>
    </div>
  )
}
