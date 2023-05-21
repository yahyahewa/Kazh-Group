/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lochmara: {
          50: "#f0f9ff",
          100: "#e0f3fe",
          200: "#bae8fd",
          300: "#7cd7fd",
          400: "#37c2f9",
          500: "#0dabea",
          600: "#018ece",
          700: "#026da2",
          800: "#065d86",
          900: "#0b4d6f",
          950: "#083149",
        },
      },
    },
  },
  plugins: [],
};
