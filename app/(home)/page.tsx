import About from './About';
import Hero from './Hero';
import Navbar from './Navbar';
import Services from './Services';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';

import { headers } from 'next/headers';

export default async function Home() {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent');
  const host = headersList.get('host');

  return (
    <main className='flex flex-col min-h-screen'>
      <p>{headersList}</p>

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
