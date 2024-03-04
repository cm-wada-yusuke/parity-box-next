import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// prism-themesを追加
import 'prism-themes/themes/prism-vsc-dark-plus.min.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'waddyu log',
  description: 'Personal notes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} h-screen`}>
        <header className="py-4 border-b border-foreground">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-center text-2xl font-bold">
              <a href="/">waddyu log</a>
            </h1>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
