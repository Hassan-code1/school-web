import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),],
  css: {
    postcss: {
      plugins: [
        // Add Tailwind CSS plugin
        tailwindcss,
        // Add other PostCSS plugins if needed
      ],
    },
  },
})
