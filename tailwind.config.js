/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nstay: {
          green: '#74c142',
          'green-light': '#98e367',
          'green-badge': '#86efac',
          blue: '#2b78e4',
          'blue-hover': '#1d64c9',
          dark: '#1e293b',
          gray: '#64748b',
          'gray-light': '#f1f5f9',
          'input-bg': '#e9edf2',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}

