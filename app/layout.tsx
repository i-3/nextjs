import '@/app/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import Header from '@/app/header';
import { ThemeProvider } from './themeProvider';

export const metadata: Metadata = {
  title: {
    template: '%s | Iurii Site',
    default: 'Iurii Site',
  },
  description: 'My Next.js demo project.',
  metadataBase: new URL('http://nextjs.1984.lv'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <div className='h-screen flex flex-col'>
            <Header />

            <main className='flex flex-1 bg-background'>{children}</main>

            <footer className='flex h-12 items-center justify-center'>
              <a
                href='https://freedns.afraid.org'
                target='_blank'
                className='text-primary hover:underline'
              >
                Free DNS
              </a>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
