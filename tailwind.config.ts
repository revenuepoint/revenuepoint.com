import type { Config } from 'tailwindcss';

/**
 * RevenuePoint — Direction A · Editorial design system.
 * Crimson is locked. Navy #0F1A2B is the supporting accent.
 * No green in this system; on-track signals use navy.
 *
 * Custom screens align to the Direction A specimen breakpoints
 * (600/760/880/980/1240) rather than Tailwind defaults.
 */
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      xs: '600px',
      sm: '760px',
      md: '880px',
      lg: '980px',
      xl: '1240px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        // Ink + paper
        ink: '#1A1612',
        inkSoft: '#2D261E',
        inkMid: '#4A4239',
        snow: '#FCFAF6',
        paper: '#F4EFE6',
        cream: '#FAF6EC',
        bone: '#E8E2D5',
        rule: '#C4BCA8',
        ruleSoft: '#DCD4C0',
        mute: '#7A6F5C',
        muteSoft: '#A09683',

        // Brand + signal
        crimson: '#8B0A39', // locked
        crimsonDeep: '#6B0829',
        crimsonTint: '#F2E0E5',
        navy: '#0F1A2B', // supporting accent — locked
        navySoft: '#2A3F58',
        navyTint: '#DDE3EA',
        amber: '#A86A1F',
        rust: '#A4391E',
        gold: '#C39A4A',

      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Iowan Old Style', 'Apple Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-geist)', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'SF Mono', 'Menlo', 'monospace'],
      },
      fontSize: {
        d0: ['clamp(3rem, 7vw, 5.5rem)', { lineHeight: '1.02', letterSpacing: '-0.022em' }],
        d1: ['clamp(2.25rem, 4.5vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.018em' }],
        d2: ['clamp(1.5rem, 2.5vw, 2rem)', { lineHeight: '1.15', letterSpacing: '-0.018em' }],
        d3: ['1.25rem', { lineHeight: '1.25', letterSpacing: '-0.018em' }],
        lede: ['1.0625rem', { lineHeight: '1.65' }],
        body: ['1rem', { lineHeight: '1.7' }],
        sm: ['0.875rem', { lineHeight: '1.55' }],
        xs: ['0.8125rem', { lineHeight: '1.5' }],
        mu: ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.16em' }],
      },
      maxWidth: {
        prose: '64ch',
        narrow: '760px',
        lede: '56ch',
        quote: '36ch',
        editorial: '1240px',
      },
      spacing: {
        section: 'clamp(4.5rem, 9vw, 8rem)',
      },
      letterSpacing: {
        tight: '-0.022em',
        snug: '-0.018em',
        crisp: '-0.012em',
        eyebrow: '0.16em',
        byline: '0.14em',
      },
      boxShadow: {
        editorial: '0 1px 3px rgba(26, 22, 18, 0.06), 0 4px 12px rgba(26, 22, 18, 0.04)',
        hairline: '0 1px 0 rgba(26, 22, 18, 0.08)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.32, 0.04, 0.16, 1)',
        editorialOut: 'cubic-bezier(0.2, 0.7, 0.1, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
