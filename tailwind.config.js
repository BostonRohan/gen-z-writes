/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "2xl": "1400px",
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        brandPrimary: "#074aac",
        brandSecondary: "#7a49a5",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};