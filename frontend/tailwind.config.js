/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#0f172a', // Blu notte profondo
          800: '#1e293b',
          600: '#2563eb', // Blu industriale
          accent: '#eded21' // Arancione sicurezza
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}