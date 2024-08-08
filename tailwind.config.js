/** @type {import('tailwindcss').Config} */
const colors = require('./constants/colors');

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: colors,
      fontFamily: {
        pthin: ["TT-Norms-Pro-Thin", "sans-serif"],
        pextralight: ["TT-Norms-Pro-ExtraLight", "sans-serif"],
        plight: ["TT-Norms-Pro-Light", "sans-serif"],
        pregular: ["TT-Norms-Pro-Regular", "sans-serif"],
        pmedium: ["TT-Norms-Pro-Medium", "sans-serif"],
        psemibold: ["TT-Norms-Pro-SemiBold", "sans-serif"],
        pbold: ["TT-Norms-Pro-Bold", "sans-serif"],
        pextrabold: ["TT-Norms-Pro-ExtraBold", "sans-serif"],
        pblack: ["TT-Norms-Pro-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
