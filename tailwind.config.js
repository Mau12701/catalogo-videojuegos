/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        steam: {
          dark: '#1b2838',
          darker: '#171a21',
          blue: '#66c0f4',
          green: '#4c6b22',
          light: '#c6d4df',
          gray: '#2a475e',
        }
      }
    },
  },
  plugins: [],
}