/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          50: '#FDF3F5',
          100: '#FBE8EB',
          200: '#F5C6CE',
          600: '#8A2C3F',
          700: '#702333', // Primary
          800: '#581422',
          900: '#3D0914',
        },
        gold: {
          50: '#FCF9F2',
          100: '#F7F2E2',
          200: '#EDE0BF',
          300: '#DFC896',
          400: '#C5A866',
          500: '#94723B', // Secondary Antique Gold
          600: '#7B5C2B',
          700: '#5F441D',
          hover: '#A68246'
        },
        ivory: {
          50: '#FDFCFA',
          100: '#FAF8F5',
          200: '#F7F4ED', // Background Warm Ivory
          300: '#EEE9DC',
          400: '#E1DAC8',
        },
        spiritual: {
          dark: '#292522', // Primary text
          muted: '#77716A', // Secondary text
          success: '#557B64', // Success green
          warning: '#B47B42', // Warning
          accent: '#A85A32',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
        serif: ['Cinzel', 'Playfair Display', 'serif'],
        hindi: ['Noto Sans Devanagari', 'sans-serif']
      },
      boxShadow: {
        'royal': '0 4px 20px -2px rgba(112, 35, 51, 0.08), 0 2px 6px -1px rgba(148, 114, 59, 0.06)',
        'royal-lg': '0 10px 30px -4px rgba(112, 35, 51, 0.12), 0 4px 12px -2px rgba(148, 114, 59, 0.1)',
        'stamp': 'inset 0 0 0 2px rgba(112, 35, 51, 0.8), 0 4px 12px rgba(112, 35, 51, 0.15)',
        'stamp-gold': 'inset 0 0 0 2px rgba(148, 114, 59, 0.9), 0 4px 12px rgba(148, 114, 59, 0.2)'
      }
    },
  },
  plugins: [],
}
