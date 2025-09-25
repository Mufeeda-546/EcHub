/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // ✅ double star includes all subfolders
  theme: {
    extend: {
      colors: {
        forestBrown: "#69573B",
        mossGreen: "#79804D",
        deepGreen: "#3E482A",
        darkBrown: "#2D2920",
        palejade: "#BCB893",
        mossygreen: "#BAC38F",
        forestcanopy: "#474329",
        emberedearth: "#332C0F",
      },
    },
  },
  plugins: [],
};