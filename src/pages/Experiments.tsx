import { Link } from 'react-router-dom'
import { experiments, type Experiment } from '../data/experiments'
import EmptyState from '../components/ui/EmptyState'
import { usePageMeta } from '../hooks/usePageMeta'

type DisplayStatus = 'active' | 'paused' | 'archived'

function statusClass(status: DisplayStatus) {
  if (status === 'active') {
    return 'text-accent-green'
  }

  return 'text-ink-muted'
}

// Generate figure caption from experiment ID
function getFigure(exp: Experiment): string {
  if (exp.figure) return exp.figure
  const figNum = parseInt(exp.id.replace('EXP-', ''), 10)
  return `Fig. ${figNum} - documented experiment`
}

export default function Experiments() {
  usePageMeta({
    title: 'Experiments',
    description: 'A collection of technical experiments, side projects, and prototypes.',
  })

  // Sort experiments by ID descending (newest first)
  const sortedExperiments = [...experiments].sort((a, b) => b.id.localeCompare(a.id))
  
  const activeCount = sortedExperiments.filter((exp) => exp.status === 'active').length
  const pausedCount = sortedExperiments.filter((exp) => exp.status === 'paused').length
  const archivedCount = sortedExperiments.filter((exp) => exp.status === 'archived').length

  // Pinned experiments: active or paused ones
  const pinnedExperiments = sortedExperiments.filter(
    (exp) => exp.status === 'active' || exp.status === 'paused'
  )

  return (
    <main className="bg-cream-base text-ink">
      <div className="mx-auto w-full max-w-[1160px] border-b border-cream-line px-4 pb-px pt-12 sm:px-8 sm:pt-16 lg:px-14 xl:px-16">
        <div className="pt-3 sm:pt-6">
          <Link
            to="/"
            className="font-mono text-[11px] leading-[16.5px] text-ink-muted no-underline"
            style={{ letterSpacing: '0.44px' }}
          >
            ← The Lab Notebook
          </Link>
        </div>

        <div className="mt-6">
          <div>
            <h1 className="font-display text-[clamp(2.5rem,11vw,4.5rem)] leading-[0.98] text-ink">
              Experiments
            </h1>
            <p className="mt-3 font-mono text-[12px] leading-[18px] text-ink-muted sm:text-[13px] sm:leading-[19.5px]">
              [ {sortedExperiments.length} documented · {activeCount} active · {pausedCount} paused · {archivedCount} archived ]
            </p>
          </div>
        </div>
      </div>

      <section className="mx-auto w-full max-w-[1160px] border-b border-cream-line px-4 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-12 lg:px-14 xl:px-16">
        <div className="flex items-center gap-4">
          <p
            className="font-mono text-[11px] uppercase text-accent-red"
            style={{ letterSpacing: '1.1px' }}
          >
            ★ Pinned
          </p>
          <div className="h-px flex-1 bg-cream-line" />
        </div>

        <div className="mt-7 grid gap-5 sm:mt-8 sm:gap-8 lg:grid-cols-2">
          {pinnedExperiments.map((experiment) => {
            return (
              <Link
                key={experiment.id}
                to={`/experiments/${experiment.slug}`}
                className="group block overflow-hidden border border-cream-line bg-cream-surface no-underline transition-[border-color,background-color] duration-200 hover:border-accent-red/30"
              >
                <div className="h-[180px] overflow-hidden sm:h-[226px]">
                  <div className="flex h-full w-full items-center justify-center bg-cream-line transition-colors duration-300 group-hover:bg-cream-base">
                    <span className="font-mono text-xs text-ink-muted">{experiment.id}</span>
                  </div>
                </div>

                <div className="p-4 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] leading-[16.5px]">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-ink-muted">{experiment.id}</span>
                      <span className={statusClass(experiment.status)}>[ {experiment.status} ]</span>
                    </div>
                    <span className="text-[10px] tracking-[0.6px] text-accent-red">★ PINNED</span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {experiment.stack.slice(0, 5).map((tag, tagIndex) => (
                      <span
                        key={`${experiment.id}-${tag}-${tagIndex}`}
                        className="rounded-full border border-cream-line px-2.5 py-1 font-mono text-[10px] leading-[15px] text-ink-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="mt-3 font-display text-[clamp(1.8rem,7.8vw,2.25rem)] leading-[1.06] text-ink [overflow-wrap:anywhere]">{experiment.title}</h2>
                  <p className="mt-3 font-body text-[14px] leading-[1.64] text-ink-muted sm:text-[15px] sm:leading-[25.5px]">{experiment.description}</p>

                  <div className="mt-5 flex items-start justify-between gap-4 sm:items-center">
                    <p className="max-w-[24ch] font-mono text-[11px] italic leading-[16.5px] text-ink-muted">{getFigure(experiment)}</p>
                    <span className="inline-flex min-h-[44px] items-center font-mono text-[13px] text-accent-red opacity-50 transition-opacity duration-200 group-hover:opacity-100">
                      → open
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1160px] px-4 pb-20 pt-10 sm:px-8 sm:pb-24 sm:pt-12 lg:px-14 xl:px-16">
        <div className="flex items-center gap-4">
          <p
            className="font-mono text-[11px] uppercase text-ink-muted"
            style={{ letterSpacing: '1.1px' }}
          >
            All Entries
          </p>
          <div className="h-px flex-1 bg-cream-line" />
        </div>

        <div className="mt-8">
          <div className="hidden lg:block">
            <div className="grid grid-cols-[88px_200px_minmax(0,1fr)_96px_64px_220px] gap-x-4 border-b border-cream-line px-4 pb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.8px] text-ink-muted">ID</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.8px] text-ink-muted">Name</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.8px] text-ink-muted">Description</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.8px] text-ink-muted">Status</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.8px] text-ink-muted">Year</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.8px] text-ink-muted">Tags</span>
            </div>

            {sortedExperiments.map((experiment) => (
              <Link
                key={experiment.id}
                to={`/experiments/${experiment.slug}`}
                className="grid grid-cols-[88px_200px_minmax(0,1fr)_96px_64px_220px] items-center gap-x-4 border-b border-cream-line px-4 py-5 no-underline transition-colors duration-200 hover:bg-cream-line/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-red lg:py-6"
              >
                <span className="font-mono text-xs leading-[18px] text-ink-muted">{experiment.id}</span>
                <h3 className="font-display text-[30px] leading-[31.5px] text-ink">{experiment.title}</h3>
                <p className="truncate font-body text-sm leading-[21px] text-ink-muted">{experiment.description}</p>
                <span className={`font-mono text-[11px] leading-[16.5px] ${statusClass(experiment.status)}`}>
                  [ {experiment.status} ]
                </span>
                <span className="font-mono text-xs leading-[18px] text-ink-muted">{experiment.year}</span>
                <div className="flex flex-wrap gap-1.5">
                  {experiment.stack.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={`${experiment.id}-${tag}-${tagIndex}`}
                      className="rounded-full border border-cream-line px-2.5 py-1 font-mono text-[10px] leading-[15px] text-ink-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <div className="space-y-3 lg:hidden">
            {sortedExperiments.map((experiment) => (
              <Link
                key={experiment.id}
                to={`/experiments/${experiment.slug}`}
                className="block border border-cream-line bg-cream-surface p-4 no-underline transition-colors duration-200 hover:bg-cream-line/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-red"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] leading-[16.5px] text-ink-muted">{experiment.id}</p>
                    <h3 className="mt-1 font-display text-[clamp(1.75rem,8vw,2rem)] leading-[1.06] text-ink [overflow-wrap:anywhere]">{experiment.title}</h3>
                  </div>
                  <span className="font-mono text-[11px] leading-[16.5px] text-ink-muted">{experiment.year}</span>
                </div>

                <p className="mt-2 font-body text-sm leading-[22px] text-ink-muted [overflow-wrap:anywhere]">{experiment.description}</p>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className={`font-mono text-[11px] leading-[16.5px] ${statusClass(experiment.status)}`}>
                    [ {experiment.status} ]
                  </span>
                  <span className="inline-flex min-h-[44px] items-center font-mono text-[12px] leading-[18px] text-accent-red">→ open</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {experiment.stack.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={`${experiment.id}-${tag}-${tagIndex}`}
                      className="rounded-full border border-cream-line px-2.5 py-1 font-mono text-[10px] leading-[15px] text-ink-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          {sortedExperiments.length === 0 && (
            <EmptyState
              id="[ NO EXPERIMENTS ]"
              label="Nothing here yet"
              message="Experiments will appear here"
              hint="Add an .mdx file to src/content/experiments/ to get started"
            />
          )}
        </div>
      </section>
    </main>
  )
}
