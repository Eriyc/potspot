const colors = require('tailwindcss/colors');

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
