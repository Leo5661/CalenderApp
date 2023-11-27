import type { Config } from 'tailwindcss'
const { nextui } = require('@nextui-org/react')

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    nextui({
      prefix: 'nextui',
      addCommonColors: false,
      layout: {},
      themes: {
        light: {
          layout: {},
          colors: {
            foreground: '#121212',
            background: '#ECECEC',
            primary: '#633786',
            transparent: 'transparent',
            white: '#ECECEC',
            black: '#121212',
            purple: '#633786',
            greenStatus: '#5EAEA5',
            redStatus: '#AE5E6D',
          }, // light theme colors
        },
        dark: {
          layout: {},
          colors: {
            background: '#121212',
            foreground: '#ECECEC',
            primary: '#C6C3F5',
            transparent: 'transparent',
            white: '#ECECEC',
            black: '#121212',
            purple: '#633786',
            greenStatus: '#5EAEA5',
            redStatus: '#AE5E6D',
          }, // dark theme colors
        },
      },
    }),
  ],
}
export default config
