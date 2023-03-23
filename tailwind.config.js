/* eslint-disable no-undef */
// /** @typedef {import('tailwindcss/plugin')} */
// const plugin = require('tailwindcss/plugin')

const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5051F9',
        dark: '#1E1F25',
        darker: '#131517'
      },
      fontFamily: {
        display: ['Poppins', ...fontFamily.sans]
      }
    }
  },
  plugins: [
    // plugin(function ({ addComponents }) {
    //   addComponents({
    //     '.button': {
    //       cursor: 'pointer',
    //       position: 'relative',
    //       minHeight: '3rem',
    //       minWidth: '3rem',
    //       padding: '0.75rem 1.25rem',
    //       borderRadius: '0.5rem',
    //       fontSize: '1rem',
    //       lineHeight: '1.5rem',
    //       transitionProperty:
    //         'color, background-color, border-color, text-decoration-color, fill, stroke',
    //       transitionTimingFunction: `cubic-bezier(0.4, 0, 0.2, 1)`,
    //       transitionDuration: '150ms'
    //     },
    //     '.button-primary': {
    //       '--tw-ring-offset-width': '2px',
    //       '--tw-bg-opacity': 1,
    //       '--tw-ring-opacity': 1,
    //       '--tw-text-opacity': 1,
    //       '--tw-ring-offset-color': '#131517',
    //       '--tw-ring-color': `rgb(80 81 249 / var(--tw-ring-opacity))`,
    //       color: `rgb(255 255 255 / 0.2)`,
    //       backgroundColor: `rgb(30 31 37 / var(--tw-bg-opacity))`,
    //       '&:hover': {
    //         backgroundColor: `rgb(80 81 249 / var(--tw-bg-opacity))`,
    //         color: `color: rgb(255 255 255 / var(--tw-text-opacity))`
    //       },
    //       '&:focus': {
    //         '--tw-ring-offset-shadow': `var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)`,
    //         '--tw-ring-shadow': `var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)`,
    //         outline: '2px solid transparent',
    //         outlineOffset: '2px',
    //         boxShadow: `var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)`
    //       }
    //     }
    //   })
    // })
  ]
}
