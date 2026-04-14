/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#030308',
        immortal: {
          gold: '#d4af37',
          light: '#f5e6a3',
          dark: '#8b7500',
        },
        spirit: {
          cyan: '#00d4ff',
          white: '#e8e4f0',
        },
        blood: {
          crimson: '#8b0000',
          light: '#dc143c',
        },
        jade: {
          green: '#00a86b',
          light: '#7fffd4',
        },
        chaos: {
          purple: '#1a0a2e',
          dark: '#0d0518',
        },
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
        calligraphy: ['serif'],
      },
      animation: {
        'glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float-up 8s ease-in-out infinite',
        'float-reverse': 'float-up-reverse 8s ease-in-out infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'breathe': 'pulse-breathe 4s ease-in-out infinite',
        'fog-drift': 'fog-drift 20s linear infinite',
        'qi-flow': 'qi-flow 3s ease-in-out infinite',
        'border-glow': 'border-glow 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px currentColor', transform: 'scale(1)' },
          '50%': { boxShadow: '0 0 60px currentColor, 0 0 100px currentColor', transform: 'scale(1.1)' },
        },
        'float-up': {
          '0%, 100%': { transform: 'translateY(0) translateX(0) scale(1)', opacity: '0.6' },
          '50%': { transform: 'translateY(-50px) translateX(20px) scale(1.2)', opacity: '1' },
        },
        'float-up-reverse': {
          '0%, 100%': { transform: 'translateY(0) translateX(0) scale(1)', opacity: '0.6' },
          '50%': { transform: 'translateY(50px) translateX(-20px) scale(1.2)', opacity: '1' },
        },
        'rotate-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'pulse-breathe': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.3' },
          '50%': { transform: 'scale(1.05)', opacity: '0.6' },
        },
        'fog-drift': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0%)' },
        },
        'qi-flow': {
          '0%, 100%': { opacity: '0.1', transform: 'scaleX(0.8)' },
          '50%': { opacity: '0.5', transform: 'scaleX(1)' },
        },
        'border-glow': {
          '0%, 100%': { boxShadow: 'inset 0 0 10px rgba(212, 175, 55, 0.2), 0 0 20px rgba(212, 175, 55, 0.1)' },
          '50%': { boxShadow: 'inset 0 0 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.2)' },
        },
      },
    },
  },
  plugins: [],
}