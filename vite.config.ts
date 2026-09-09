import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      output: {
        // Nombres fijos sin hash para poder enlazar desde WordPress sin cambiar URLs
        entryFileNames: 'assets/toonhub-venoco.js',
        chunkFileNames: 'assets/toonhub-venoco-[name].js',
        assetFileNames: (info) => {
          if (info.name?.endsWith('.css')) return 'assets/toonhub-venoco.css'
          return 'assets/[name][extname]'
        },
      },
    },
  },
})
