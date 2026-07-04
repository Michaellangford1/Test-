/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Design tokens — a calm workshop palette. Deliberately not cream/terracotta.
        paper: '#f3f5f7', // light background
        surface: '#ffffff', // light card
        ink: '#1c2128', // primary text on light
        slate: {
          900: '#12151a', // dark background
          800: '#1b1f27', // dark card
          700: '#252b35', // dark raised
          600: '#39424f', // dark border
        },
        line: '#dde2e8', // light border
        accent: {
          DEFAULT: '#2f7d8c', // quiet workshop teal
          soft: '#4a97a6',
          ink: '#0f3b43',
        },
        amber: {
          DEFAULT: '#b7791f', // safety
          soft: '#f6e4c4',
          deep: '#5c3d0a',
        },
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        // Intentional type scale; base is generous for at-arm's-length reading.
        xs: ['0.8125rem', { lineHeight: '1.15rem' }],
        sm: ['0.9375rem', { lineHeight: '1.35rem' }],
        base: ['1.0625rem', { lineHeight: '1.55rem' }],
        lg: ['1.1875rem', { lineHeight: '1.65rem' }],
        xl: ['1.375rem', { lineHeight: '1.8rem' }],
        '2xl': ['1.625rem', { lineHeight: '2rem' }],
        '3xl': ['2rem', { lineHeight: '2.35rem' }],
      },
      minHeight: {
        touch: '48px',
      },
      minWidth: {
        touch: '48px',
      },
    },
  },
  plugins: [],
};
