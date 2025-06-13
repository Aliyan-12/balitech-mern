import React, { useEffect } from 'react';
import './Hero.css';
import { motion } from 'framer-motion';
import Button from '../Button/Button';
import { IoRocketOutline, IoSearchOutline, IoStarOutline } from 'react-icons/io5';

const Hero = () => {
  useEffect(() => {
    // Create random particles effect
    const createParticles = () => {
      const heroSection = document.querySelector('.hero-container');
      if (!heroSection) return;
      
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('tech-particle');
        
        // Random size between 2-4px
        const size = Math.random() * 2 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random opacity
        particle.style.opacity = `${Math.random() * 0.3 + 0.1}`;
        
        // Random animation duration
        const duration = Math.random() * 30 + 10;
        particle.style.animation = `float ${duration}s ease-in-out infinite`;
        
        heroSection.appendChild(particle);
      }
    };
    
    createParticles();
    
    return () => {
      // Cleanup particles on component unmount
      const particles = document.querySelectorAll('.tech-particle');
      particles.forEach(particle => particle.remove());
    };
  }, []);
  
  return (
    <div className="hero-container">
      {/* Simplified Background Elements */}
      <div className="hero-grid"></div>

      <div className="hero-content px-4 py-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-2 text-white/70 tracking-[6px] uppercase text-sm"
          >
            Sky is the Limit


            
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-3 hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            BaliTech BPO Solutions
          </motion.h1>
          
          <div className="glowing-line"></div>
          
          <motion.p 
            className="text-xl md:text-2xl hero-subtitle max-w-3xl mx-auto mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Elevate customer experiences with our cutting-edge
            <span className="highlight-text"> telecom & IT solutions</span>
          </motion.p>
          
          <motion.div 
            className="mt-12 flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button 
              variant="primary" 
              href="#contact"
              showIcon
              icon={IoRocketOutline}
            >
              Start Your BPO Journey
            </Button>
            <Button 
              variant="secondary" 
              href="#services"
              showIcon
              icon={IoSearchOutline}
            >
              Explore Our Call Centers
            </Button>
           
          </motion.div>
          
          {/* BPO Feature Points */}
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
          >
            <div className="text-center backdrop-blur-sm bg-navy/20 px-4 py-6 rounded-md border border-orange/10">
              <span className="text-3xl block mb-2 text-orange">24/7</span>
              <span className="text-sm">Call Center Support</span>
            </div>
            <div className="text-center backdrop-blur-sm bg-navy/20 px-4 py-6 rounded-md border border-orange/10">
              <span className="text-3xl block mb-2 text-orange">Multi</span>
              <span className="text-sm">Channel Solutions</span>
            </div>
            <div className="text-center backdrop-blur-sm bg-navy/20 px-4 py-6 rounded-md border border-orange/10">
              <span className="text-3xl block mb-2 text-orange">CRM</span>
              <span className="text-sm">Integration Ready</span>
            </div>
            <div className="text-center backdrop-blur-sm bg-navy/20 px-4 py-6 rounded-md border border-orange/10">
              <span className="text-3xl block mb-2 text-orange">Voice</span>
              <span className="text-sm">Analytics & AI</span>
            </div>
          </motion.div>

          {/* Call Center Stats Ticker */}
          <motion.div
            className="mt-16 py-2 bg-navy/30 backdrop-blur-md border-y border-orange/10 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="stats-ticker">
              <div className="stats-content">
                <span className="mx-4">98% Customer Satisfaction</span>
                <span className="mx-4">|</span>
                <span className="mx-4">500+ Dedicated Agents</span>
                <span className="mx-4">|</span>
                <span className="mx-4">12 Global Locations</span>
                <span className="mx-4">|</span>
                <span className="mx-4">20+ Languages Supported</span>
                <span className="mx-4">|</span>
                <span className="mx-4">10,000+ Daily Interactions</span>
                <span className="mx-4">|</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
