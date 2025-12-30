/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // This creates your custom "Blackrock" orange
        orange: {
          500: '#F59E0B',
          600: '#D97706',
        },
      },
    },
  },
  plugins: [],
}