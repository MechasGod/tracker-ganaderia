import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://31.97.128.204:3000',
        changeOrigin: true,
      }
    }
  }
})
