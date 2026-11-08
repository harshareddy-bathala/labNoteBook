export type AlsoBuilt = {
  name: string
  note: string
  href?: string // omitted for private repositories
}

export const alsoBuilt: AlsoBuilt[] = [
  {
    name: 'AuraType',
    note: 'Browser extension for autocomplete that runs entirely on the device.',
    href: 'https://github.com/harshareddy-bathala/auraType',
  },
  {
    name: 'Medium Clone',
    note: 'Blogging app on Hono, Cloudflare Workers, Prisma and PostgreSQL with JWT auth.',
    href: 'https://github.com/harshareddy-bathala/MediumClone',
  },
  {
    name: 'whatif',
    note: 'Chat assistant that answers from the risk and downsides perspective.',
    href: 'https://github.com/harshareddy-bathala/whatif',
  },
  {
    name: 'Movie Picker',
    note: 'Genre-based recommendations with a Gemini mode and an offline fallback.',
    href: 'https://github.com/harshareddy-bathala/moviePicker',
  },
  {
    name: 'DevOS',
    note: 'Desktop developer workspace, specified and prototyped with Tauri.',
    href: 'https://github.com/harshareddy-bathala/devos',
  },
  {
    name: 'DevArchiv',
    note: 'Knowledge base where students document project journeys. Private.',
  },
  {
    name: 'RandoRoute',
    note: 'Random-destination travel app with fuel-cost estimates, Flask and React Native. Private.',
  },
]
