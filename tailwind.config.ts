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
      'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-in-left': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        'fade-in-scale': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          },
          
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        float1: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(10px, 10px)' }
        },
        float2: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-10px, -10px)' }
        },
        float3: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(8px, -8px)' }
        },
        float4: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-8px, 8px)' }
        }
    },
    animation: {
      'gradient-xy': 'gradient-xy 15s ease infinite',
      'float-1': 'float1 4s ease-in-out infinite',
      'float-2': 'float2 4s ease-in-out infinite',
      'float-3': 'float3 4s ease-in-out infinite',
      'float-4': 'float4 4s ease-in-out infinite',
      'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
      'fade-in-left': 'fade-in-left 0.8s ease-out forwards',
      'fade-in-scale': 'fade-in-scale 0.5s ease-out forwards',
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
