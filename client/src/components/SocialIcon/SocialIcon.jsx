import React, { useState, useEffect } from 'react';
import './SocialIcon.css';

const SocialIcon = ({ name, size = 24, color = 'currentColor', hoverColor, className = '' }) => {
  const [svgContent, setSvgContent] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(`/icons/social/${name}.svg`);
        const svgText = await response.text();
        setSvgContent(svgText);
      } catch (error) {
        console.error(`Error loading SVG icon: ${name}`, error);
      }
    };
    
    fetchSvg();
  }, [name]);
  
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
  const iconColor = isHovered && hoverColor ? hoverColor : color;
  
  return (
    <div 
      className={`social-icon ${className}`}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
        color: iconColor
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default SocialIcon; 