import { useEffect, useRef, useState } from 'react';

/**
 * Hook personalizado para lazy loading de imágenes
 * Usa Intersection Observer para cargar imágenes solo cuando están por aparecer en pantalla
 * 
 * @param {Object} options - Opciones del observer
 * @param {number} options.threshold - Porcentaje del elemento visible para activar (0-1)
 * @param {string} options.rootMargin - Margen alrededor del viewport para pre-cargar
 * @returns {Array} [ref, isIntersecting] - Referencia y estado de intersección
 */
export const useLazyLoad = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Crear observer para detectar cuando el elemento está cerca del viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          
          // Si el elemento tiene data-src, cargar la imagen real
          if (element.dataset.src) {
            element.src = element.dataset.src;
            element.classList.add('loaded');
            delete element.dataset.src;
          }
          
          // Desconectar observer después de cargar
          observer.disconnect();
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '50px', // Pre-cargar 50px antes
      }
    );

    observer.observe(element);

    // Cleanup al desmontar
    return () => {
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin]);

  return [ref, isIntersecting];
};

/**
 * Componente de imagen con lazy loading automático
 * Muestra un placeholder hasta que la imagen esté cerca del viewport
 */
export const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3Crect width="1" height="1" fill="%23f8f9fa"/%3E%3C/svg%3E',
  ...props 
}) => {
  const [ref, isLoaded] = useLazyLoad();

  return (
    <img
      ref={ref}
      src={placeholder}
      data-src={src}
      alt={alt}
      className={`${className} ${isLoaded ? 'loaded' : ''}`}
      {...props}
    />
  );
};

export default useLazyLoad;