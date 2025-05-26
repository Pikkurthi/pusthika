// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [ require('@pustika/design-system') ],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,html}'
  ],
};
