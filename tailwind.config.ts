import type { Config } from 'tailwindcss'
import type { PluginUtils } from 'tailwindcss/types/config'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: ({ theme }: { theme: PluginUtils['theme'] }) => ({
        DEFAULT: {
          css: {
            a: { textDecoration: 'underline', textUnderlineOffset: '2px' },
            code: {
              backgroundColor: theme('colors.zinc.100'),
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
            },
            pre: {
              backgroundColor: theme('colors.zinc.900'),
              color: theme('colors.zinc.100'),
              borderRadius: '0.5rem',
              padding: '1rem',
              overflowX: 'auto',
            },
            img: { borderRadius: '0.5rem' },
            table: { width: '100%', borderCollapse: 'collapse' },
            'thead th': {
              borderBottom: `1px solid ${theme('colors.zinc.300')}`,
              padding: '0.5rem',
            },
            'tbody td': {
              borderTop: `1px solid ${theme('colors.zinc.200')}`,
              padding: '0.5rem',
            },
          },
        },
        invert: {
          css: {
            code: { backgroundColor: theme('colors.zinc.800') },
            pre: { backgroundColor: theme('colors.zinc.800') },
            'thead th': { borderBottomColor: theme('colors.zinc.700') },
            'tbody td': { borderTopColor: theme('colors.zinc.800') },
          },
        },
      }),
      colors: {
        'google-blue-500': '#4285f4',
        'google-red-500': '#ea4335',
        'google-yellow-500': '#fbbc04',
        'google-green-500': '#34a853',
        'halftone-blue': '#57caff',
        'halftone-yellow': '#ffd427',
        'halftone-red': '#ff7daf',
        'halftone-green': '#5cdb6d',
        'gdg-pastel-blue': '#c3ecf6',
        'gdg-pastel-yellow': '#ffe7a5',
        'gdg-pastel-red': '#f8d8d8',
        'gdg-pastel-green': '#ccf6c5',
        'off-white': '#f0f0f0',
        'black-02': '#1e1e1e',
      },
      fontFamily: {
        'google-sans': ['Google Sans', 'sans-serif'],
        'roboto-mono': ['Roboto Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
