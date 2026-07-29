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
        ecourt: {
          blue: '#0A60C2',       // Official Court Primary Blue (나의전자소송 탭)
          hoverBlue: '#084FA3',
          teal: '#008097',       // Official Court '조회' Search Teal Button
          hoverTeal: '#006B7F',
          darkNavy: '#1C2A45',
          tableHeader: '#F0F4F8',// Official Court Table Header Light Blue-Gray
          border: '#D5DBE2',     // Official Court Table Border
          bg: '#F8F9FA',         // Official Court Main Background
          noticeBg: '#EDF5FC',   // Official Court Notice Box ('참고하세요')
          noticeBorder: '#B2D4F5',
          linkBlue: '#0066CC',   // Official Court Link Blue (Underline)
          footerTop: '#363D48',  // Official Court Footer Top Tier
          footerBottom: '#2B303A',// Official Court Footer Bottom Tier
        },
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Noto Sans KR', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
      }
    },
  },
  plugins: [],
}
