import React from 'react';
import SocialIcon from '../SocialIcon';
import './SocialIcons.css';

const SocialIcons = ({ size = 24, color = 'var(--text-color)', hoverColor = 'var(--accent-color)', className = '' }) => {
  const socialLinks = [
    { name: 'twitter', href: '#' },
    { name: 'instagram', href: '#' },
    { name: 'linkedin', href: '#' },
    { name: 'github', href: '#' }
  ];

  return (
    <div className={`social-icons ${className}`}>
      {socialLinks.map((link, index) => (
        <a 
          key={index} 
          href={link.href} 
          className="social-icons-link"
          target="_blank" 
          rel="noopener noreferrer"
          aria-label={link.name}
        >
          <SocialIcon 
            name={link.name} 
            size={size} 
            color={color} 
            hoverColor={hoverColor} 
          />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons; 