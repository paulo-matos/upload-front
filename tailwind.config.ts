import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
          colors: {
        gray: {
          50: '#eaeaea',
          100: '#bebebf',
          200: '#9e9ea0',
          300: '#727275',
          400: '#56565a',
          500: '#2c2c31',
          600: '#28282d',
          700: '#1f1f1f',
          800: '#18181b',
          900: '#121215',
        },
        white: {
          50: '#ffffff',
          100: '#f7f9fc',
          150: '#f2f6fc',
        }
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
export default config
