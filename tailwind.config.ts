/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      // Mobile first: резиновая от 320px, адаптивная с 375px
      'sm': '375px',    // small mobile
      'md': '768px',    // tablet
      'lg': '1440px',   // desktop
    },
    extend: {
      
      maxWidth: {
        'mobile': '375px',
        'tablet': '768px',
        'desktop': '1440px',
      }
    },
  },
  plugins: [],
}