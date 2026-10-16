/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        grafite: {
          DEFAULT: '#171916',
          50: '#f5f6f5',
          100: '#e6e7e5',
          200: '#cdcecb',
          300: '#a4a6a1',
          400: '#757772',
          500: '#545651',
          600: '#3e403c',
          700: '#2a2c29',
          800: '#1f2120',
          900: '#171916',
        },
        marfim: {
          DEFAULT: '#F1EEE6',
          50: '#faf9f6',
          100: '#F1EEE6',
          200: '#e8e4d8',
          300: '#ddd7c5',
          400: '#cbc3aa',
          500: '#b5ab8d',
        },
        dourado: {
          DEFAULT: '#A58A62',
          50: '#faf8f4',
          100: '#f2ece0',
          200: '#e5d8c0',
          300: '#d4c098',
          400: '#bfa478',
          500: '#A58A62',
          600: '#8f7452',
          700: '#735d42',
          800: '#5c4a35',
          900: '#493b2b',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'editorial': '0.02em',
        'wider-editorial': '0.15em',
        'widest-editorial': '0.3em',
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'hero-reveal': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'image-reveal': {
          '0%': { opacity: '0', transform: 'scale(1.08)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'hero-reveal': 'hero-reveal 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'image-reveal': 'image-reveal 1.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fade-in 0.6s ease forwards',
        'slide-down': 'slide-down 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'scale-in': 'scale-in 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
    },
  },
  plugins: [],
};
