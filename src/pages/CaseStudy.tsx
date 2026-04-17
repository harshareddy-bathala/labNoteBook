import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Navigate, useParams } from 'react-router-dom'
import { fieldwork } from '../data/fieldwork'
import { mdxComponents } from '../components/mdx/MDXComponents'
import { useMDXComponent } from '../components/mdx/useMDXComponent'
import { usePageMeta } from '../hooks/usePageMeta'
import ErrorBoundary from '../components/ui/ErrorBoundary'
import ContentSkeleton from '../components/ui/ContentSkeleton'
import ContentError from '../components/ui/ContentError'

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  const caseStudy = useMemo(() => fieldwork.find((item) => item.slug === slug), [slug])
  const Content = useMDXComponent(caseStudy?.code ?? '')
  const hasContent = Boolean(caseStudy?.code)

  usePageMeta({
    title: caseStudy?.title,
    description: caseStudy?.deliverable,
  })

  if (!caseStudy) {
    return <Navigate to="/field-work" replace />
  }

  return (
    <motion.main
      key="case-content"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: easing }}
      className="overflow-x-hidden bg-cream-base text-ink"
    >
      <div className="mx-auto w-full max-w-[1160px] px-8 pb-20 pt-20 sm:px-10 sm:pb-24 sm:pt-24 lg:px-14 xl:px-16">
        <header className="border-b border-cream-line pb-7 sm:pb-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted">
            Field Work · {caseStudy.clientType}
          </p>
          <h1 className="mt-4 font-display text-[40px] leading-[1.05] text-ink sm:text-[56px] sm:leading-[1.05] lg:text-display-xl">{caseStudy.deliverable}</h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {caseStudy.tags.map((tag, tagIndex) => (
              <span
                key={`${caseStudy.id}-${tag}-${tagIndex}`}
                className="border border-cream-line px-2 py-1 font-mono text-[10px] leading-[15px] text-ink-muted sm:text-[11px] sm:leading-[16.5px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="relative mt-10 grid gap-10 sm:mt-12 sm:gap-12 xl:grid-cols-[minmax(0,680px)_240px] xl:justify-center">
          <article className="space-y-10 sm:space-y-12">
            <ErrorBoundary
              fallback={
                <ContentError
                  title="Content Error"
                  message="There was a problem rendering this case study's content."
                  backLink="/field-work"
                  backLabel="← Back to Field Work"
                />
              }
            >
              {hasContent ? (
                <Content components={mdxComponents} />
              ) : (
                <ContentSkeleton type="article" />
              )}
            </ErrorBoundary>
          </article>

          <aside className="hidden xl:block">
            <div className="sticky top-24 border-l border-cream-line pl-5">
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                Engagement
              </p>
              <p className="mt-3 font-mono text-xs text-ink">{caseStudy.id}</p>
              <p className="mt-1 font-mono text-xs text-ink-muted">{caseStudy.year}</p>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                Access
              </p>
              <p className="mt-2 font-mono text-xs text-ink">Public</p>
            </div>
          </aside>
        </div>
      </div>
    </motion.main>
  )
}
