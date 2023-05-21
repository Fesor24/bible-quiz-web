/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "760px",
      lg: "976px",
      xl: "1440px",
    },
    fontFamily: {
      Poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        darkblue: "hsl(239, 51%, 38%)",
        lightdarkblue: "hsl(239, 53%, 81%)",
        lightdarkblueSecondary: "hsl(239, 53%, 60%)",
        lightblue: "hsl(201, 92%, 95%)",
        lightGray: "hsl(0, 0%, 98%)",
        darkGrayishBlue: "hsl(227,12%,61%)",
      },
    },
  },
  plugins: [],
};
