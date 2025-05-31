/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00f3ff',
        'neon-purple': '#b300ff',
        'neon-pink': '#ff00f3',
        'dark-gray': '#1a1a1a',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 10px #00f3ff' },
          '100%': { textShadow: '0 0 20px #00f3ff, 0 0 30px #00f3ff' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 