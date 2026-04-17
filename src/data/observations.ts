import { observations as allObservations } from '../../.velite'

export type Observation = typeof allObservations[0]
export const observations = allObservations.filter(o => o.status === 'published')
export const getFeatured = () => observations.find(o => o.featured)
export const getBySlug = (slug: string) => observations.find(o => o.slug === slug)
