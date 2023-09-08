/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {
      willChange: {
        filter: "filter",
      },
      colors: {
        ring: "hsl(var(--ring))",
        primary: "#074AAC",
        secondary: "#7a49a5",
        background: {
          primary: "#1b1b1d",
        },
      },
    },
  },
  plugins: [],
};
