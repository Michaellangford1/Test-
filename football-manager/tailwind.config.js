/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // FM2005-inspired slate/steel-blue skin
        ink: {
          950: '#0a111b',
          900: '#0e1622',
          850: '#131d2b',
          800: '#182434',
          700: '#22324a',
          600: '#2e4260',
          500: '#40587c',
          400: '#6a7f9e',
          300: '#98a8c0',
          200: '#c3cedd',
          100: '#e4eaf2',
        },
        pitch: { 700: '#1d5a2c', 600: '#237036', 500: '#2d8a44' },
        gold: '#f2c14e',
        win: '#3fbf6a',
        draw: '#b8b8b8',
        loss: '#e5534b',
      },
      fontFamily: {
        sans: ['Tahoma', 'Verdana', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
