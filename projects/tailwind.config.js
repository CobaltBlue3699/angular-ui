const plugin = require('tailwindcss/plugin')

module.exports = {
  theme: {
    // extends: {}
    letterSpacing: {
      tightest: '-.075em',
      tighter: '-.05em',
      tight: '-.025em',
      normal: '0',
      wide: '.025em',
      wider: '.05em',
      widest: '.1em',
      widest: '.25em',
    }
  },
  darkMode: true,
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.4xl'), 'fontWeight': 900, 'color': '#151515' },
        'h2': { fontSize: theme('fontSize.3xl'), 'fontWeight': 800, 'color': '#151515' },
        'h3': { fontSize: theme('fontSize.2xl'), 'fontWeight': 700, 'color': '#151515' },
        'h4': { fontSize: theme('fontSize.xl'), 'fontWeight': 600, 'color': '#151515' },
        'h5': { fontSize: theme('fontSize.lg'), 'fontWeight': 500, 'color': '#151515' },
      })
    })
  ],
  corePlugins: {
    divideStyle: true,
  }
};