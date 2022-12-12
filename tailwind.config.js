module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      serif: ['"Roboto Slab"', "serif"],
      body: ["Roboto", "sans-serif"],
    },
    extend: {
      fontFamily: {
        sans: ["futura-pt"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
