// Writes public/sitemap.xml from the Velite output, so every project, post and
// case study is listed. Runs after `velite build` (see the prebuild script).
import { readFileSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'

const SITE = 'https://bathalaharsha.vercel.app'
const read = (name) => JSON.parse(readFileSync(new URL(`../.velite/${name}.json`, import.meta.url), 'utf8'))

let lastmod = new Date().toISOString().slice(0, 10)
try {
  lastmod = execFileSync('git', ['log', '-1', '--format=%cs'], { encoding: 'utf8' }).trim() || lastmod
} catch {
  // not a git checkout (e.g. a tarball build); fall back to today
}

const paths = [
  '/',
  '/about',
  '/experiments',
  ...read('experiments').filter((e) => e.published).map((e) => `/experiments/${e.slug}`),
  '/observations',
  ...read('observations').filter((o) => o.status === 'published').map((o) => `/observations/${o.slug}`),
  '/field-work',
  ...read('fieldwork').map((f) => `/field-work/${f.slug}`),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map((p) => `  <url><loc>${SITE}${p === '/' ? '' : p}</loc><lastmod>${lastmod}</lastmod></url>`)
  .join('\n')}
</urlset>
`
writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
console.log(`sitemap: ${paths.length} URLs`)
