import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

// カラー・タイポグラフィは DESIGN.md（wired-light design tokens）の定義に準拠する
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/libs/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#f7f7f5',
          raised: '#ededea',
        },
        ink: '#3a3a3e',
        body: {
          DEFAULT: '#505054',
          strong: '#454549',
        },
        muted: {
          DEFAULT: '#8a8a87',
          soft: '#a6a6a2',
        },
        hairline: {
          DEFAULT: '#e2e2df',
          strong: '#c4c4c0',
        },
        link: {
          DEFAULT: '#4059cf',
          active: '#32479f',
        },
        'on-link': '#ffffff',
        success: '#338a4e',
        warning: '#b3891a',
        error: '#c44536',
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'var(--font-noto-sans-jp)',
          ...defaultTheme.fontFamily.sans,
        ],
        display: [
          'var(--font-noto-sans-jp)',
          'var(--font-inter)',
          ...defaultTheme.fontFamily.sans,
        ],
        mono: ['var(--font-jetbrains-mono)', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
