import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api-users': {
        target:"https://homehaven-ssxz.onrender.com",
        //secure: false,
        changeOrigin: true,
      },
      '/api-listings': {
        target:"https://homehaven-ssxz.onrender.com",
        //secure: false,
        changeOrigin: true,
      }
    }
  },
  plugins: [react()],
})
