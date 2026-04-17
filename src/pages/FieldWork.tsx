import { Link } from 'react-router-dom'
import { fieldwork, type FieldWork as FieldWorkType } from '../data/fieldwork'
import EmptyState from '../components/ui/EmptyState'
import { usePageMeta } from '../hooks/usePageMeta'

const linkArrowPath = 'M5 0V12M5 0L9 4M5 0L1 4'

export default function FieldWork() {
  usePageMeta({
    title: 'Field Work',
    description: 'Professional client engagements and case studies.',
  })

  return (
    <main className="overflow-x-hidden bg-cream-base text-ink">
      <section className="mx-auto w-full max-w-[1160px] px-8 pb-16 pt-20 sm:px-10 sm:pb-20 sm:pt-24 lg:px-14 lg:pb-24 xl:px-16">
        <div className="mb-10 sm:mb-12">
          <h1 className="font-display text-[46px] leading-[1.02] tracking-tight text-ink sm:text-[56px] sm:leading-[61.6px]">
            Field Work
          </h1>
          <p className="mt-4 font-mono text-[12px] leading-[18px] text-ink-muted sm:text-[13px] sm:leading-[19.5px]">
            [ {fieldwork.length} engagements · confidential ]
          </p>
        </div>

        {fieldwork.length > 0 ? (
          <div className="grid grid-cols-1 gap-12 sm:gap-16 md:grid-cols-2 md:gap-x-16 md:gap-y-16">
            {fieldwork.map((engagement: FieldWorkType) => (
              <article key={engagement.id} className="group flex flex-col gap-5">
                <div className="border border-cream-line bg-white p-px">
                  <div className="relative h-56 w-full overflow-hidden sm:h-64 md:h-[256px]">
                    <div 
                      className="flex h-full w-full items-center justify-center"
                      style={{ backgroundColor: engagement.coverColor }}
                    >
                      <span className="font-mono text-xs text-ink-muted">{engagement.id}</span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-ink/65 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <span className="font-mono text-xs uppercase tracking-[0.8px] text-cream-base">[restricted]</span>
                    </div>
                  </div>
                </div>

                <div className="flex min-h-0 flex-col sm:min-h-[136px]">
                  <p className="font-mono text-[11px] uppercase leading-[16.5px] tracking-[0.44px] text-ink-muted">
                    {engagement.clientType} · {engagement.year}
                  </p>

                  <h2 className="mt-[10px] font-display text-[22px] leading-[1.25] text-ink sm:text-[24px] sm:leading-9">
                    {engagement.title}
                  </h2>

                  <p className="mt-[6px] max-w-[44ch] font-body text-[15px] leading-[1.6] text-ink-muted">
                    {engagement.deliverable}
                  </p>

                  <Link
                    to={`/field-work/${engagement.slug}`}
                    className="mt-3 inline-flex min-h-[44px] items-center gap-[6px] font-mono text-[12px] leading-[18px] text-accent-red no-underline"
                  >
                    <span>→ View case study</span>
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
                      <path d={linkArrowPath} stroke="currentColor" strokeWidth="0.8" />
                    </svg>
                    {engagement.restricted && <span>[restricted]</span>}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            id="[ NO FIELD WORK ]"
            label="Nothing here yet"
            message="Field work entries will appear here"
            hint="Add an .mdx file to src/content/fieldwork/ to get started"
          />
        )}
      </section>
    </main>
  )
}
