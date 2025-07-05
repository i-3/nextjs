import About from './About';
import Hero from './Hero';
import Navbar from './Navbar';
import Services from './Services';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';

import { headers } from 'next/headers';
import { getMessages } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const title = messages.T.title;

  return { title };
}

export default async function Home({ params }: Props) {
  const headersList = await headers();
  const ip = headersList.get('x-real-ip');
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'T' });

  return (
    <main className='flex flex-col min-h-screen'>
      <p className=' text-center text-blue-500 text-xs'>
        {t('ip')} {ip}
      </p>

      <Navbar />
      <Hero />
      {/* <About /> */}
      {/* <Services /> */}
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
