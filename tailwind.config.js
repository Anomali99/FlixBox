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
        20: "repeat(20, minmax(0, 1fr))",
        21: "repeat(21, minmax(0, 1fr))",
        22: "repeat(22, minmax(0, 1fr))",
        23: "repeat(23, minmax(0, 1fr))",
        24: "repeat(24, minmax(0, 1fr))",
        25: "repeat(25, minmax(0, 1fr))",
        26: "repeat(26, minmax(0, 1fr))",
        27: "repeat(27, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
