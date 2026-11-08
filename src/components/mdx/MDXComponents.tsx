import type { MDXComponents } from 'mdx/types'

export const mdxComponents: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2
      className="mt-12 font-display text-[28px] leading-[1.12] text-ink sm:mt-14 sm:text-[32px] sm:leading-[48px]"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mt-9 font-ui text-[16px] uppercase tracking-[0.8px] text-ink sm:mt-10 sm:text-[18px] sm:tracking-[0.9px]"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p
      className="mt-5 font-body text-[16px] leading-[1.72] text-ink sm:text-[17px] sm:leading-[30.6px]"
      {...props}
    >
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mt-5 list-disc space-y-2 pl-6 marker:text-accent-red" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mt-5 list-decimal space-y-2 pl-6 marker:font-mono marker:text-accent-red" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li
      className="pl-1 font-body text-[16px] leading-[1.72] text-ink sm:text-[17px] sm:leading-[30.6px]"
      {...props}
    >
      {children}
    </li>
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-accent-red underline decoration-accent-red/40 underline-offset-4 transition-colors hover:text-ink [overflow-wrap:anywhere]"
      {...(href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {children}
    </a>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-ink" {...props}>
      {children}
    </strong>
  ),
  table: ({ children, ...props }) => (
    <div className="mt-6 overflow-x-auto border border-cream-line">
      <table className="w-full border-collapse text-left" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th
      className="border-b border-cream-line bg-cream-surface px-4 py-3 font-mono text-[11px] font-normal uppercase tracking-[0.88px] text-ink-muted"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border-b border-cream-line px-4 py-3 align-top font-body text-[15px] leading-[1.6] text-ink last:border-b-0" {...props}>
      {children}
    </td>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="mt-9 border-l-[3px] border-accent-red bg-cream-surface px-5 py-5 sm:mt-10 sm:pl-[27px] sm:pr-6 sm:py-6"
      {...props}
    >
      {children}
    </blockquote>
  ),
  pre: ({ children, ...props }) => (
    <div className="mt-5 max-w-full overflow-hidden rounded-[2px] border border-ink-dark bg-ink px-4 py-5 sm:px-6 sm:py-6">
      <pre
        className="max-w-full overflow-x-auto font-mono text-[13px] leading-[22px] text-cream-base sm:text-[14px] sm:leading-[23.8px] [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit"
        {...props}
      >
        {children}
      </pre>
    </div>
  ),
  code: ({ children, ...props }) => (
    <code
      className="inline rounded-[3px] border border-cream-line bg-cream-surface px-[6px] py-[2px] font-mono text-[13px] leading-[22px] text-accent-red sm:text-[14px] sm:leading-[25.2px]"
      {...props}
    >
      {children}
    </code>
  ),
  img: ({ src, alt, ...props }) => (
    <figure className="mt-8">
      <div className="overflow-hidden border border-cream-line">
        <img
          src={src}
          alt={alt}
          className="w-full"
          {...props}
        />
      </div>
      {alt && (
        <figcaption className="mt-2 font-mono text-[11px] italic leading-[16.5px] text-ink-muted sm:text-[12px] sm:leading-[18px]">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
}
