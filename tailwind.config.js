const defaultTheme = require('tailwindcss/defaultTheme');

/**
 * Tokens extraídos do Figma (file ct69qBAokxqyAYBQT5RRcq).
 * Cores nomeadas conforme as variáveis "Grey Scale" do arquivo;
 * as demais são cores fixas usadas no layout.
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        primary: '#005CFF',
        'grey-light': '#F5F5F5',
        'grey-medium': '#DDDDDD',
        'grey-dark': '#656565',
        'grey-darkest': '#303030',
        'coupon-purple': '#6220C1',
        'badge-navy': '#00264E',
        'tag-teal': '#5EC0BE',
        'hero-grey': '#E7E7EA',
        'band-grey': '#DEDEDE',
        'photo-grey': '#C2C2C2',
        'band-text': '#4F4F4F',
        'dot-inactive': '#838383'
      },
      fontFamily: {
        sans: ['"Nunito Sans"', ...defaultTheme.fontFamily.sans],
        nunito: ['Nunito', ...defaultTheme.fontFamily.sans],
        heebo: ['Heebo', ...defaultTheme.fontFamily.sans]
      },
      boxShadow: {
        header: '0 4px 2px rgba(0, 0, 0, 0.25)',
        megamenu: '0 4px 8px -1px rgba(0, 0, 0, 0.1)'
      }
    }
  },
  plugins: []
};
