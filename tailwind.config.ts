/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      // Mobile first: резиновая от 320px, адаптивная с 375px
      sm: '375px', // small mobile
      md: '768px', // tablet
      lg: '1440px', // desktop
    },
    extend: {
      colors: {
        background: 'var(--background)',
        background2: 'var(--background-2)',
        background3: 'var(--background-3)',
        backdrop: 'rgba(var(--background-backdrop-rgb), <alpha-value>)',
        accent: 'var(--accent)',
        accent2: 'var(--accent-2)',
        text: 'var(--text)',
        borderGray: "rgba(29,30,33,0.1)",
        color: 'var(--main-black)',
        color1: 'var(--color1)',
        hover_btn: 'var(--hover)',
      },

      maxWidth: {
        mobile: '375px',
        tablet: '768px',
        desktop: '1440px',
      },
    },
  },
  plugins: [],
}
