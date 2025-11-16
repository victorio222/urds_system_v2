// plugins: [
//   require('tailwind-scrollbar'), // install with `npm i tailwind-scrollbar`
// ]

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#344e6a', // <- text-navy-700
          800: '#203b54',
          900: '#102740',
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'), // install with `npm i tailwind-scrollbar`
  ]
};
