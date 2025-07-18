import '@/app/globals.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Header } from '@/components/header';
import { cookies } from 'next/headers';
import Template from './ui/template';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

export const metadata: Metadata = {
  // title: {
  //   template: '%s | Iurii Korotkov',
  //   default: 'Iurii Korotkov',
  // },
  description:
    'Next.js project deployed on Oracle Cloud Infrastructure with Ubuntu LTS instance, Nginx web server and Certbot certificate.',
  metadataBase: new URL('https://www.iurii.lv/'),

  keywords: [
    'Iurii',
    'Korotkov',
    'Latvia',
    'Riga',
    'developer',
    'mobile',
    'web',
  ],
  authors: [{ name: 'Iurii Korotkov' }],
  publisher: 'Iurii Korotkov',
  // alternates: { canonical: '/' },
  robots: 'all',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={`${inter.className} antialiased overflow-x-hidden`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider defaultOpen={defaultOpen}>
              <AppSidebar />
              {/* <Header /> */}

              <main className='w-screen'>
                <SidebarTrigger className='m-4' />

                <Template>{children}</Template>
              </main>
            </SidebarProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
