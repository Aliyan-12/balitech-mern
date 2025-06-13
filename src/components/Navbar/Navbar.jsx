import React, { useState, useEffect } from 'react';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { IoCloseOutline, IoBriefcaseOutline } from 'react-icons/io5';
import Button from '../Button/Button';

const Logo = () => {
  return (
    <a href="#" className="flex items-center">
      <div className="font-bold text-2xl">
      <img src="/logos/balitech-logo.png" alt="BaliTech Logo" className="w-25 h-10" />

      </div>
    </a>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Navigation links
  const navLinks = [
    { name: 'Home', path: '#home' },
    { name: 'Services', path: '#services' },
    { name: 'About', path: '#about' },
    { name: 'FAQ', path: '#faq' },
    { name: 'Contact', path: '#contact' },
  ];

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#080d1b] py-2 shadow-[0_0_10px_rgba(244,149,35,0.15)]' 
          : 'bg-[#080d1b] py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="text-white hover:text-orange font-medium transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-orange transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <Button 
              variant="primary"
              href="#careers"
              showIcon
              icon={IoBriefcaseOutline}
            >
              Careers
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <IoCloseOutline size={28} />
            ) : (
              <HiOutlineMenuAlt3 size={28} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden fixed inset-0 bg-[#080d1b] z-40 transition-transform transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '64px' }}
      >
        <nav className="flex flex-col h-full pt-8 px-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="text-white/80 hover:text-orange py-4 text-xl font-medium border-b border-orange/10"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Button 
            variant="primary"
            href="#careers"
            className="mt-8"
            showIcon
            icon={IoBriefcaseOutline}
            onClick={() => setIsOpen(false)}
          >
            Careers
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
