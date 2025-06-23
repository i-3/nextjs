import About from './About';
import Hero from './Hero';
import Navbar from './Navbar';
import Services from './Services';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';

// import { NextRequest } from 'next/server';
import { headers } from 'next/headers';

export default async function Home() {
  const headersList = await headers();
  // const xRealIp = request.headers.get('x-real-ip');
  // const xForwardedFor = request.headers.get('x-forwarded-for');

  // Use the IP addresses as needed
  // let clientIp = xRealIp || xForwardedFor?.split(',')[0] || request.ip;
  console.log(headersList.get('x-real-ip'));
  console.log(headersList.get('x-forwarded-for'));

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
