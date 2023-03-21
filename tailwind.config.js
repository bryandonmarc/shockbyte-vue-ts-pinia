/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5051F9',
        dark: '#1E1F25',
        darker: '#131517'
      }
    }
  },
  plugins: []
}
