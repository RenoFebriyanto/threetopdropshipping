import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Monochrome Editorial
        void: '#000000',
        carbon: '#0A0A0A',
        graphite: '#141414',
        ash: '#1E1E1E',
        smoke: '#2C2C2C',
        fog: '#3D3D3D',
        silver: '#8C8C8C',
        pearl: '#CCCCCC',
        ivory: '#F5F5F0',
        // Accent
        signal: '#E8FF00',
        'signal-dim': '#B8CC00',
      },
      fontFamily: {
        'serif-display': ['"DM Serif Display"', 'Georgia', 'serif'],
        'grotesk': ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        'mono': ['"Space Mono"', '"Courier New"', 'monospace'],
      },
      spacing: {
        xs: '8px',
        sm: '16px',
        md: '24px',
        lg: '32px',
        xl: '48px',
        '2xl': '64px',
        '3xl': '96px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
} satisfies Config;
