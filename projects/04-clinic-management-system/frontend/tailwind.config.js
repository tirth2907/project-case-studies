/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#030303',
        noir: '#0A0A0A',
        surface: '#111111',
        'surface-elevated': '#18181B',
        'surface-card': '#141416',
        'border-subtle': 'rgba(255, 255, 255, 0.08)',
        'border-hover': 'rgba(255, 255, 255, 0.18)',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A1A1AA',
        'text-muted': '#71717A',
        accent: {
          silver: '#E4E4E7',
          steel: '#94A3B8',
          slate: '#64748B',
          glow: 'rgba(255, 255, 255, 0.05)',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        widest: '0.25em',
        tightest: '-0.04em',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass-subtle': '0 4px 30px rgba(0, 0, 0, 0.5)',
        'glass-rim': '0 0 0 1px rgba(255, 255, 255, 0.08), 0 20px 50px rgba(0, 0, 0, 0.7)',
        'spotlight': '0 0 100px -20px rgba(255, 255, 255, 0.08)',
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
