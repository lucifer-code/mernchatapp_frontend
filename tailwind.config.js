/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: { max: "40em" },
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      height: {
        "90vh": "90vh",
      },
      width: {
        "90vw": "90vw",
      },
      flex: {
        0.3: "0.3",
        0.7: "0.7",
      },
    },
  },
  plugins: [],
};
