import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// prism-themesを追加
import 'prism-themes/themes/prism-vsc-dark-plus.min.css';

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
      <body
        className={`${inter.className} h-screen flex flex-col justify-between`}
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
          <footer className="w-full text-center py-8">
            <p>&copy; {new Date().getFullYear()} waddyu</p>
          </footer>
        </section>
      </body>
    </html>
  );
}
