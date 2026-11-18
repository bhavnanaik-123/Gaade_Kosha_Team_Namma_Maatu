/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdfbf7',
          100: '#fcf8ee',
          200: '#f6eedb',
          300: '#eee0bf',
          400: '#dfc699',
          500: '#cfaa71',
        },
        brown: {
          50: '#fbf9f8',
          100: '#f4ede9',
          200: '#eadacf',
          300: '#d8bdaf',
          400: '#bf9985',
          500: '#a37661',
          600: '#895c49',
          700: '#6d4635',
          800: '#4a2c1d',
          900: '#2f190e',
          950: '#1b0c06',
        },
        kred: {
          50: '#fef3f2',
          100: '#fee5e5',
          200: '#fecaca',
          500: '#bd2b2b',
          600: '#9d1c1c',
          700: '#801515',
          800: '#661313',
          900: '#4c0d0d',
        },
        kgold: {
          100: '#fef3c7',
          200: '#fde68a',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
        }
      },
      fontFamily: {
        kannada: ['"Noto Sans Kannada"', '"Tiro Kannada"', 'system-ui', 'sans-serif'],
        serif: ['"Cinzel"', '"Merriweather"', 'serif'],
      },
      boxShadow: {
        'warm': '0 4px 20px -2px rgba(47, 25, 14, 0.08), 0 2px 6px -1px rgba(47, 25, 14, 0.04)',
        'warm-lg': '0 10px 25px -3px rgba(47, 25, 14, 0.12), 0 4px 10px -2px rgba(47, 25, 14, 0.06)',
      }
    },
  },
  plugins: [],
}
