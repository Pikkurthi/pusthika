import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss' // use TailwindCSS v3 installation guide

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
    // You don't need to add Daisy UI here because it is not a Vite plugin.
  ],
})