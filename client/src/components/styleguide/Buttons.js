import React, { useState } from 'react';

function Buttons() {
  const [loading, setLoading] = useState({});

  const handleLoadingClick = (buttonId) => {
    setLoading(prev => ({ ...prev, [buttonId]: true }));
    setTimeout(() => {
      setLoading(prev => ({ ...prev, [buttonId]: false }));
    }, 2000);
  };

  return (
    <section className="section">
      <h2>Botones</h2>

      <div className="surface-padded-section">
        <h3>Botones Primarios</h3>
        <div className="button-group">
          <button className="btn btn-primary">Primario</button>
          <button className="btn btn-primary btn-size-lg">Grande</button>
          <button className="btn btn-primary btn-size-sm">Pequeño</button>
          <button className="btn btn-primary" disabled>Deshabilitado</button>
          <button 
            className={`btn btn-primary ${loading.primary ? 'loading' : ''}`}
            onClick={() => handleLoadingClick('primary')}
            disabled={loading.primary}
          >
            {loading.primary ? '' : 'Con Loading'}
          </button>
        </div>
      </div>

      <div className="surface-padded-section">
        <h3>Botones Secundarios</h3>
        <div className="button-group">
          <button className="btn btn-secondary">Secundario</button>
          <button className="btn btn-secondary btn-size-lg">Grande</button>
          <button className="btn btn-secondary btn-size-sm">Pequeño</button>
          <button className="btn btn-secondary" disabled>Deshabilitado</button>
        </div>
      </div>

      <div className="surface-padded-section">
        <h3>Botones de Estado</h3>
        <div className="button-group">
          <button className="btn btn-success">
            <i className="fas fa-check"></i> Éxito
          </button>
          <button className="btn btn-warning">
            <i className="fas fa-exclamation-triangle"></i> Advertencia
          </button>
          <button className="btn btn-danger">
            <i className="fas fa-times"></i> Peligro
          </button>
          <button className="btn btn-info">
            <i className="fas fa-info-circle"></i> Información
          </button>
        </div>
      </div>

      <div className="surface-padded-section">
        <h3>Botones Outline</h3>
        <div className="button-group">
          <button className="btn btn-outline-primary">Primario</button>
          <button className="btn btn-outline-secondary">Secundario</button>
          <button className="btn btn-outline-success">Éxito</button>
          <button className="btn btn-outline-danger">Peligro</button>
        </div>
      </div>

      <div className="surface-padded-section">
        <h3>Botones de Icono</h3>
        <div className="button-group">
          <button className="btn btn-icon-only btn-primary">
            <i className="fas fa-plus"></i>
          </button>
          <button className="btn btn-icon-only btn-secondary">
            <i className="fas fa-edit"></i>
          </button>
          <button className="btn btn-icon-only btn-danger">
            <i className="fas fa-trash"></i>
          </button>
          <button className="btn btn-icon-only btn-success">
            <i className="fas fa-download"></i>
          </button>
        </div>
      </div>

      <div className="surface-padded-section">
        <h3>Grupos de Botones</h3>
        <div className="btn-group">
          <button className="btn btn-primary">Izquierda</button>
          <button className="btn btn-primary">Centro</button>
          <button className="btn btn-primary">Derecha</button>
        </div>
      </div>

      <div className="surface-padded-section">
        <h3>Botones de Ancho Completo</h3>
        <button className="btn btn-primary btn-block">Botón de Ancho Completo</button>
        <button className="btn btn-secondary btn-block" style={{ marginTop: '1rem' }}>
          Otro Botón de Ancho Completo
        </button>
      </div>
    </section>
  );
}

export default Buttons;