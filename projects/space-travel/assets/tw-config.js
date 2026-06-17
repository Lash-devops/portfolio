/* Общий конфиг Tailwind (Play CDN). Подключается ПОСЛЕ cdn.tailwindcss.com */
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        space: { 950: '#04050d', 900: '#080b1a', 800: '#0f1430', 700: '#1a2150', 600: '#283269' },
        accent: { 300: '#67e8f9', 400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2' },
        nebula: { 300: '#c4b5fd', 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed' },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 28s linear infinite',
        'spin-rev': 'spin 40s linear infinite reverse',
        'float': 'float 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-18px)' } },
        pulseGlow: { '0%,100%': { opacity: 0.5 }, '50%': { opacity: 1 } },
      },
    },
  },
};
