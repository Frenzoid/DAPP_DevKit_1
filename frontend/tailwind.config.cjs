/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.svelte'],
  // safelist all bg color variations with regular expresion
  safelist: [
    {
      pattern: /bg-*-*/,
    },
  ],
};