const plugin = require('tailwindcss/plugin');

module.exports = function (variants) {
  return plugin(function({ addUtilities }) {
    const newUtilities = {
      '.ratio-square': { paddingBottom: '100%' },
      '.ratio-16-9': { paddingBottom: '56.25%' },
      '.ratio-rect': { paddingBottom: '50%' },      
      '.ratio-rect-tall': { paddingBottom: '150%' },
      '.ratio-rect-lg': { paddingBottom: '66.6667%' },
      '.ratio-rect-xl': { paddingBottom: '75%' },
      '.ratio-rect-xxl': { paddingBottom: '85%' },
    };

    addUtilities(newUtilities, ['responsive'])
  }) 
}