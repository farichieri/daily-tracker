/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    height: (theme) => ({
      auto: "auto",
      ...theme("spacing"),
      full: "100%",
      screen: "calc(var(--vh) * 100)",
    }),

    extend: {
      maxHeight: {
        0: "0",
        "25vh": "25vh",
        "50vh": "50vh",
        "75vh": "75vh",
        full: "100vh",
      },
      colors: {
        "shadow-color": "var(--box-shadow)",
        "shadow-color-l": "var(--box-shadow-light)",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
