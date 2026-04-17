import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import { observations, getBySlug } from '../data/observations'
import { experiments } from '../data/experiments'
import { mdxComponents } from '../components/mdx/MDXComponents'
import { useMDXComponent } from '../components/mdx/useMDXComponent'
import { usePageMeta } from '../hooks/usePageMeta'
import ErrorBoundary from '../components/ui/ErrorBoundary'
import ContentSkeleton from '../components/ui/ContentSkeleton'
import ContentError from '../components/ui/ContentError'

type TocNode = {
  title: string
  url: string
  items?: TocNode[]
}

function flattenToc(nodes: TocNode[]): Array<{ id: string; label: string }> {
  const result: Array<{ id: string; label: string }> = []

  const walk = (entries: TocNode[]) => {
    for (const entry of entries) {
      const id = entry.url.replace(/^#/, '').trim()
      const label = entry.title.trim()

      if (id && label) {
        result.push({ id, label })
      }

      if (entry.items && entry.items.length > 0) {
        walk(entry.items)
      }
    }
  }

  walk(nodes)

  return result.filter((entry, index, all) => all.findIndex((other) => other.id === entry.id) === index)
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const observation = slug ? getBySlug(slug) : undefined

  usePageMeta({
    title: observation?.title,
    description: observation?.excerpt,
  })

  const [activeSection, setActiveSection] = useState('')
  const articleRef = useRef<HTMLElement | null>(null)
  const postBodyEndRef = useRef<HTMLDivElement | null>(null)
  const tocRailRef = useRef<HTMLElement | null>(null)
  const tocPanelRef = useRef<HTMLDivElement | null>(null)
  const Content = useMDXComponent(observation?.code ?? '')
  const hasContent = Boolean(observation?.code)
  const sectionOrder = useMemo(
    () => flattenToc((observation?.toc ?? []) as TocNode[]),
    [observation]
  )

  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ['start end', 'end start'],
  })
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    mass: 0.24,
  })
  const relatedExperiments = useMemo(() => {
    const preferred = ['EXP-007', 'EXP-005']
    const chosen = experiments.filter((exp) => preferred.includes(exp.id))
    if (chosen.length === 2) {
      return chosen
    }
    return experiments.slice(0, 2)
  }, [experiments])

  useEffect(() => {
    setActiveSection(sectionOrder[0]?.id ?? '')
  }, [sectionOrder])

  useEffect(() => {
    if (!observation) {
      return
    }

    const observedSections = sectionOrder
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => Boolean(section))

    const desktopQuery = window.matchMedia('(min-width: 1024px)')
    let rafId = 0

    const resetPanelStyles = () => {
      const panel = tocPanelRef.current
      if (!panel) {
        return
      }

      panel.style.position = ''
      panel.style.top = ''
      panel.style.left = ''
      panel.style.width = ''
    }

    const updatePanelPosition = () => {
      rafId = 0

      const article = articleRef.current
      const stopMarker = postBodyEndRef.current
      const rail = tocRailRef.current
      const panel = tocPanelRef.current

      if (!desktopQuery.matches || !article || !stopMarker || !rail || !panel) {
        resetPanelStyles()
        return
      }

      const topOffset = 96
      const scrollY = window.scrollY
      const articleRect = article.getBoundingClientRect()
      const stopMarkerRect = stopMarker.getBoundingClientRect()
      const railRect = rail.getBoundingClientRect()
      const articleTop = scrollY + articleRect.top
      const stopMarkerTop = scrollY + stopMarkerRect.top
      const panelHeight = panel.offsetHeight
      const pinnedStart = articleTop - topOffset
      const maxTopInsideRail = Math.max(stopMarkerTop - articleTop - panelHeight, 0)
      const pinnedEnd = pinnedStart + maxTopInsideRail

      if (scrollY < pinnedStart) {
        panel.style.position = 'absolute'
        panel.style.top = '0px'
        panel.style.left = '0px'
        panel.style.width = '100%'
        return
      }

      if (scrollY >= pinnedEnd) {
        panel.style.position = 'absolute'
        panel.style.top = `${maxTopInsideRail}px`
        panel.style.left = '0px'
        panel.style.width = '100%'
        return
      }

      panel.style.position = 'fixed'
      panel.style.top = `${topOffset}px`
      panel.style.left = `${railRect.left}px`
      panel.style.width = `${railRect.width}px`
    }

    const updateActiveSection = () => {
      if (observedSections.length === 0) {
        return
      }

      const anchorLine = 140
      let nextActive = observedSections[0].id

      for (const section of observedSections) {
        const rect = section.getBoundingClientRect()
        if (rect.top <= anchorLine) {
          nextActive = section.id
          continue
        }

        break
      }

      setActiveSection((current) => (current === nextActive ? current : nextActive))
    }

    const runFrameUpdate = () => {
      rafId = 0
      updateActiveSection()
      updatePanelPosition()
    }

    const scheduleFrameUpdate = () => {
      if (rafId) {
        return
      }

      rafId = window.requestAnimationFrame(runFrameUpdate)
    }

    const handleMediaQueryChange = () => {
      scheduleFrameUpdate()
    }

    scheduleFrameUpdate()
    window.addEventListener('scroll', scheduleFrameUpdate, { passive: true })
    window.addEventListener('resize', scheduleFrameUpdate)

    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener('change', handleMediaQueryChange)
    } else {
      desktopQuery.addListener(handleMediaQueryChange)
    }

    return () => {
      window.removeEventListener('scroll', scheduleFrameUpdate)
      window.removeEventListener('resize', scheduleFrameUpdate)

      if (desktopQuery.removeEventListener) {
        desktopQuery.removeEventListener('change', handleMediaQueryChange)
      } else {
        desktopQuery.removeListener(handleMediaQueryChange)
      }

      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }

      resetPanelStyles()
    }
  }, [observation, sectionOrder])

  if (!observation) {
    return <Navigate to="/observations" replace />
  }

  const currentIndex = observations.findIndex((o) => o.slug === slug)
  const nextObservation = observations[(currentIndex + 1) % observations.length]

  return (
    <>
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 z-50 h-0.5 bg-accent-red origin-left"
        style={{ scaleX }}
      />

      <main className="overflow-x-hidden bg-cream-base">
        <div className="mx-auto w-full max-w-[1160px] px-4 pb-16 sm:px-8 sm:pb-24 lg:px-14 xl:px-16">
          <header className="pt-10 sm:pt-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.88px] text-ink-muted">Observation</p>
            <h1 className="mt-4 max-w-[760px] font-display text-[clamp(2rem,8.5vw,3.5rem)] leading-[1.06] text-ink [overflow-wrap:anywhere] sm:mt-5 sm:leading-[1.05]">
              {observation.title}
            </h1>
            <p className="mt-4 font-ui text-[13px] leading-5 text-ink-muted sm:mt-5 sm:text-[14px] sm:leading-[21px]">
              Published {observation.date} · [ {observation.readTime} min read ]
            </p>
            <div className="mt-7 h-px bg-cream-line sm:mt-8" />
          </header>

          <div className="mt-10 grid gap-9 sm:mt-14 sm:gap-12 lg:grid-cols-[minmax(0,720px)_220px] lg:justify-center lg:gap-16">
            <article
              ref={articleRef}
              className="min-w-0 w-full max-w-[720px] lg:mx-0 [&_figcaption]:[overflow-wrap:anywhere] [&_h2]:[overflow-wrap:anywhere] [&_h3]:[overflow-wrap:anywhere] [&_p]:[overflow-wrap:anywhere]"
            >
              <ErrorBoundary
                fallback={
                  <ContentError
                    title="Content Error"
                    message="There was a problem rendering this observation's content."
                    backLink="/observations"
                    backLabel="← Back to Observations"
                  />
                }
              >
                {hasContent ? (
                  <Content components={mdxComponents} />
                ) : (
                  <ContentSkeleton type="article" />
                )}
              </ErrorBoundary>

              <div ref={postBodyEndRef} className="mt-14 border-t border-cream-line pt-7 sm:mt-16 sm:pt-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-ui text-[12px] leading-[18px] text-ink-muted">Filed under</span>
                  {observation.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-cream-line px-3 py-1 font-ui text-[12px] leading-[18px] text-ink-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-7 text-right sm:mt-8">
                  <Link
                    to={`/observations/${nextObservation.slug}`}
                    className="inline-flex min-h-[44px] items-center font-display text-[20px] italic leading-[1.3] text-accent-red no-underline transition-[color,padding-left] duration-200 hover:text-ink lg:pl-3 lg:hover:pl-5 sm:text-[22px] sm:leading-[33px]"
                  >
                    Next Observation →
                  </Link>
                </div>

                <div className="mt-10 border-t border-cream-line pt-7 sm:mt-12 sm:pt-8">
                  <p className="font-ui text-[11px] uppercase tracking-[1.32px] text-ink-muted">Related Experiments</p>
                  <div className="mt-4 space-y-3">
                    {relatedExperiments.map((exp) => (
                      <Link
                        key={exp.id}
                        to={`/experiments/${exp.slug}`}
                        className="group flex min-h-[44px] items-center justify-between gap-3 border-b border-cream-line py-2 pr-2 no-underline transition-[background-color,padding-left] duration-200 hover:bg-cream-line/70 lg:pl-3 lg:hover:pl-5"
                      >
                        <span className="min-w-0 flex-1 break-words pr-2 font-mono text-[12px] leading-[18px] text-ink sm:text-[13px] sm:leading-[19.5px]">[ {exp.id} ] {exp.title}</span>
                        <span className="font-mono text-[10px] text-ink-muted uppercase transition-colors duration-200 group-hover:text-ink sm:text-[11px]">{exp.status === 'active' ? 'ACTIVE' : 'COMPLETE'}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            <aside ref={tocRailRef} className="hidden lg:relative lg:block lg:h-full">
              <div ref={tocPanelRef} className="top-24 pr-1">
                <p className="font-mono text-[11px] uppercase tracking-[0.88px] text-ink-muted">In This Post</p>
                <nav className="mt-5 space-y-1.5">
                  {sectionOrder.map((section) => {
                    const active = activeSection === section.id
                    return (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        aria-current={active ? 'true' : undefined}
                        className={`group relative block rounded-[2px] py-1.5 pl-4 pr-2 transition-[padding-left,color,background-color] duration-200 hover:bg-cream-line/45 hover:pl-[18px] ${active ? 'text-ink' : 'text-ink-muted'}`}
                      >
                        {active ? (
                          <motion.span
                            layoutId="in-this-post-indicator"
                            className="absolute bottom-1.5 left-0 top-1.5 w-[2px] bg-accent-red"
                            transition={{ type: 'spring', stiffness: 420, damping: 34, mass: 0.5 }}
                          />
                        ) : null}

                        <motion.span
                          animate={{ x: active ? 2 : 0, opacity: active ? 1 : 0.86 }}
                          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                          className="block font-ui text-[13px] leading-[18.2px]"
                        >
                          {section.label}
                        </motion.span>
                      </a>
                    )
                  })}
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
