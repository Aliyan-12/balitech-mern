import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { IoMailOutline, IoPricetagsOutline } from 'react-icons/io5';
import Button from '../Button/Button';

const Footer = () => {
  return (
    <footer className="bg-[#080d1b] text-white py-16 relative overflow-hidden">
      {/* Background Circuit Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-repeat" style={{
          backgroundSize: '50px 50px',
          backgroundImage: `
            linear-gradient(to right, rgba(244, 149, 35, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(244, 149, 35, 0.05) 1px, transparent 1px)
          `
        }}></div>
      </div>
      
      {/* Glowing Line */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-orange/50 to-transparent mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and company info */}
          <div className="md:col-span-1">
            <div className="font-bold text-2xl">
              <span className="text-white">Bali</span>
              <span className="text-orange">Tech</span>
            </div>
            <p className="mt-4 text-white/60">
              Your trusted BPO partner for exceptional business solutions.
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="#" className="text-orange/60 hover:text-orange transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-orange/60 hover:text-orange transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-orange/60 hover:text-orange transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-orange/60 hover:text-orange transition-colors">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-white/60 hover:text-orange transition-colors">Home</a></li>
              <li><a href="#about" className="text-white/60 hover:text-orange transition-colors">About Us</a></li>
              <li><a href="#services" className="text-white/60 hover:text-orange transition-colors">Services</a></li>
              <li><a href="#faq" className="text-white/60 hover:text-orange transition-colors">FAQ</a></li>
              <li><a href="#contact" className="text-white/60 hover:text-orange transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="text-white/60 hover:text-orange transition-colors">Customer Support</a></li>
              <li><a href="#services" className="text-white/60 hover:text-orange transition-colors">Data Entry</a></li>
              <li><a href="#services" className="text-white/60 hover:text-orange transition-colors">Virtual Assistance</a></li>
              <li><a href="#services" className="text-white/60 hover:text-orange transition-colors">Content Moderation</a></li>
              <li><a href="#services" className="text-white/60 hover:text-orange transition-colors">Technical Support</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-navy/20 p-6 rounded-md border border-orange/10">
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <address className="not-italic text-white/60 mb-4">
              <p>Office number 7, 1st floor, Maryam Business Center, Rawalpindi, 44300, Bali</p>
              <p>Indonesia, 80123</p>
              <p className="mt-4">Email: info@balitech.org</p>
              <p>Phone: +92 3322173140</p>
            </address>
            <Button 
              variant="primary"
              href="#contact"
              fullWidth
              showIcon
            >
              Get in Touch
            </Button>
          </div>
        </div>

        <div className="mt-12 pt-6 text-center">
      
          <div className="border-t border-orange/10 pt-6 text-white/40">
            <p>&copy; {new Date().getFullYear()} BaliTech. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
