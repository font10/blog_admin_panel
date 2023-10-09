/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'bgSidebar': "url('./assets/images/bg_sidebar_2.jpg')"
      },
      fontFamily: {
        londrina: ['Londrina Solid'],
      },
      transitionProperty: {
        'height': 'height'
      }
    },
  },
  plugins: [],
}

