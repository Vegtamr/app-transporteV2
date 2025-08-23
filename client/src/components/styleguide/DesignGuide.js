import React from 'react';

/**
 * Guía de implementación del sistema de diseño
 * Muestra cómo usar los estilos en la aplicación real
 */
function DesignGuide() {
  return (
    <section className="section">
      <h2>Guía de Implementación</h2>
      
      <div className="example-group">
        <h3>Cómo Usar el Sistema de Diseño</h3>
        
        <div className="alert alert-info">
          <i className="fas fa-lightbulb alert-icon"></i>
          <div className="alert-content">
            <div className="alert-title">Sistema Minimalista</div>
            <div className="alert-message">
              Este sistema prioriza la simplicidad y funcionalidad con elementos limpios y espaciado generoso.
            </div>
          </div>
        </div>

        <h4>1. Variables CSS</h4>
        <pre style={{ 
          background: 'var(--surface-color)', 
          padding: 'var(--space-md)',
          borderRadius: 'var(--radius-md)',
          overflow: 'auto'
        }}>
          <code>{`/* Usar siempre variables para consistencia */
.mi-componente {
  color: var(--text-color);
  background: var(--surface-color);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}`}</code>
        </pre>

        <h4>2. Espaciado Fluido</h4>
        <pre style={{ 
          background: 'var(--surface-color)', 
          padding: 'var(--space-md)',
          borderRadius: 'var(--radius-md)',
          overflow: 'auto'
        }}>
          <code>{`/* Espaciado que se adapta al viewport */
.contenedor {
  padding: var(--space-lg);  /* Se ajusta automáticamente */
  margin-bottom: var(--space-xl);
  gap: var(--space-md);
}`}</code>
        </pre>

        <h4>3. Tipografía Responsiva</h4>
        <pre style={{ 
          background: 'var(--surface-color)', 
          padding: 'var(--space-md)',
          borderRadius: 'var(--radius-md)',
          overflow: 'auto'
        }}>
          <code>{`/* Tamaños que escalan suavemente */
h1 { font-size: var(--font-size-3xl); }
h2 { font-size: var(--font-size-2xl); }
p  { font-size: var(--font-size-base); }
small { font-size: var(--font-size-sm); }`}</code>
        </pre>

        <h4>4. Componentes Reutilizables</h4>
        <pre style={{ 
          background: 'var(--surface-color)', 
          padding: 'var(--space-md)',
          borderRadius: 'var(--radius-md)',
          overflow: 'auto'
        }}>
          <code>{`// Ejemplo en React
import { LazyImage } from './hooks/useLazyLoad';

function MiComponente() {
  return (
    <div className="card">
      <LazyImage 
        src="imagen.jpg" 
        alt="Descripción"
        className="card-img-top"
      />
      <div className="card-body">
        <h3 className="card-title">Título</h3>
        <button className="btn btn-primary">
          Acción
        </button>
      </div>
    </div>
  );
}`}</code>
        </pre>
      </div>

      <div className="example-group">
        <h3>Mejores Prácticas</h3>
        
        <div style={{ display: 'grid', gap: 'var(--space-md)' }}>
          <div className="alert alert-success">
            <i className="fas fa-check alert-icon"></i>
            <div className="alert-content">
              <div className="alert-title">✅ Hacer</div>
              <div className="alert-message">
                • Usar variables CSS siempre<br/>
                • Mantener espaciado consistente<br/>
                • Aplicar lazy loading a imágenes<br/>
                • Respetar la paleta de colores
              </div>
            </div>
          </div>

          <div className="alert alert-danger">
            <i className="fas fa-times alert-icon"></i>
            <div className="alert-content">
              <div className="alert-title">❌ Evitar</div>
              <div className="alert-message">
                • Valores hardcodeados (px fijos)<br/>
                • Colores fuera de la paleta<br/>
                • Animaciones excesivas<br/>
                • Sombras muy pronunciadas
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="example-group">
        <h3>Accesibilidad</h3>
        
        <ul style={{ lineHeight: '1.8' }}>
          <li>✓ Contraste mínimo WCAG AA (4.5:1)</li>
          <li>✓ Áreas táctiles de 44x44px mínimo</li>
          <li>✓ Focus visible en todos los elementos interactivos</li>
          <li>✓ Textos alternativos en imágenes</li>
          <li>✓ Navegación por teclado completa</li>
          <li>✓ Respeta <code>prefers-reduced-motion</code></li>
        </ul>
      </div>

      <div className="example-group">
        <h3>Performance</h3>
        
        <div className="stats-grid">
          <div className="card">
            <div className="card-body">
              <h4>Lazy Loading</h4>
              <p className="text-secondary">
                Imágenes cargan solo cuando están cerca del viewport
              </p>
            </div>
          </div>
          
          <div className="card">
            <div className="card-body">
              <h4>CSS Variables</h4>
              <p className="text-secondary">
                Un solo lugar para cambiar todo el tema
              </p>
            </div>
          </div>
          
          <div className="card">
            <div className="card-body">
              <h4>Clamp() Functions</h4>
              <p className="text-secondary">
                Sin media queries, escalado fluido nativo
              </p>
            </div>
          </div>
          
          <div className="card">
            <div className="card-body">
              <h4>Skeleton Loaders</h4>
              <p className="text-secondary">
                Estados de carga que mejoran la percepción
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DesignGuide;