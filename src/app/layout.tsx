import { Inter, JetBrains_Mono, Noto_Sans_JP } from 'next/font/google';
import './globals.css';

// prism-themesを追加
import 'prism-themes/themes/prism-vsc-dark-plus.min.css';
import Link from 'next/link';
import Script from 'next/script';

// 本文: Inter（欧文）+ Noto Sans JP（和文）。見出しも Noto Sans JP の太字 600/700（DESIGN.md: wired-light）。
// キッカー・メタ情報: JetBrains Mono。
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains-mono',
});

export const viewport = {
  themeColor: '#f7f7f5',
};

export const metadata = {
  title: 'waddyu log',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  ),
  openGraph: {
    title: 'Posts — waddyu log',
    url: 'https://waddyu.dev/',
    // images: '/assets/osgsm-banner.png',
    type: 'website',
  },
  twitter: {
    title: 'Posts — waddyu log',
    card: 'summary',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/mermaid/dist/mermaid.min.css"
        ></link>
        <Script
          strategy="beforeInteractive"
          src="https://unpkg.com/mermaid@11/dist/mermaid.min.js"
        />
      </head>
      <body
        className={`${inter.variable} ${notoSansJp.variable} ${jetbrainsMono.variable} flex h-screen flex-col justify-between font-sans`}
      >
        <section>
          <header className="mx-auto max-w-4xl px-4 pt-6">
            <h1 className="text-center font-display text-3xl font-bold tracking-tight">
              <a href="/" className="text-ink hover:text-ink">
                waddyu log
              </a>
            </h1>
            {/* ブロードシートの thick-thin ダブルルール（DESIGN.md: masthead） */}
            <div className="mt-4 border-b-2 border-ink" />
            <div className="mt-[3px] border-b border-hairline" />
          </header>
          <main>{children}</main>
        </section>
        <section className="flex justify-center">
          <footer className="w-full border-t border-hairline py-8 text-center font-mono text-xs text-muted">
            <p>
              &copy; {new Date().getFullYear()}&nbsp;
              <Link
                className="text-link underline hover:text-link-active"
                target="_blank"
                href="https://twitter.com/waddy_u"
              >
                waddy_u
              </Link>
            </p>
          </footer>
        </section>
      </body>
    </html>
  );
}
