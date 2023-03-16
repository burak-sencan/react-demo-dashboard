/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          800: '#363A45',
          900: '#272B34',
        },
        light: {
          50: '#F5F6F8',
        },
      },
    },
  },
  plugins: [],
}
