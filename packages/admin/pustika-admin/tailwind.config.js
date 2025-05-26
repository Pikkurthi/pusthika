// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#1976D2',
        secondary: '#9C27B0',
        background: '#FAFAFA',
        text: '#212121',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  presets: [],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,html}'
  ],
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ['light', 'dark'],
  },
};
