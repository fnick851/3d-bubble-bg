import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import reactJsx from 'vite-react-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), reactJsx()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: '3d-bubble-background.js',
        manualChunks: undefined,
      },
    },
  },
})
