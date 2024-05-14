/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Courier Prime', 'sans-serif'],
        numbers: ['Digital Numbers', 'sans-serif']
      },
      textColor: {
        primary: '#484848'
      },
      keyframes: {
        scroll: {
          to: {
            translate: 'calc(-6 * 15rem)'
          }
        }
      },
      animation: {
        scroll: 'scroll 10s linear infinite'
      }
    }
  },
  plugins: []
}
