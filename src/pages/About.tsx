import { useRef, useState, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { currently } from '../data/currently'
import { achievements } from '../data/achievements'
import { profile } from '../data/profile'
import { usePageMeta } from '../hooks/usePageMeta'
import profileImage from '../assets/profile.webp'

const education = [
  {
    year: '2024-27',
    degree: 'Diploma, Computer Technology and IT Infrastructure',
    institution: 'NTTF NEC, Bangalore',
    score: 'CGPA 9.38 · Rank 1',
  },
  {
    year: '2023-24',
    degree: '10th Standard',
    institution: 'Kadiri, Andhra Pradesh',
    score: '97.8%',
  },
]

const toolkit = [
  { category: 'Languages', items: 'TypeScript/JavaScript · Python · C/C++ · Java · SQL · Bash' },
  { category: 'Frontend', items: 'React · Next.js (App Router) · Vite · Tailwind · TanStack Query · Framer Motion' },
  { category: 'Backend', items: 'FastAPI · Node.js · Fastify · Hono · Flask · WebSockets · Server-Sent Events · Zod' },
  { category: 'Databases', items: 'PostgreSQL · TimescaleDB · Supabase · MongoDB · Prisma · Redis · SQLite' },
  { category: 'Tools', items: 'Docker · Git · GitHub Actions · Playwright · Vercel · Cloudflare · AWS · Linux · Prometheus · Grafana' },
]

const coursework = [
  'Data Structures & Algorithms',
  'Operating Systems',
  'Computer Networks',
  'Database Systems',
  'Database Administration',
  'Object-Oriented Programming',
  'Software Testing',
  'Cloud Computing',
  'DevOps',
  'Cyber Security',
]

const correspondence = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, action: 'copy' as const },
  { label: 'GitHub', value: profile.github.label, href: profile.github.href, action: 'visit' as const },
  { label: 'LinkedIn', value: profile.linkedin.label, href: profile.linkedin.href, action: 'visit' as const },
  { label: 'Instagram', value: profile.instagram.label, href: profile.instagram.href, action: 'visit' as const },
  { label: 'Resume', value: 'Harshavardhan-Reddy-Resume.pdf', href: profile.resume.href, action: 'download' as const },
]

type RevealSectionProps = {
  children: ReactNode
  className?: string
  delay?: number
}

function RevealSection({ children, className = '', delay = 0 }: RevealSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.section
      ref={sectionRef}
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      animate={isInView || shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

export default function About() {
  usePageMeta({
    title: 'About',
    description: 'About Harshavardhan Reddy: full-stack developer and CS student in Bangalore. Education, achievements, toolkit and contact.',
  })

  const [showCopiedToast, setShowCopiedToast] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
    } catch {
      return
    }

    setShowCopiedToast(true)
    window.setTimeout(() => setShowCopiedToast(false), 2000)
  }

  return (
    <div className="overflow-x-hidden bg-cream-base text-ink">
      <RevealSection className="w-full border-b border-cream-line bg-cream-base px-8 pt-9 pb-14 sm:px-10 sm:pt-11 sm:pb-16 lg:px-20 lg:pt-12 lg:pb-28">
        <div className="mx-auto w-full max-w-[998px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.88px] text-ink-muted">
            Profile - Researcher No. 001
          </p>
          <h1 className="mt-4 font-display text-[46px] leading-[0.98] text-ink sm:text-[64px] sm:leading-[1] lg:text-[72px] lg:leading-[79.2px]">
            About
          </h1>

          <div className="mt-6 border-b border-cream-line" />

          <div className="mt-8 grid items-start gap-9 sm:gap-10 lg:grid-cols-[293px_minmax(0,545px)] lg:gap-20">
            <div className="flex justify-center lg:justify-start">
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                className="h-[min(15rem,72vw)] w-[min(15rem,72vw)] overflow-hidden rounded-[120px] sm:h-60 sm:w-60"
              >
                <img
                  src={profileImage}
                  alt={profile.name}
                  width="400"
                  height="400"
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  className="h-full w-full rounded-full object-cover border border-cream-line"
                />
              </motion.div>
            </div>

            <div className="max-w-[545px]">
              <p className="font-mono text-[13px] leading-[19.5px] text-ink-muted">
                Based in {profile.location}
              </p>
              <h2 className="mt-3 font-display text-[36px] leading-[1.12] text-ink sm:text-[48px] sm:leading-[55.2px]">
                Full-stack developer. Systems minded.
              </h2>
              <p className="mt-6 max-w-[56ch] font-body text-[16px] leading-[1.75] text-ink sm:text-[18px] sm:leading-[31.5px]">
                I ship React and Next.js frontends against Python and Node.js APIs backed by
                PostgreSQL, and I like owning a feature from protocol and schema through to
                deployment. I am studying Computer Technology and IT Infrastructure at NTTF NEC,
                Bangalore (2024-27), ranked first in my class. Open to a part-time remote
                internship now and a full-time one from January 2027.
              </p>
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="w-full bg-cream-surface px-8 py-12 sm:px-10 sm:py-14 lg:px-20 lg:py-16" delay={0.03}>
        <div className="mx-auto w-full max-w-[998px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.88px] text-ink-muted">Education</p>
          <div className="mt-8 border-t border-cream-line">
            {education.map((entry) => (
              <article key={entry.year} className="border-b border-cream-line py-5">
                <div className="flex items-center justify-between gap-3 lg:hidden">
                  <p className="font-mono text-[11px] leading-[16px] text-ink-muted">{entry.year}</p>
                  <p className="font-mono text-[11px] leading-[16px] text-ink">{entry.score}</p>
                </div>
                <h3 className="mt-2 font-display text-[20px] leading-[1.25] text-ink sm:text-[22px] sm:leading-[33px] lg:hidden">
                  {entry.degree}
                </h3>
                <p className="mt-1 font-body text-[15px] leading-[1.6] text-ink-muted lg:hidden">
                  {entry.institution}
                </p>

                <div className="hidden items-center lg:grid lg:min-h-[74px] lg:grid-cols-[80px_1fr_1fr_70px] lg:gap-5">
                  <p className="font-mono text-xs text-ink-muted">{entry.year}</p>
                  <h3 className="font-display text-[22px] leading-[33px] text-ink">{entry.degree}</h3>
                  <p className="font-body text-[15px] leading-[22.5px] text-ink-muted">{entry.institution}</p>
                  <p className="justify-self-end font-mono text-xs text-ink">{entry.score}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="w-full bg-cream-base px-8 py-12 sm:px-10 sm:py-14 lg:px-20 lg:py-16" delay={0.05}>
        <div className="mx-auto w-full max-w-[998px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.88px] text-ink-muted">Achievements &amp; Certifications</p>
          <div className="mt-8 border-t border-cream-line">
            {achievements.map((entry) => (
              <article key={entry.title} className="border-b border-cream-line py-5">
                <div className="flex items-center justify-between gap-3 lg:hidden">
                  <p className="font-mono text-[11px] leading-[16px] text-ink-muted">{entry.issuer}</p>
                  <p className="font-mono text-[11px] leading-[16px] text-ink">{entry.date}</p>
                </div>
                <h3 className="mt-2 font-display text-[20px] leading-[1.25] text-ink sm:text-[22px] sm:leading-[33px] lg:hidden">
                  {entry.href ? (
                    <a href={entry.href} target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-accent-red underline-offset-4">
                      {entry.title}
                    </a>
                  ) : (
                    entry.title
                  )}
                </h3>

                <div className="hidden items-center lg:grid lg:min-h-[74px] lg:grid-cols-[1fr_220px_90px] lg:gap-5">
                  <h3 className="font-display text-[22px] leading-[33px] text-ink">
                    {entry.href ? (
                      <a href={entry.href} target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-accent-red underline-offset-4">
                        {entry.title}
                      </a>
                    ) : (
                      entry.title
                    )}
                  </h3>
                  <p className="font-body text-[15px] leading-[22.5px] text-ink-muted">{entry.issuer}</p>
                  <p className="justify-self-end font-mono text-xs text-ink">{entry.date}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="w-full bg-cream-surface px-8 py-12 sm:px-10 sm:py-14 lg:px-20 lg:py-16" delay={0.07}>
        <div className="mx-auto w-full max-w-[998px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.88px] text-ink-muted">Toolkit</p>
          <div className="mt-8 border-t border-cream-line">
            {toolkit.map((entry) => (
              <div
                key={entry.category}
                className="border-b border-cream-line py-4 lg:grid lg:min-h-[57px] lg:grid-cols-[120px_minmax(0,1fr)] lg:items-center lg:gap-12"
              >
                <p className="font-mono text-[13px] uppercase tracking-[0.52px] text-ink-muted">
                  {entry.category}
                </p>
                <p className="mt-1 font-body text-[15px] leading-[1.65] text-ink lg:mt-0">{entry.items}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="w-full bg-cream-base px-8 py-12 sm:px-10 sm:py-14 lg:px-20 lg:py-16" delay={0.09}>
        <div className="mx-auto w-full max-w-[998px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.88px] text-ink-muted">
            Relevant Coursework
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {coursework.map((course) => (
              <span
                key={course}
                className="border border-cream-line px-3.5 py-2 font-ui text-[12px] leading-[18px] text-ink transition-colors duration-200 hover:bg-cream-base sm:px-4 sm:text-[13px] sm:leading-[19.5px]"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="w-full bg-cream-surface px-8 py-12 sm:px-10 sm:py-14 lg:px-20 lg:py-16" delay={0.11}>
        <div className="mx-auto w-full max-w-[760px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.88px] text-ink-muted">Currently</p>
          <div className="mt-8 border-t border-cream-line">
            {[
              ['Building', currently.building],
              ['Reading', currently.reading],
              ['Thinking about', currently.thinking],
            ].map(([label, value]) => (
              <div
                key={label}
                className="border-b border-cream-line py-4 lg:grid lg:min-h-[52px] lg:grid-cols-[120px_minmax(0,1fr)] lg:items-start lg:gap-8"
              >
                <p className="font-mono text-[13px] leading-[19.5px] text-ink-muted">{label}</p>
                <p className="mt-1 break-words font-body text-[15px] leading-[1.65] text-ink lg:mt-0">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="w-full bg-cream-base px-8 py-12 sm:px-10 sm:py-14 lg:px-20 lg:py-16" delay={0.13}>
        <div className="mx-auto w-full max-w-[760px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.88px] text-ink-muted">Correspondence</p>
          <div className="mt-8 border-t border-cream-line">
            {correspondence.map((item) => (
              <div
                key={item.label}
                className="border-b border-cream-line py-4 lg:grid lg:min-h-[52px] lg:grid-cols-[80px_minmax(0,1fr)_64px] lg:items-center lg:gap-8"
              >
                <p className="font-mono text-[13px] leading-[19.5px] text-ink-muted">{item.label}</p>
                <p className="mt-1 break-words font-body text-[15px] leading-[1.6] text-ink lg:mt-0">
                  {item.value}
                </p>
                {item.action === 'copy' ? (
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="mt-2 inline-flex min-h-[44px] items-center font-mono text-[12px] leading-[18px] text-accent-red text-left transition-colors duration-200 hover:text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-red lg:mt-0"
                  >
                    → Copy
                  </button>
                ) : (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex min-h-[44px] items-center font-mono text-[12px] leading-[18px] text-accent-red no-underline transition-colors duration-200 hover:text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-red lg:mt-0"
                  >
                    {item.action === 'download' ? '→ Open' : '→ Visit'}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <div
        className={`fixed right-4 top-20 z-50 border border-cream-line bg-cream-surface px-4 py-2 font-mono text-xs text-ink shadow-sm transition-all duration-200 sm:right-6 ${
          showCopiedToast ? 'translate-y-0 opacity-100' : '-translate-y-2 pointer-events-none opacity-0'
        }`}
        role="status"
        aria-live="polite"
      >
        Copied!
      </div>
    </div>
  )
}
