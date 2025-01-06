/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F58800',  // Custom primary color
        secondary: '#858585',  // Custom secondary color
        'primary-light': '#F8A700', // Lighter primary
        'primary-dark': '#D87700', // Darker primary
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // Correctly define Poppins font
      },
    },
  },
  plugins: [],
}
