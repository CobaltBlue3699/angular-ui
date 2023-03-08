const { join } = require('path');
const sharedTailwindConfig = ('../tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // prefix: 'au-', everything went wrong.
  presets: [sharedTailwindConfig],
  important: false,
  content: [
    // './projects/angular-ui/lib/**/*.{html,ts,css,scss}',
    join(__dirname, 'src/**/*.{ts,html,css,scss}'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
