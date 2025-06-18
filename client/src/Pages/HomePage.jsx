import React from 'react';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Services from '../components/Services/Services';
import FAQ from '../components/FAQ/FAQ';
import Contact from '../components/Contact/Contact';

function HomePage() {
  return (
    <>
      <section id="home">
        <Hero />
      </section>
      <About />
      <Services />
      <FAQ />
      <Contact />
    </>
  );
}

export default HomePage; 