module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#2FC4B2",
        bold: "#0EB6A4",
        secondary: "#52D3C6",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
