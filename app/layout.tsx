import '@/app/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { cookies } from 'next/headers';
import Template from './ui/template';

export const metadata: Metadata = {
  title: {
    template: '%s | Iurii Website',
    default: 'Iurii Website',
  },
  description: 'Iurii Korotkov Next.js demo project.',
  metadataBase: new URL('https://nextjs.1984.lv'),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />

            <main className='w-screen'>
              <SidebarTrigger className='absolute m-2' />

              <Template>{children}</Template>
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
