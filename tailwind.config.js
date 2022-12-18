/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.tsx",
    "./components/**/*.tsx"
  ],
  theme: {
    extend: {
      screens: {
        '2xs': '370px',
        'xs': '500px'
      },
      colors: {
        "orange-red": "#ff4500"
      }
    },
  },
  plugins: [],
}
