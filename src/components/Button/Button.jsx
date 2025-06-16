import React from 'react';
import PropTypes from 'prop-types';
import { IoArrowForward } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Button = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  href,
  to,
  onClick,
  type = 'button',
  fullWidth = false,
  disabled = false,
  showIcon = false,
  icon = null,
  iconPosition = 'right',
  ...props 
}) => {
  // Determine base class based on variant
  let baseClass;
  switch(variant) {
    case 'secondary':
      baseClass = 'btn-secondary';
      break;
    case 'ghost':
      baseClass = 'btn-ghost';
      break;
    default:
      baseClass = 'btn-primary';
  }
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  const allClasses = `${baseClass} ${widthClass} ${disabledClass} ${className}`.trim();
  
  // Default icon is arrow, but can be overridden
  const ButtonIcon = icon || IoArrowForward;
  
  const content = (
    <>
      {iconPosition === 'left' && showIcon && (
        <span className="mr-2 transition-transform group-hover:translate-x-[-2px]">
          <ButtonIcon size={18} />
        </span>
      )}
      <span>{children}</span>
      {iconPosition === 'right' && showIcon && (
        <span className="ml-2 transition-transform group-hover:translate-x-[2px]">
          <ButtonIcon size={18} />
        </span>
      )}
    </>
  );
  
  // For internal routing
  if (to) {
    return (
      <Link 
        to={to} 
        className={`${allClasses} group`}
        {...props}
      >
        {content}
      </Link>
    );
  }
  
  // For external links
  if (href) {
    return (
      <a 
        href={href} 
        className={`${allClasses} group`}
        {...props}
      >
        {content}
      </a>
    );
  }
  
  return (
    <button
      type={type}
      className={`${allClasses} group`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  href: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  showIcon: PropTypes.bool,
  icon: PropTypes.elementType,
  iconPosition: PropTypes.oneOf(['left', 'right'])
};

export default Button; 