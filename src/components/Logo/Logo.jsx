import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ className = '' }) => {
  return (
    <Link to="/" className={`flex items-center ${className}`}>
      <div className="font-bold text-2xl">
        <img src="/logos/balitech-logo.png" alt="BaliTech Logo" className="w-10 h-10" />
      </div>
    </Link>
  );
};

export default Logo; 