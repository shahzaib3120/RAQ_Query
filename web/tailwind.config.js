/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#172242",
        secondary: {
          100: "#15171b",
          200: "#888883",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
