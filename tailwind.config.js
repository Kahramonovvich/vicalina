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
        padding: '1rem',
        screens: {
          DEFAULT: '1374px',
        },
      },
      borderRadius: {
        'base': '10px'
      }
    },
  },
  plugins: [],
}