/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', md: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1320px' }
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: '#151515',
          soft: '#3d3d3d'
        },
        accent: {
          50: '#fff8eb',
          100: '#feecc7',
          200: '#fdd68a',
          400: '#fbb13c',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309'
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f7f5f2',
          sunken: '#efebe5'
        },
        line: '#e7e2da'
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif']
      },
      boxShadow: {
        card: '0 1px 2px rgb(21 21 21 / 0.04), 0 4px 16px rgb(21 21 21 / 0.06)',
        lift: '0 12px 32px rgb(21 21 21 / 0.12)'
      },
      keyframes: {
        scroll: {
          to: { transform: 'translateX(-50%)' }
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'slide-in-left': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' }
        }
      },
      animation: {
        scroll: 'scroll 30s linear infinite',
        'fade-in': 'fade-in 150ms ease-out',
        'slide-up': 'slide-up 200ms ease-out',
        'slide-in-left': 'slide-in-left 250ms ease-out'
      }
    }
  },
  plugins: []
}
