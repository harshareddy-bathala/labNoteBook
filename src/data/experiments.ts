import { experiments as allExperiments } from '../../.velite'

export type Experiment = typeof allExperiments[0]
export const experiments = allExperiments.filter(e => e.published)
export const getFeatured = () => experiments.find(e => e.featured)
export const getBySlug = (slug: string) => experiments.find(e => e.slug === slug)
export const getActive = () => experiments.filter(e => e.status === 'active')
export const getArchived = () => experiments.filter(e => e.status === 'archived')
