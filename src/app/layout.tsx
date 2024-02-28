import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Parity Box',
  description: 'Personal notes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-paper h-screen text-pen`}>
        <header className="py-4 bg-paper border-b border-pen2">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-2xl font-bold"><a href="/">Parity Box</a></h1>
          </div>
        </header>
        <main className="container mx-auto min-w-24 max-w-3xl">{children}</main>
      </body>
    </html>
  );
}
