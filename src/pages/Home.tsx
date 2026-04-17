import { useMemo, useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import BlogCard from '../components/ui/BlogCard'
import LedgerRow from '../components/ui/LedgerRow'
import SectionHeader from '../components/ui/SectionHeader'
import StatusTag from '../components/ui/StatusTag'
import ScrollToTop from '../components/ui/ScrollToTop'
import { experiments, getActive, getFeatured } from '../data/experiments'
import { fieldwork, type FieldWork } from '../data/fieldwork'
import { observations } from '../data/observations'
import { useRevealOnce } from '../hooks/useRevealOnce'
import profileImage320 from '../assets/profile-320.webp'
import profileImage640 from '../assets/profile-640.webp'

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1]

type RevealSectionProps = {
  children: ReactNode
  className?: string
  id?: string
}

function RevealSection({ children, className = '', id }: RevealSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useRevealOnce(sectionRef, {
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.12,
  })

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      initial={isInView ? false : { opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.7, ease: easing }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

export default function Home() {
  const activeCount = getActive().length
  const publishedCount = observations.length

  const featuredFirstExperiments = useMemo(
    () =>
      [...experiments].sort((a, b) => {
        if (a.featured === b.featured) return b.year - a.year
        return a.featured ? -1 : 1
      }),
    []
  )

  const experimentPreview = featuredFirstExperiments.slice(0, 5)
  const featuredExperiment = getFeatured()
  const observationPreview = observations.slice(0, 4)
  const latestEntries = experiments.slice(0, 4)

  return (
    <main className="bg-cream-base text-ink overflow-x-hidden">
      {/* HERO INTRO */}
      <RevealSection className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-cream-base px-8 py-16 sm:px-10 sm:py-20 lg:px-20">
        <div className="pointer-events-none absolute left-1/2 top-14 h-56 w-[min(92vw,998px)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(200,75,49,0.14),rgba(245,240,232,0)_70%)]" />

        <div className="relative mx-auto grid w-full max-w-[998px] items-center gap-12 lg:grid-cols-[377px_minmax(0,461px)] lg:justify-center lg:gap-20">
          <div className="flex flex-col items-center gap-4">
            <div className="h-[min(16rem,80vw)] w-[min(16rem,80vw)] overflow-hidden rounded-[160px] border border-cream-line p-px sm:h-80 sm:w-80">
              <img
                src={profileImage640}
                srcSet={`${profileImage320} 320w, ${profileImage640} 640w`}
                sizes="(max-width: 640px) 80vw, 320px"
                alt="Harsha Reddy"
                width="640"
                height="640"
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="h-full w-full rounded-full object-cover border border-cream-line"
              />
            </div>
            <p className="text-center font-mono text-xs text-ink-muted">• Hyderabad, India</p>
          </div>

          <div className="mx-auto w-full max-w-[461px] lg:mx-0">
            <p className="font-mono text-[11px] uppercase tracking-[1.1px] text-ink-muted">
              FullStack Dev · DevOps · Cloud
            </p>

            <h1 className="mt-8 font-display text-[44px] leading-[1.08] text-ink sm:text-[52px] sm:leading-[57.2px]">
              Harsha Reddy
            </h1>

            <p className="mt-6 max-w-[34ch] font-body text-[16px] leading-[1.75] text-ink-muted sm:max-w-[408px] sm:text-[17px] sm:leading-[29.75px]">
              I build software as a research practice: turning rough hypotheses into shipped products,
              writing down what worked, and refining the next version with clearer intent.
            </p>

            <div className="mt-10 grid max-w-[430px] grid-cols-3">
              <div className="flex flex-col items-center gap-[6px] px-4 text-center">
                <p className="font-display text-[36px] leading-9 text-ink">{experiments.length}</p>
                <p className="font-mono text-[11px] leading-[16.5px] text-ink-muted">Experiments</p>
              </div>
              <div className="flex flex-col items-center gap-[6px] border-l border-cream-line px-4 text-center">
                <p className="font-display text-[36px] leading-9 text-ink">{observations.length}</p>
                <p className="font-mono text-[11px] leading-[16.5px] text-ink-muted">Observations</p>
              </div>
              <div className="flex flex-col items-center gap-[6px] border-l border-cream-line px-4 text-center">
                <p className="font-display text-[36px] leading-9 text-ink">{fieldwork.length}</p>
                <p className="font-mono text-[11px] leading-[16.5px] text-ink-muted">Field Work</p>
              </div>
            </div>

            <div className="mt-11 flex flex-col items-start gap-[9px] font-mono text-[11px] leading-[16.5px] text-ink-muted">
              <span>scroll to explore</span>
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="text-base leading-none text-accent-red"
              >
                ↓
              </motion.span>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* HERO HEADLINE */}
      <RevealSection className="bg-cream-base px-8 pb-20 sm:px-10 sm:pb-28 lg:px-20 lg:pb-24">
        <div className="mx-auto grid w-full max-w-[998px] gap-12 lg:grid-cols-[minmax(0,486px)_minmax(0,352px)] lg:items-start lg:justify-between lg:gap-16">
          <div className="max-w-[486px]">
            <p className="font-mono text-xs tracking-[0.6px] text-ink-muted">[ VOL. 01 — 2024–PRESENT ]</p>

            <h2 className="mt-6 font-display text-[44px] leading-[1.07] text-ink sm:text-[56px] sm:leading-[1.05] lg:text-[72px] lg:leading-[79.2px]">
              Building things
              <br />
              worth writing about.
            </h2>

            <p className="mt-6 max-w-[38ch] font-body text-[16px] leading-[1.72] text-ink-muted sm:max-w-[475px] sm:text-[18px] sm:leading-[30.6px]">
              This notebook tracks experiments, client work, and observations through one lens:
              build with intention, measure honestly, and share the learnings in public.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 sm:mt-9 sm:gap-8">
              <Link
                to="/experiments"
                className="border-b-2 border-accent-red pb-0.5 font-ui text-[15px] leading-[21px] text-ink transition-colors hover:text-accent-red"
              >
                → View Experiments
              </Link>
              <Link
                to="/observations"
                className="font-ui text-[15px] leading-[21px] text-ink-muted transition-colors hover:text-ink"
              >
                → Read Observations
              </Link>
            </div>
          </div>

          <div className="relative w-full overflow-hidden border border-cream-line bg-cream-surface p-5 sm:p-6">
            <div className="graph-paper pointer-events-none absolute inset-0 opacity-20" />

            <div className="relative">
              <p className="font-mono text-[11px] uppercase tracking-[0.88px] text-ink-muted">Latest Entries</p>
              <div className="mt-4 border-b border-cream-line" />

              <div className="mt-3 space-y-3">
                {latestEntries.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between gap-3">
                    <span className="shrink-0 font-mono text-[13px] leading-[19.5px] text-ink-muted">
                      [{entry.id}]
                    </span>
                    <span className="min-w-0 flex-1 truncate font-mono text-[13px] leading-[19.5px] text-ink">
                      {entry.title}
                    </span>
                    <StatusTag status={entry.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* EXPERIMENTS PREVIEW */}
      <RevealSection id="experiments" className="px-8 py-20 sm:px-10 sm:py-24 lg:px-14">
        <div className="w-full max-w-[1440px] mx-auto">
          <SectionHeader
            label={`[ ${experiments.length} documented · ${activeCount} active ]`}
            title="Experiments"
          />

          <div className="mt-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-cream-line" />
          </div>

          <div className="mt-6">
            {experimentPreview.map((experiment, index) => (
              <LedgerRow
                key={experiment.id}
                id={experiment.id}
                title={experiment.title}
                description={experiment.description}
                status={experiment.status}
                year={experiment.year}
                tags={experiment.stack.slice(0, 3)}
                href={`/experiments/${experiment.slug}`}
                index={index}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <Link to="/experiments" className="font-mono text-xs text-ink-muted hover:text-accent-red transition-colors">
              → View all
            </Link>
          </div>
        </div>
      </RevealSection>

      {/* FEATURED EXPERIMENT */}
      {featuredExperiment && (
        <RevealSection className="px-8 py-14 sm:px-10 sm:py-16 lg:px-14 lg:py-12">
          <div className="w-full max-w-[1440px] mx-auto">
            <article className="border border-cream-line bg-cream-surface p-6 sm:p-8 lg:p-16">
              <div className="grid gap-12 lg:grid-cols-2">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                    Featured Experiment
                  </p>
                  <h3 className="mt-4 font-display text-[38px] leading-[1.08] text-ink sm:text-5xl">{featuredExperiment.title}</h3>
                  <p className="mt-6 max-w-[42ch] font-body text-[15px] leading-[1.8] text-ink-muted sm:text-base sm:leading-relaxed">
                    {featuredExperiment.abstract}
                  </p>

                  <div className="mt-6 flex items-center gap-4">
                    <StatusTag status={featuredExperiment.status} />
                    <span className="font-mono text-xs text-ink-muted">{featuredExperiment.startDate}</span>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 font-ui text-sm">
                    <Link
                      to={`/experiments/${featuredExperiment.slug}`}
                      className="text-accent-red hover:text-ink transition-colors"
                    >
                      → View case file
                    </Link>
                    {featuredExperiment.githubUrl && (
                      <a
                        href={featuredExperiment.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink-muted hover:text-ink transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>

                {/* Placeholder Image Area */}
                <div className="relative aspect-video bg-cream-line flex items-center justify-center">
                  <span className="font-mono text-xs text-ink-muted">16:9 Preview</span>
                </div>
              </div>
            </article>
          </div>
        </RevealSection>
      )}

      {/* OBSERVATIONS PREVIEW */}
      <RevealSection id="observations" className="px-8 py-20 sm:px-10 sm:py-24 lg:px-14">
        <div className="w-full max-w-[1440px] mx-auto">
          <SectionHeader
            label={`[ ${publishedCount} published ]`}
            title="Observations"
          />

          <div className="mt-10 grid gap-x-16 md:grid-cols-2">
            {observationPreview.map((observation) => (
              <BlogCard
                key={observation.id}
                date={observation.date}
                title={observation.title}
                excerpt={observation.excerpt}
                readTime={observation.readTime}
                href={`/observations/${observation.slug}`}
                tags={observation.tags}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link to="/observations" className="font-mono text-xs text-ink-muted hover:text-accent-red transition-colors">
              → Read all observations
            </Link>
          </div>
        </div>
      </RevealSection>

      {/* FIELD WORK PREVIEW */}
      <RevealSection id="field-work" className="bg-cream-base px-8 py-20 sm:px-10 sm:py-24 lg:px-14">
        <div className="mx-auto w-full max-w-[998px]">
          <SectionHeader
            label={`[ ${fieldwork.length} engagements · confidential ]`}
            title="Field Work"
          />

          <div className="mt-10 grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-x-16 md:gap-y-16">
            {fieldwork.slice(0, 2).map((item: FieldWork) => (
              <article key={item.id} className="group flex flex-col gap-4">
                <div className="border border-cream-line bg-white p-px">
                  <div className="relative h-64 w-full overflow-hidden md:h-[256px]">
                    <div className="flex h-full w-full items-center justify-center bg-cream-line">
                      <span className="font-mono text-xs text-ink-muted">{item.id}</span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-ink/65 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <span className="font-mono text-xs uppercase tracking-[0.8px] text-cream-base">[restricted]</span>
                    </div>
                  </div>
                </div>

                <div className="flex min-h-[136px] flex-col">
                  <p className="font-mono text-[11px] uppercase leading-[16.5px] tracking-[0.44px] text-ink-muted">
                    {item.clientType} · {item.year}
                  </p>
                  <h3 className="mt-[10px] font-display text-[24px] leading-9 text-ink">{item.title}</h3>
                  <p className="mt-[6px] font-body text-[15px] leading-[22.5px] text-ink-muted">
                    {item.deliverable}
                  </p>

                  <Link
                    to={`/field-work/${item.slug}`}
                    className="mt-[14px] inline-flex items-center gap-[6px] font-mono text-xs leading-[18px] text-accent-red no-underline"
                  >
                    <span>→ View case study</span>
                    <span aria-hidden="true">↗</span>
                    <span>[restricted]</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <Link to="/field-work" className="font-mono text-xs text-ink-muted transition-colors hover:text-accent-red">
              → View all field engagements
            </Link>
          </div>
        </div>
      </RevealSection>

      {/* ABOUT STRIP */}
      <RevealSection id="about" className="mb-0 mt-24 bg-cream-surface px-8 py-16 sm:px-12 sm:py-20 lg:px-20 lg:py-[92px]">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="max-w-[760px] space-y-4 sm:space-y-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.88px] text-ink-muted">
                The Researcher
              </p>
              <h2 className="font-display text-[36px] leading-[1.14] text-ink sm:text-[50px] sm:leading-[1.08] lg:text-[60px] lg:leading-[1.06]">
                CS student. Full-stack builder.
                <br />
                Shipping things since 2023.
              </h2>
            </div>
            <Link
              to="/about"
              className="self-start font-mono text-[12px] leading-5 tracking-[0.35px] text-accent-red transition-colors hover:text-ink sm:text-[13px] lg:text-[14px]"
            >
              → Read the full profile
            </Link>
          </div>
        </div>
      </RevealSection>

      <ScrollToTop />
    </main>
  )
}
