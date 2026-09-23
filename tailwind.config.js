/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      maxWidth: { content: '1256px' },
      fontFamily: {
        sans: ['Pretendard Variable', 'Apple SD Gothic Neo', 'Malgun Gothic', 'sans-serif'],
      },
      colors: {
        primary: '#00A1FF',
        foreground: '#2F3438',
        muted: '#828C94',
        surface: '#F7F9FA',
        line: '#EAEDEF',
        sale: '#FF7777',
      },
    },
  },
  plugins: [],
}
