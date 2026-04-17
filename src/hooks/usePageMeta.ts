import { useEffect } from 'react'

const SITE_NAME = 'The Lab Notebook'

type UsePageMetaOptions = {
  title?: string
  description?: string
}

/**
 * Updates document title and meta description for SEO.
 * Title format: "Page Title | The Lab Notebook" or just "The Lab Notebook" for home.
 */
export function usePageMeta({ title, description }: UsePageMetaOptions = {}) {
  useEffect(() => {
    // Update document title
    const previousTitle = document.title
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    const previousDescription = metaDescription?.getAttribute('content') ?? ''
    
    if (description) {
      if (!metaDescription) {
        metaDescription = document.createElement('meta')
        metaDescription.setAttribute('name', 'description')
        document.head.appendChild(metaDescription)
      }
      metaDescription.setAttribute('content', description)
    }

    // Cleanup on unmount
    return () => {
      document.title = previousTitle
      if (metaDescription && previousDescription) {
        metaDescription.setAttribute('content', previousDescription)
      }
    }
  }, [title, description])
}
