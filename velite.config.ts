import { defineConfig, defineCollection, s } from 'velite'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

const experiments = defineCollection({
  name: 'Experiment',
  pattern: 'content/experiments/**/*.mdx',
  schema: s.object({
    id: s.string(),           // "EXP-007"
    slug: s.slug('experiments'),
    title: s.string(),
    description: s.string(),
    status: s.enum(['active', 'paused', 'archived']),
    startDate: s.string(),
    year: s.number(),
    tags: s.array(s.string()),
    stack: s.array(s.string()),
    abstract: s.string(),
    figure: s.string().optional(),
    githubUrl: s.string().optional(),
    liveUrl: s.string().optional(),
    featured: s.boolean().default(false),
    published: s.boolean().default(true),
    restricted: s.boolean().default(false), // source is private: show [restricted], no repo link
    code: s.mdx(),
  }),
})

const observations = defineCollection({
  name: 'Observation',
  pattern: 'content/observations/**/*.mdx',
  schema: s.object({
    id: s.string(),           // "OBS-001"
    slug: s.slug('observations'),
    title: s.string(),
    excerpt: s.string(),
    date: s.string(),
    readTime: s.number(),
    tags: s.array(s.string()),
    status: s.enum(['published', 'draft']),
    featured: s.boolean().default(false),
    related: s.array(s.string()).default([]), // experiment ids, e.g. "EXP-001"
    toc: s.toc(),
    code: s.mdx(),
  }),
})

const fieldwork = defineCollection({
  name: 'FieldWork',
  pattern: 'content/fieldwork/**/*.mdx',
  schema: s.object({
    id: s.string(),           // "FW-001"
    slug: s.slug('fieldwork'),
    title: s.string(),
    clientType: s.string(),
    deliverable: s.string(),
    year: s.number(),
    tags: s.array(s.string()),
    restricted: s.boolean().default(true),
    coverColor: s.string().default('#E2D9CC'),
    code: s.mdx(),
  }),
})

export default defineConfig({
  root: 'src',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6][ext]',
    clean: true,
  },
  collections: { experiments, observations, fieldwork },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, {
        theme: 'github-dark',
        keepBackground: false,
      }],
    ],
  },
})