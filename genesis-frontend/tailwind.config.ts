// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#0A0A0A", // The Dark Room
          light: "#141414",
        },
        sovereign: {
          DEFAULT: "#D4AF37", // High-frequency signals
          dim: "#A3862A",
        },
        blueprint: {
          DEFAULT: "#1A2B3C", // Structural grids and borders
          dark: "#101B26",
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-baskerville)', 'serif'],
        mono: ['var(--font-fira-code)', 'monospace'], // Technocratic Precision
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.300'),
            h1: { fontFamily: theme('fontFamily.serif'), color: theme('colors.white'), fontWeight: '700' },
            h2: { 
              fontFamily: theme('fontFamily.serif'), 
              color: theme('colors.white'), 
              fontWeight: '600',
              marginTop: '4rem',
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
              borderBottom: '1px solid #1A2B3C',
              paddingBottom: '0.5rem'
            },
            h3: { fontFamily: theme('fontFamily.sans'), color: theme('colors.sovereign.DEFAULT') },
            p: {
              whiteSpace: 'pre-wrap',
              lineHeight: '2.2rem',
              marginBottom: '2.5rem',
              fontSize: '1.125rem',
              color: theme('colors.gray.300')
            },
            li: {
              marginBottom: '1rem',
              lineHeight: '1.8rem'
            },
            strong: { color: theme('colors.white') },
            a: { color: theme('colors.sovereign.DEFAULT'), '&:hover': { color: theme('colors.sovereign.light') } },
            code: { fontFamily: theme('fontFamily.mono'), color: theme('colors.sovereign.dim'), backgroundColor: theme('colors.obsidian.light'), padding: '0.25rem', borderRadius: '0.25rem' },
            'pre code': { backgroundColor: 'transparent', color: 'inherit', padding: '0' },
            pre: { backgroundColor: theme('colors.obsidian.light'), border: `1px solid ${theme('colors.blueprint.dark')}` },
            table: {
              width: '100%',
              marginTop: '3rem',
              marginBottom: '3rem',
              borderCollapse: 'collapse'
            },
            'th, td': {
              border: '1px solid #1A2B3C',
              padding: '1rem',
              textAlign: 'left'
            },
            th: {
              backgroundColor: '#0A0A0A',
              color: '#D4AF37',
              fontFamily: theme('fontFamily.mono')
            }
          },
        },
      }),
      boxShadow: {
        'sovereign': '0 4px 20px -2px rgba(212, 175, 55, 0.15)',
        'brutal': '4px 4px 0px 0px rgba(26, 43, 60, 1)', // Neo-brutalism edge
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;