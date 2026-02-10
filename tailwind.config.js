/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Zen Kaku Gothic New"', 'sans-serif'],
        shippori: ['"Shippori Mincho"', 'serif'],
      },
    },
  },
  plugins: [],
}