module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: { base: '#F5F0E8', surface: '#FDFAF4', line: '#E2D9CC' },
        ink: { DEFAULT: '#1A1612', muted: '#6B5F52', dark: '#2E2A26', deep: '#4A453F' },
        accent: { red: '#C84B31', green: '#3D5A47' },
        bg: {
          page: '#FFFFFF',
          section: '#F5F0E8',
          card: '#FDFAF4',
          code: '#1A1612',
        },
        border: {
          light: '#E2D9CC',
          dark: '#2E2A26',
        },
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'serif'],
        body: ['Lora', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        ui: ['"DM Sans"', 'sans-serif'],
      },
      fontSize: {
        // Display sizes
        'display-lg': ['72px', { lineHeight: '79.2px', letterSpacing: '-0.2px' }],
        'display-md': ['64px', { lineHeight: '70.4px' }],
        'display-sm': ['56px', { lineHeight: '64.4px' }],
        'display-xs': ['52px', { lineHeight: '57.2px' }],
        // Heading sizes
        'heading-lg': ['48px', { lineHeight: '55.2px' }],
        'heading-md': ['40px', { lineHeight: '48px' }],
        'heading-sm': ['32px', { lineHeight: '38.4px' }],
        'heading-xs': ['22px', { lineHeight: '33px' }],
        // Body sizes
        'body-lg': ['19px', { lineHeight: '34.2px' }],
        'body-md': ['18px', { lineHeight: '31.5px' }],
        'body-base': ['17px', { lineHeight: '30.6px' }],
        'body-sm': ['16px', { lineHeight: '28px' }],
        'body-xs': ['15px', { lineHeight: '26.25px' }],
        // Label/UI sizes
        'label-lg': ['14px', { lineHeight: '21px', letterSpacing: '0.14px' }],
        'label-md': ['13px', { lineHeight: '19.5px' }],
        'label-sm': ['12px', { lineHeight: '18px' }],
        'label-xs': ['11px', { lineHeight: '16.5px' }],
        'label-2xs': ['10px', { lineHeight: '15px' }],
      },
      spacing: {
        // Page padding
        'page-pad': '80px',
        // Section spacing
        'section-lg': '80px',
        'section-md': '64px',
        'section-sm': '48px',
        'section-xs': '32px',
        // Element spacing
        'gap-lg': '32px',
        'gap-md': '24px',
        'gap-sm': '16px',
        'gap-xs': '12px',
        'gap-2xs': '6px',
      },
      borderRadius: {
        circle: '999px',
        photo: '120px',
        'photo-lg': '160px',
        sharp: '0px',
        'sm-rounded': '2px',
      },
      borderWidth: {
        'thin': '1px',
        'thick': '2px',
        'thick-lg': '3px',
      },
      lineHeight: {
        // Display line heights
        72: '79.2px',
        70: '70.4px',
        64: '64.4px',
        57: '57.2px',
        // Heading line heights
        55: '55.2px',
        48: '48px',
        38: '38.4px',
        33: '33px',
        // Body line heights
        34: '34.2px',
        31: '31.5px',
        30: '30.6px',
        28: '28px',
        26: '26.25px',
        // Label line heights
        21: '21px',
        19: '19.5px',
        18: '18px',
        16: '16.5px',
        15: '15px',
      },
      letterSpacing: {
        tight: '-0.2px',
        tightest: '-0.2px',
        normal: '0.14px',
        wide: '0.44px',
        wider: '0.52px',
        widest: '1.1px',
        widest2: '1.32px',
      },
    },
  },
}
