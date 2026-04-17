import { Link, Navigate, useParams } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { experiments, getBySlug } from '../data/experiments'
import { mdxComponents } from '../components/mdx/MDXComponents'
import { useMDXComponent } from '../components/mdx/useMDXComponent'
import { usePageMeta } from '../hooks/usePageMeta'
import ErrorBoundary from '../components/ui/ErrorBoundary'
import ContentSkeleton from '../components/ui/ContentSkeleton'
import ContentError from '../components/ui/ContentError'

export default function ExperimentDetail() {
  const { slug } = useParams<{ slug: string }>()
  const experiment = slug ? getBySlug(slug) : undefined
  const Content = useMDXComponent(experiment?.code ?? '')
  const hasContent = Boolean(experiment?.code)

  usePageMeta({
    title: experiment?.title,
    description: experiment?.description,
  })

  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  if (!experiment) {
    return <Navigate to="/experiments" replace />
  }

  const currentIndex = experiments.findIndex((e) => e.slug === slug)
  const nextExperiment = experiments[(currentIndex + 1) % experiments.length]
  const relatedExperiments = experiments.filter((e) => e.slug !== slug).slice(0, 2)

  const stackTags = experiment.stack
  const statusTextClass = experiment.status === 'active' ? 'text-accent-green' : 'text-ink-muted'
  const statusLabel = experiment.status.toUpperCase()
  const summaryTags = experiment.stack.slice(0, 3).join(' · ')

  return (
    <>
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 z-50 h-0.5 bg-accent-red origin-left"
        style={{ scaleX }}
      />

      <main className="overflow-x-hidden bg-cream-base">
        <div className="mx-auto w-full max-w-[1160px] px-4 pb-20 sm:px-8 sm:pb-24 lg:px-14 xl:px-16">
          <header className="pt-10 sm:pt-14">
            <Link
              to="/experiments"
              className="font-mono text-[11px] leading-[16.5px] text-ink-muted no-underline"
              style={{ letterSpacing: '0.44px' }}
            >
              ← Experiments
            </Link>

            <div className="mt-5 grid gap-2 font-mono text-[11px] leading-[16.5px] text-ink-muted sm:mt-6 sm:flex sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-2 sm:text-xs sm:leading-[18px]">
              <span className="tracking-[0.72px] uppercase">EXPERIMENT NO. {experiment.id.replace('EXP-', '00')}</span>
              <span>
                Status: <span className={statusTextClass}>[ {statusLabel} ]</span>
              </span>
              <span>Started: {experiment.startDate}</span>
              <span className="[overflow-wrap:anywhere]">Tags: {summaryTags}</span>
            </div>

            <h1 className="mt-5 font-display text-[clamp(2.35rem,11vw,4rem)] leading-[1.04] text-ink [overflow-wrap:anywhere] sm:mt-6 sm:leading-[1.1]">
              {experiment.title}
            </h1>
          </header>

          <div className="mt-10 grid gap-10 sm:mt-14 sm:gap-12 lg:grid-cols-[minmax(0,640px)_240px] lg:justify-center lg:gap-16 xl:gap-20">
            <article className="min-w-0 w-full max-w-[640px] lg:mx-0 [&_figcaption]:[overflow-wrap:anywhere] [&_h2]:[overflow-wrap:anywhere] [&_p]:[overflow-wrap:anywhere]">
              <ErrorBoundary
                fallback={
                  <ContentError
                    title="Content Error"
                    message="There was a problem rendering this experiment's content."
                    backLink="/experiments"
                    backLabel="← Back to Experiments"
                  />
                }
              >
                {hasContent ? (
                  <Content components={mdxComponents} />
                ) : (
                  <ContentSkeleton type="article" />
                )}
              </ErrorBoundary>

              <div className="mt-12 border-t border-cream-line pt-8">
                <Link
                  to={`/experiments/${nextExperiment.slug}`}
                  className="inline-flex min-h-[44px] items-center font-display text-[20px] italic leading-[1.3] text-accent-red no-underline transition-[color,padding-left] duration-200 hover:text-ink lg:pl-2 lg:hover:pl-4 sm:text-[22px] sm:leading-[33px]"
                >
                  Next Experiment → {nextExperiment.title}
                </Link>
              </div>
            </article>

            <aside className="mt-2 border-t border-cream-line pt-8 sm:mt-4 sm:pt-10 lg:mt-0 lg:border-t-0 lg:pt-0">
              <div className="space-y-8 sm:space-y-10 lg:sticky lg:top-24 lg:space-y-12">
                <section>
                  <p className="font-ui text-[11px] uppercase tracking-[1.32px] text-ink-muted">Stack</p>
                  <div className="mt-4 border-t border-cream-line pt-4 flex flex-wrap gap-2">
                    {stackTags.map((tag, tagIndex) => (
                      <span
                        key={`${experiment.id}-${tag}-${tagIndex}`}
                        className="rounded-full border border-cream-line px-2.5 py-1 font-mono text-[10px] leading-[15px] text-ink-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </section>

                <section>
                  <p className="font-ui text-[11px] uppercase tracking-[1.32px] text-ink-muted">Links</p>
                  <div className="mt-4 border-t border-cream-line pt-4 space-y-2">
                    {experiment.githubUrl && (
                      <a
                        href={experiment.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center font-ui text-sm leading-[21px] text-accent-red no-underline"
                      >
                        → Github
                      </a>
                    )}
                    {experiment.liveUrl && (
                      <a
                        href={experiment.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center font-ui text-sm leading-[21px] text-accent-red no-underline"
                      >
                        → Live Demo
                      </a>
                    )}
                  </div>
                </section>

                <section>
                  <p className="font-ui text-[11px] uppercase tracking-[1.32px] text-ink-muted">Related</p>
                  <div className="mt-4 border-t border-cream-line pt-4 space-y-3">
                    {relatedExperiments.map((related) => (
                      <Link
                        key={related.id}
                        to={`/experiments/${related.slug}`}
                        className="inline-flex min-h-[44px] items-center font-mono text-xs leading-[18px] text-ink no-underline [overflow-wrap:anywhere]"
                      >
                        [ {related.id} ] {related.title}
                      </Link>
                    ))}
                  </div>
                </section>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
