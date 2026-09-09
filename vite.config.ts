import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        // IIFE: bundle autoejecutado, sin módulos dinámicos ni eval — compatible con CSP estricto de WordPress
        format: 'iife',
        entryFileNames: 'assets/toonhub-venoco.js',
        assetFileNames: (info) => {
          if (info.name?.endsWith('.css')) return 'assets/toonhub-venoco.css'
          return 'assets/[name][extname]'
        },
      },
    },
  },
})
