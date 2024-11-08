import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    keyframes: {
      blink: {
        '0%, 100%': { opacity: '1' },
        '50%': { opacity: '0' }
      },
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      slideDown: {
        '0%': { transform: 'translateY(-100%)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      },
      slideLeft: {
        '0%': { transform: 'translateX(-100%)', opacity: '0' },
        '100%': { transform: 'translateX(0)', opacity: '1' },
      },
      slideRight: {
        '0%': { transform: 'translateX(100%)', opacity: '0' },
        '100%': { transform: 'translateX(0)', opacity: '1' },
      },
      slideUp: {
        '0%': { transform: 'translateY(100%)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      },
    },
    animation: {
      fadeIn: 'fadeIn 1s ease-in',
      slideDown: 'slideDown 1s ease-out',
      slideLeft: 'slideLeft 1s ease-out',
      slideRight: 'slideRight 1s ease-out',
      slideUp: 'slideUp 1s ease-out',
      blink: 'blink 1.5s ease-in-out infinite',
      cursor: "blink 1s infinite"
    },
  },
  plugins: [],
  safelist: [
    'swiper-button-prev',
    'swiper-button-next',
    'swiper-pagination-bullet',
    'swiper-pagination-bullet-active'
  ]
};
export default config;
