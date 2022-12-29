/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': {'min': '320px', 'max': '480px'},
      // => @media (min-width: 320px and max-width: 480px) { ... }

      'md': {'min': '481px', 'max': '768px'},
      // => @media (min-width: 481px and max-width: 768px) { ... }

      'lg': {'min': '769px', 'max': '1024px'},
      // => @media (min-width: 769px and max-width: 1024px) { ... }

      'xl': {'min': '1025px', 'max': '1200px'},
      // => @media (min-width: 1025x and max-width: 1200px) { ... }

      '2xl': {'min': '1201px'},
      // => @media (min-width: 1201px) { ... }
    },
  },
  plugins: [],
}
