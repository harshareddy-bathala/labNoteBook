import { fieldwork as allFieldwork } from '../../.velite'

export type FieldWork = typeof allFieldwork[0]
export const fieldwork = allFieldwork
export const getBySlug = (slug: string) => fieldwork.find(f => f.slug === slug)
