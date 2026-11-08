import { useEffect } from 'react'
import { profile } from '../data/profile'

const SITE_NAME = 'The Lab Notebook'
const DEFAULT_DESCRIPTION = `${profile.name}: full-stack developer and CS student in Bangalore. Ranked projects, written-up lessons and client work.`

type UsePageMetaOptions = {
  title?: string
  description?: string
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Updates the document title, description, canonical URL and the Open Graph and
 * Twitter tags for the current route. Title format: "Page | The Lab Notebook".
 * Crawlers that do not run JavaScript still get the defaults from index.html.
 */
export function usePageMeta({ title, description }: UsePageMetaOptions = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${profile.name} | ${SITE_NAME}`
    const desc = description ?? DEFAULT_DESCRIPTION
    const url = `${profile.siteUrl}${window.location.pathname === '/' ? '' : window.location.pathname}`

    document.title = fullTitle
    setMeta('name', 'description', desc)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:url', url)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', desc)
    setCanonical(url)
  }, [title, description])
}
