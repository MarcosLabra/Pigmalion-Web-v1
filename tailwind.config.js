/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          background: '#F7F6F2',
          secondary: '#566573',
          black: '#111111',
        },
        interactive: {
          purple: '#754595',
          yellow: '#FFD700',
          dark: '#1B2631',
        },
        text: {
          primary: '#1B2631',
          secondary: '#566573',
          light: '#F7F6F2',
        }
      },
      fontFamily: {
        heading: ['EB Garamond', 'serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(117deg, #111111 0%, #1B2631 54.79%, #566573 100%)',
      }
    },
  },
  plugins: [],
}