import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    historyApiFallback: true, // dev server SPA fallback
  },
  build: {
    rollupOptions: {
      input: '/index.html', // ensures SPA build entry
    },
  },
})
