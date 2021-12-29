/* eslint-disable prettier/prettier */

function withOpacity(variableName) {
  return ({opacityValue}) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          // Customize it on globals.css :root
          50: withOpacity('--tw-clr-primary-50'),
          100: withOpacity('--tw-clr-primary-100'),
          200: withOpacity('--tw-clr-primary-200'),
          300: withOpacity('--tw-clr-primary-300'),
          400: withOpacity('--tw-clr-primary-400'),
          500: withOpacity('--tw-clr-primary-500'),
          600: withOpacity('--tw-clr-primary-600'),
          700: withOpacity('--tw-clr-primary-700'),
          800: withOpacity('--tw-clr-primary-800'),
          900: withOpacity('--tw-clr-primary-900'),
        },
        dark: '#222222',
      },
    },
  },
};
