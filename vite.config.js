import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwind()],
  server: {
    allowedHosts: ['1af53ae3-78a6-49df-a83e-07b3a56f7e04-00-2uoqwikmjhy96.picard.replit.dev'],
  }
})
