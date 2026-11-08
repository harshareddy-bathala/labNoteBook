import { experiments as allExperiments } from '../../.velite'

export type Experiment = typeof allExperiments[0]
// Ordered by id: EXP-001 is the project I rank highest, and so on down.
export const experiments = allExperiments
  .filter(e => e.published)
  .sort((a, b) => a.id.localeCompare(b.id))
export const getFeatured = () => experiments.find(e => e.featured)
export const getBySlug = (slug: string) => experiments.find(e => e.slug === slug)
export const getActive = () => experiments.filter(e => e.status === 'active')
export const getArchived = () => experiments.filter(e => e.status === 'archived')
