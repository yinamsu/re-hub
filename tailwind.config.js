/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        court: {
          navy: '#1B2E4B',
          darkNavy: '#0A192F',
          blue: '#004E98',
          slate: '#4A5568',
          bg: '#F8FAFC',
          panel: '#F1F5F9',
          border: '#CBD5E1',
          crimson: '#C53030',
          amber: '#D69E2E',
          green: '#2F855A',
        },
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#1B2E4B',
          900: '#0A192F',
          950: '#060F1E',
        },
      },
      borderRadius: {
        'sharp': '2px',
        'court': '4px',
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Noto Sans KR', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
      }
    },
  },
  plugins: [],
}
