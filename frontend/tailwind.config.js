/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary-color)',
          hover: 'var(--primary-hover)',
        },
        accent: {
          DEFAULT: 'var(--accent-color)',
          hover: 'var(--accent-hover)',
        },
        surface: {
          DEFAULT: 'var(--bg-dark)',
          light: 'var(--bg-light)',
          card: 'var(--bg-card)',
          secondary: 'var(--secondary-color)',
        },
        border: {
          DEFAULT: 'var(--glass-border)',
          color: 'var(--border-color)',
        },
        text: {
          primary: 'var(--text-white)',
          secondary: 'var(--text-light)',
          muted: 'var(--text-muted)',
        },
        glow: {
          primary: 'var(--glow-primary)',
          accent: 'var(--glow-accent)',
        },
      },
      fontFamily: {
        display: ['Poppins', 'Inter', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1200px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'ring-spin': 'ringSpin 4s linear infinite',
        'ring-spin-reverse': 'ringSpin 6s linear infinite reverse',
        'float': 'float 5s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'bounce-down': 'bounceDown 2s ease-in-out infinite',
        'blob-drift': 'blobDrift 12s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        ringSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        bounceDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
        blobDrift: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '100%': { transform: 'translate(40px, 30px) scale(1.08)' },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
      },
    },
  },
  plugins: [],
};
