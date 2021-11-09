module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: theme => ({
        'darkgray': '#15202B',
      }),
      textColor: theme => ({
        'subwhite': '#8899A6',
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
