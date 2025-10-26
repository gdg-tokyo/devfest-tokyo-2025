import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
  plugins: [require('@tailwindcss/line-clamp')],
}
export default config
