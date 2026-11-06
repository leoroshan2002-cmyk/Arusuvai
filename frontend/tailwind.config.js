/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Brand palette from the original Arusuvai design
      colors: {
        brand: {
          green: '#064E3B',
          deep: '#063D2E',
          bright: '#0B6B4B',
          ivory: '#FAF8F0',
          cream: '#F2EBDD',
          gold: '#D9A441',
          brown: '#79553A',
          charcoal: '#202720',
          muted: '#70776F',
          whatsapp: '#1F8A4C',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        tamil: ['"Noto Sans Tamil"', 'Manrope', 'sans-serif'],
      },
      boxShadow: { brand: '0 14px 40px -18px rgba(6,61,46,.35)' },
    },
  },
  plugins: [],
};
