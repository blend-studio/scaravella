import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // AGGIUNGI QUESTO (deve corrispondere al nome del repository GitHub)
  base: '/scaravella/', 
})