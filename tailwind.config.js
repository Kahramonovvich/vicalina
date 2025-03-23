/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#000066',
        'orange': '#F15E22',
      },
      container: {
        center: true,
        screens: {
          DEFAULT: '1342px',
        },
      },
      borderRadius: {
        'base': '10px'
      }
    },
  },
  plugins: [],
}