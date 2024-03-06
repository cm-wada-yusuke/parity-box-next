import type { Config } from 'tailwindcss';

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
        // 全体的な背景色
        background: 'hsl(var(--background))',

        // 全体的な文字色
        foreground: 'hsl(var(--foreground))',

        hover: 'hsl(var(--hover))',

        // サブ的要素の背景色、文字色
        muted: {
          // 背景色
          DEFAULT: 'hsl(var(--muted))',
          // 文字色
          foreground: 'hsl(var(--muted-foreground))',
        },

        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
