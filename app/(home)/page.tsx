import About from './About';
import Hero from './Hero';
import Navbar from './Navbar';
import Services from './Services';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';

export default function Home() {
  return (
    <main className='flex flex-col min-h-screen'>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
