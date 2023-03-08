/** @type {import('tailwindcss').Config} */
const { join } = require('path');
const sharedTailwindConfig = require('../tailwind.config');

module.exports = {
  presets: [sharedTailwindConfig],
  content: [
    // "./projects/showcase/src/**/*.{html,ts}",
    join(__dirname, 'src/**/*.{ts,html,css,scss}'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
