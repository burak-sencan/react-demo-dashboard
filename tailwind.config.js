/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        // hero: "url('/assets/hero_back_image.jpg')",
        "hero":"url('/src/assets/hero_back_image.jpg')"
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        dark: {
          800: '#363A45',
          900: '#272B34',
        },
        light: {
          50: '#F5F6F8',
          100: '#c4c5c6',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
