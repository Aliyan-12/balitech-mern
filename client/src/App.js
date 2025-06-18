import React from 'react';
import Navbar from './components/Navbar/Navbar';
// import Hero from './components/Hero/Hero';
// import About from './components/About/About';
// import Services from './components/Services/Services';
// import WhyUs from './components/WhyUs/WhyUS';
// import Pricing from './components/Pricing/Pricing';
// import Projects from './components/Projects/Projects';
// import FAQs from './components/FAQs/FAQs';
// import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      {/* <div className="main-content"> */}
        {/* <Hero /> */}
        {/* <div className="sections"> */}
          {/* <About /> */}
          {/* <WhyUs /> */}
          {/* <Services /> */}
          {/* <Pricing /> */}
          {/* <Projects /> */}
          {/* <FAQs />
          <Contact /> */}
        {/* </div> */}
        <Footer />
      {/* </div> */}
    </div>
  );
}

export default App; 