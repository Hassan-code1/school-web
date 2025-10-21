/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'poppins-300': ['Poppins-300', 'sans-serif'],
        'poppins-400': ['Poppins-400', 'sans-serif'],
        'poppins-500': ['Poppins-500', 'sans-serif'],
        'poppins-600': ['Poppins-600', 'sans-serif'],
        'poppins-700': ['Poppins-700', 'sans-serif'],
        'poppins-800': ['Poppins-800', 'sans-serif'],
        'poppins-900': ['Poppins-900', 'sans-serif'],
      },
    },
  },
  plugins: [],
}