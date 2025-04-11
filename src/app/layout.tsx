import { Inter } from 'next/font/google';
import './globals.css';

// prism-themesを追加
import 'prism-themes/themes/prism-vsc-dark-plus.min.css';
import Link from 'next/link';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const viewport = {
  themeColor: '#18181b',
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
        className={`${inter.className} flex h-screen flex-col justify-between`}
      >
        <section>
          <header className="border-b border-foreground py-4">
            <div className="w-full">
              <h1 className="text-center text-2xl font-bold">
                <a href="/">waddyu log</a>
              </h1>
            </div>
          </header>
          <main>{children}</main>
        </section>
        <section className="flex justify-center">
          <footer className="w-full py-8 text-center">
            <p>
              &copy; {new Date().getFullYear()}&nbsp;
              <Link
                className="underline"
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
