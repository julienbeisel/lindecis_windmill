// tailwind.config.js
const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    extend: {
      colors: {
        slate: colors.blueGray,
        gray: colors.gray,
      },
      padding: {
        '4/5': '80%',
      },
    },
  },
}
