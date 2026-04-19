import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        crimson: '#8B0A39',
        crimsonDark: '#6B0829',
        crimsonLight: '#F9EEF2',
        navy: '#0F2B4D',
        navyMid: '#1A3F6F',
        offWhite: '#F7F9FC',
        lightGray: '#EEF2F7',
        border: '#D4DDE8',
        bodyText: '#2C3E50',
        mutedText: '#6B8299',
        green: '#1A7A4A',
        amber: '#B45309',
        red: '#C0392B',
      },
    },
  },
  plugins: [],
};

export default config;
