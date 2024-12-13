import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})


/*
//old version for local
export default defineConfig({
  server: {
    proxy: {
      '/api-users': {
        target:"http://localhost:3000",
        //secure: false,
        //changeOrigin: true
      },
      '/api-listings': {
        target:"http://localhost:3000",
        //secure: false,
        //changeOrigin: true
      }
    }
  },
  plugins: [react()],
})
  */

