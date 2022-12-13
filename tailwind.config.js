/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.tsx",
    "./components/**/*.tsx"
  ],
  theme: {
    extend: {
      colors: {
        "orange-red": "#ff4500"
      }
    },
  },
  plugins: [],
}
