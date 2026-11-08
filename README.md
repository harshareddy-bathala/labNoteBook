# The Lab Notebook

Personal site of Harshavardhan Reddy: ranked projects, written-up lessons and client work.
Live at https://bathalaharsha.vercel.app

## Stack

Vite, React 19, TypeScript, React Router, Tailwind, Framer Motion. Content is MDX compiled
by [Velite](https://velite.js.org) into typed data at build time.

## Content

| Section | Where | Notes |
| --- | --- | --- |
| Experiments (projects) | `src/content/experiments/*.mdx` | `id` is the rank: `EXP-001` is first. `restricted: true` marks a private repo and shows `[restricted]`. |
| Observations (posts) | `src/content/observations/*.mdx` | `related` lists experiment ids to link. |
| Field Work | `src/content/fieldwork/*.mdx` | `restricted` defaults to `true`; set it explicitly. |
| Achievements | `src/data/achievements.ts` | Shown on About. |
| Links, email, resume | `src/data/profile.ts` | Single source for Navbar, Footer and About. |
| Also built | `src/data/alsoBuilt.ts` | Small projects without a write-up. |

The resume is `public/Harshavardhan-Reddy-Resume.pdf`.

## Develop

```bash
npm install --ignore-scripts   # see note below
npm run dev
npm run lint
npm run build                  # velite build, sitemap, tsc, vite build
```

`sharp` is only used by `scripts/optimize-image.js` and `scripts/generate-og.js`. If
`npm install` fails while building it from source, `--ignore-scripts` installs its
prebuilt binaries without running the failing step.

`npm run build` regenerates `public/sitemap.xml` from the content. `node scripts/generate-og.js`
re-renders `public/og.png`.
