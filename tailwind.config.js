/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,vue,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-animated')],
}

