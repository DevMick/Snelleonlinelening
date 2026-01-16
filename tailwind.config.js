/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          orange: '#F7941D',
          red: '#E63946',
          blue: '#0066CC',
          magenta: '#E91E63',
          yellow: '#FFC107',
        },
        text: {
          dark: '#333333',
          gray: '#757575',
        },
        bg: {
          light: '#F5F5F5',
        },
      },
    },
  },
  plugins: [],
}
