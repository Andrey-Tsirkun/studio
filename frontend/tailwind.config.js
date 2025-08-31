/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './components/ScrollReveal.tsx',
    './components/TailwindTest.tsx',
    './components/Hero.tsx',
    './app/page.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        'dm-sans': ['DM Sans', 'sans-serif'],
      },
      screens: {
        'xs': '480px',
      },
      height: {
        'screen-svh': '100svh',
      },
      fontSize: {
        '10xl': ['10rem', { lineHeight: '1' }],
        '11xl': ['12rem', { lineHeight: '1' }],
        '12xl': ['15rem', { lineHeight: '1' }],
        '13xl': ['20rem', { lineHeight: '1' }],
      }
    },
  },
  plugins: [],
} 