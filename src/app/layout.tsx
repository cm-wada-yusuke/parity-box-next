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
      <body className={inter.className}>
        <main className='bg-white'>
          <div className="bg-white container mx-auto px-4 max-w-3xl">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
