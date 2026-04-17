/**
 * Design Tokens
 * Extracted from Figma design system (March 27, 2026)
 * These tokens are also configured in tailwind.config.js for Tailwind utility classes
 */

// Color Tokens
export const colors = {
  // Text
  text: {
    primary: 'text-ink',         // Dark text for primary content
    secondary: 'text-ink-muted', // Muted gray for secondary content
    light: 'text-cream-base',    // Light text on dark backgrounds
  },
  
  // Backgrounds
  bg: {
    page: 'bg-white',          // Base page background
    section: 'bg-cream-base',  // Warm cream sections
    card: 'bg-cream-surface',  // Off-white cards and callouts
    code: 'bg-ink',            // Dark background for code blocks
  },
  
  // Borders & Dividers
  border: {
    light: 'border-cream-line', // Default borders and dividers
    dark: 'border-ink-dark',    // Code block borders
  },
  
  // Accent & Status
  accent: 'text-accent-red',  // Burnt orange for links, highlights
  status: {
    active: 'text-accent-green', // Muted green for active/published states
    success: 'text-accent-green',
  },
} as const;

// Typography Tokens
export const typography = {
  fontFamily: {
    display: '"Instrument Serif", serif',     // Headings, display
    body: 'Lora, serif',                       // Body text
    mono: '"JetBrains Mono", monospace',       // Code, labels
    ui: '"DM Sans", sans-serif',               // UI elements, buttons
  },
  
  // Font Size Scales (px)
  fontSize: {
    display: {
      lg: 72,
      md: 64,
      sm: 56,
      xs: 52,
    },
    heading: {
      lg: 48,
      md: 40,
      sm: 32,
      xs: 22,
    },
    body: {
      lg: 19,
      md: 18,
      base: 17,
      sm: 16,
      xs: 15,
    },
    label: {
      lg: 14,
      md: 13,
      sm: 12,
      xs: 11,
      '2xs': 10,
    },
  },
  
  // Line Heights (px)
  lineHeight: {
    display: {
      lg: '79.2px',  // 72px size
      md: '70.4px',  // 64px size
      sm: '64.4px',  // 56px size
      xs: '57.2px',  // 52px size
    },
    heading: {
      lg: '55.2px',  // 48px size
      md: '48px',    // 40px size
      sm: '38.4px',  // 32px size
      xs: '33px',    // 22px size
    },
    body: {
      lg: '34.2px',  // 19px size
      md: '31.5px',  // 18px size
      base: '30.6px', // 17px size
      sm: '28px',    // 16px size
      xs: '26.25px', // 15px size
    },
    label: {
      lg: '21px',    // 14px size
      md: '19.5px',  // 13px size
      sm: '18px',    // 12px size
      xs: '16.5px',  // 11px size
      '2xs': '15px', // 10px size
    },
  },
  
  // Letter Spacing (px)
  letterSpacing: {
    tight: '-0.2px',
    normal: '0.14px',
    wide: '0.44px',
    wider: '0.52px',
    widest: '1.1px',
    widest2: '1.32px',
  },
} as const;

// Spacing Tokens (px)
export const spacing = {
  // Page & Section
  pagePad: 80,
  sectionGap: 80,
  
  // Layout Spacing
  section: {
    lg: 80,
    md: 64,
    sm: 48,
    xs: 32,
  },
  
  // Element Spacing
  gap: {
    lg: 32,
    md: 24,
    sm: 16,
    xs: 12,
    '2xs': 6,
  },
} as const;

// Border Tokens
export const borders = {
  width: {
    thin: '1px',
    thick: '2px',
    thickLg: '3px',
  },
  
  radius: {
    circle: '999px',
    photo: '120px',
    photoLg: '160px',
    sharp: '0px',
    smRounded: '2px',
  },
} as const;

// Component Presets
export const components = {
  navbar: {
    height: 64,
    paddingHorizontal: 56,
    borderColorClass: colors.border.light,
    gap: 403,
  },
  
  card: {
    surfaceClass: `${colors.bg.card} border ${colors.border.light}`,
    padding: 48,
  },
  
  tag: {
    height: 23,
    padding: '10px',
    className: `rounded-full border ${colors.border.light}`,
  },
  
  codeBlock: {
    className: `${colors.bg.code} border ${colors.border.dark}`,
    padding: 24,
    borderRadius: '2px',
  },
  
  callout: {
    borderLeftClass: `border-l-4 border-accent-red`,
    paddingLeft: 27,
  },
} as const;

// Responsive Breakpoints (based on container width)
export const containers = {
  full: '998px',
  sidebar: '220px',
  contentMain: '538px',
  contentLarge: '680px',
  columnTwo: {
    left: '486px',
    right: '351px',
    gap: '64px',
  },
} as const;

export type ColorToken = typeof colors;
export type TypographyToken = typeof typography;
export type SpacingToken = typeof spacing;
export type BorderToken = typeof borders;
