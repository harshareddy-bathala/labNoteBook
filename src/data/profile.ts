export const profile = {
  name: 'Harshavardhan Reddy',
  siteUrl: 'https://bathalaharsha.vercel.app',
  email: 'harshareddy.bathala@gmail.com',
  location: 'Bangalore, India',
  github: { label: 'harshareddy-bathala', href: 'https://github.com/harshareddy-bathala' },
  linkedin: { label: 'harshareddy19', href: 'https://www.linkedin.com/in/harshareddy19/' },
  instagram: { label: 'soltrlx', href: 'https://instagram.com/soltrlx' },
  resume: { label: 'Resume (PDF)', href: '/Harshavardhan-Reddy-Resume.pdf' },
} as const

export const socialLinks = [
  { label: 'Email', href: `mailto:${profile.email}` },
  { label: 'GitHub', href: profile.github.href },
  { label: 'LinkedIn', href: profile.linkedin.href },
  { label: 'Instagram', href: profile.instagram.href },
  { label: 'Resume', href: profile.resume.href },
]
