export type Achievement = {
  title: string
  issuer: string
  date: string
  href?: string
}

export const achievements: Achievement[] = [
  {
    title: '1st Prize, Flux of Nature hackathon',
    issuer: 'Jain University, Bengaluru',
    date: 'Apr 2026',
  },
  {
    title: 'Round 2 of 3, Government of Karnataka hackathon (Alisu)',
    issuer: 'HackerEarth',
    date: '2026',
  },
  {
    title: 'Exhibitor with NetWatch, CII Innoverge 2026',
    issuer: 'CII, Bengaluru',
    date: '2026',
  },
  {
    title: 'AWS Cloud Operations',
    issuer: 'Amazon Web Services',
    date: 'Jul 2026',
    href: 'https://www.credly.com/badges/9e1085b8-8ea6-43d1-9d88-ffcaac330e0b',
  },
  {
    title: 'CCNA: Enterprise Networking and Security',
    issuer: 'Cisco',
    date: 'Sep 2025',
  },
  {
    title: 'OCI Generative AI Professional',
    issuer: 'Oracle',
    date: 'Oct 2025',
  },
  {
    title: 'OCI Data Science',
    issuer: 'Oracle',
    date: 'Oct 2025',
  },
]
