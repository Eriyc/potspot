const colors = require('tailwindcss/colors');
delete colors.lightBlue; // <-----
delete colors.blueGray; // <-----
delete colors.coolGray; // <-----
delete colors.trueGray; // <-----
delete colors.warmGray; // <-----

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      ...colors,
      gray: colors.zinc,
      zinc: colors.gray,
    },
    extend: {
      colors: {
        'primary-dark': colors.indigo[500],
        'primary-light': colors.indigo[700],
      },
    },
  },
};
