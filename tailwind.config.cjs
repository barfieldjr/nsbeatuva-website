const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", './src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    backgroundImage: {
      'golden-torch': "url('../src/assets/nsbegoldentorch.png')",
      'blue-waves': "url('../src/assets/wave.svg')",
      'sound': "url('../src/assets/sound.svg')",
      'shiny': "url('../src/assets/shiny.svg')",
      'shapes': "url('../src/assets/shapes.svg')",
    },
    extend: {
      screens: {
        'hqd': { 'raw': '(min-height: 801px)' },
        'lqd': { 'raw': '(max-height: 801px)' },
      },
      colors: {
        uva: {
          orange: '#E57200',
          blue: '#232D4B',
        }
      }
    },
  },
  plugins: [require('tw-elements/dist/plugin'), require('tailwind-scrollbar-hide')],
});