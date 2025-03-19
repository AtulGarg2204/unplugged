/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
  'dm-serif': ['"DM Serif Display"', 'serif'],
  'dm-sans': ['"DM Sans"', 'sans-serif'],
},
    },
  },
  plugins: [],
}