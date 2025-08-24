import React from 'react';

/**
 * Componente Logo reutilizable
 * @param {string} size - Tamaño del logo: 'xs', 'small', 'medium', 'large', 'xl'
 * @param {string} variant - Variante del logo: 'default', 'white', 'dark'
 * @param {string} className - Clases CSS adicionales
 * @param {boolean} showText - Mostrar texto junto al logo
 * @param {function} onClick - Handler para click
 */
function Logo({ 
  size = 'medium', 
  variant = 'default', 
  className = '',
  showText = false,
  onClick = null
}) {
  // Clases CSS para variantes del logo
  const variantClasses = {
    default: '',
    white: 'logo-white',
    dark: 'logo-dark'
  };

  // Construir clases del contenedor
  const containerClasses = [
    'logo-container',
    `logo-container-${size}`,
    onClick ? 'logo-container-clickable' : '',
    className
  ].filter(Boolean).join(' ');

  // Construir clases del logo
  const logoClasses = [
    'logo',
    `logo-${size}`,
    variantClasses[variant]
  ].filter(Boolean).join(' ');

  // Construir clases del texto
  const textClasses = [
    'logo-text',
    `logo-text-${size}`,
    `logo-text-${variant}`
  ].join(' ');

  return (
    <div 
      className={containerClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <img 
        src="/img/logo.svg" 
        alt="App Transporte Logo" 
        className={logoClasses}
      />
      {showText && (
        <span className={textClasses}>
          App Transporte
        </span>
      )}
    </div>
  );
}

export default Logo;