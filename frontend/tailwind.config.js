/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Red (primary) ─────────────────────────────────
        primary: {
          50:  '#fff0f0',
          100: '#ffd6d6',
          200: '#ffacac',
          300: '#ff7575',
          400: '#ff3d3d',
          500: '#ee0000',
          600: '#cc0000',
          700: '#a50000',
          800: '#820000',
          900: '#660000',
          950: '#400000',
        },
        // ── Green (secondary) ─────────────────────────────
        green: {
          50:  '#e8f5ee',
          100: '#c2e5d1',
          200: '#9bd4b4',
          300: '#73c396',
          400: '#4db47e',
          500: '#26a566',
          600: '#008751',
          700: '#006b3c',
          800: '#004f2b',
          900: '#00341a',
          950: '#001a0d',
        },
        // ── Yellow (accent) ───────────────────────────────
        yellow: {
          50:  '#fffde7',
          100: '#fff9c4',
          200: '#fff59d',
          300: '#fff176',
          400: '#ffee58',
          500: '#ffd100',
          600: '#ffc400',
          700: '#ffb300',
          800: '#ff8f00',
          900: '#ff6f00',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'count-up': 'countUp 2s ease-out forwards',
        'pulse-slow': 'pulse 3s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'hero-pattern': "url('/images/hero-bg.jpg')",
        'about-pattern': "url('/images/about-bg.jpg')",
      },
      boxShadow: {
        'card': '0 4px 20px rgba(204, 0, 0, 0.08)',
        'card-hover': '0 8px 40px rgba(204, 0, 0, 0.18)',
        'nav': '0 2px 20px rgba(102, 0, 0, 0.10)',
      },
    },
  },
  plugins: [],
}
