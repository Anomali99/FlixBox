/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#A294F9",
        secondary: "#CDC1FF",
        tertiary: "#E5D9F2",
        bgColor: "#F5EFFF",
      },
      gridTemplateColumns: {
        27: "repeat(27, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
