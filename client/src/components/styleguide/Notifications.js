import React, { useState } from 'react';

function Notifications() {
  const [toasts, setToasts] = useState([]);

  const showToast = (type, message) => {
    const id = Date.now();
    const newToast = { id, type, message };
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  return (
    <section className="section">
      <h2>Notificaciones</h2>

      <div className="example-group">
        <h3>Alertas Estáticas</h3>
        
        <div className="notification notification-success">
          <i className="fas fa-check-circle"></i>
          <div className="notification-content">
            <strong>¡Éxito!</strong> La operación se completó correctamente.
          </div>
          <button className="close-btn">×</button>
        </div>

        <div className="notification notification-info">
          <i className="fas fa-info-circle"></i>
          <div className="notification-content">
            <strong>Información:</strong> Nuevo vehículo disponible en la flota.
          </div>
          <button className="close-btn">×</button>
        </div>

        <div className="notification notification-warning">
          <i className="fas fa-exclamation-triangle"></i>
          <div className="notification-content">
            <strong>Advertencia:</strong> El vehículo #003 requiere mantenimiento pronto.
          </div>
          <button className="close-btn">×</button>
        </div>

        <div className="notification notification-danger">
          <i className="fas fa-times-circle"></i>
          <div className="notification-content">
            <strong>Error:</strong> No se pudo completar la asignación de ruta.
          </div>
          <button className="close-btn">×</button>
        </div>
      </div>

      <div className="example-group">
        <h3>Alertas con Acciones</h3>
        
        <div className="notification notification-info">
          <i className="fas fa-bell"></i>
          <div className="notification-content">
            <strong>Nueva Notificación</strong>
            <p>Tienes 3 nuevas asignaciones de ruta pendientes de revisión.</p>
            <div className="notification-actions">
              <button className="btn btn-sm btn-primary">Ver Ahora</button>
              <button className="btn btn-sm btn-outline-secondary">Más Tarde</button>
            </div>
          </div>
          <button className="close-btn">×</button>
        </div>

        <div className="notification notification-warning">
          <i className="fas fa-gas-pump"></i>
          <div className="notification-content">
            <strong>Combustible Bajo</strong>
            <p>El Bus #001 tiene menos del 20% de combustible.</p>
            <div className="notification-actions">
              <button className="btn btn-sm btn-warning">Programar Reabastecimiento</button>
            </div>
          </div>
          <button className="close-btn">×</button>
        </div>
      </div>

      <div className="example-group">
        <h3>Toast Notifications (Click para mostrar)</h3>
        <div className="button-group">
          <button 
            className="btn btn-success"
            onClick={() => showToast('success', 'Operación exitosa!')}
          >
            Toast Éxito
          </button>
          <button 
            className="btn btn-info"
            onClick={() => showToast('info', 'Nueva información disponible')}
          >
            Toast Info
          </button>
          <button 
            className="btn btn-warning"
            onClick={() => showToast('warning', 'Precaución requerida')}
          >
            Toast Advertencia
          </button>
          <button 
            className="btn btn-danger"
            onClick={() => showToast('danger', 'Error en la operación')}
          >
            Toast Error
          </button>
        </div>

        {/* Toast Container */}
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
          {toasts.map(toast => (
            <div 
              key={toast.id}
              className={`toast toast-${toast.type} show`}
              style={{ marginBottom: '10px' }}
            >
              <i className={`fas fa-${
                toast.type === 'success' ? 'check-circle' : 
                toast.type === 'danger' ? 'times-circle' : 
                toast.type === 'warning' ? 'exclamation-triangle' : 
                'info-circle'
              }`}></i>
              <span>{toast.message}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="example-group">
        <h3>Badges y Etiquetas</h3>
        
        <div style={{ marginBottom: '1rem' }}>
          <span className="badge badge-primary">Primario</span>
          <span className="badge badge-secondary">Secundario</span>
          <span className="badge badge-success">Éxito</span>
          <span className="badge badge-danger">Peligro</span>
          <span className="badge badge-warning">Advertencia</span>
          <span className="badge badge-info">Info</span>
          <span className="badge badge-light">Light</span>
          <span className="badge badge-dark">Dark</span>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <h4>Badges con Contador</h4>
          <button className="btn btn-primary">
            Notificaciones <span className="badge badge-light">4</span>
          </button>
          <button className="btn btn-secondary" style={{ marginLeft: '0.5rem' }}>
            Mensajes <span className="badge badge-danger">99+</span>
          </button>
        </div>

        <div>
          <h4>Estados de Vehículos</h4>
          <span className="badge badge-success">
            <i className="fas fa-check"></i> Activo
          </span>
          <span className="badge badge-warning">
            <i className="fas fa-wrench"></i> Mantenimiento
          </span>
          <span className="badge badge-danger">
            <i className="fas fa-times"></i> Inactivo
          </span>
          <span className="badge badge-info">
            <i className="fas fa-route"></i> En Ruta
          </span>
          <span className="badge badge-secondary">
            <i className="fas fa-parking"></i> Estacionado
          </span>
        </div>
      </div>

      <div className="example-group">
        <h3>Progress Bars</h3>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label>Progreso de Ruta (75%)</label>
          <div className="progress">
            <div className="progress-bar" style={{ width: '75%' }}>75%</div>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label>Niveles de Combustible</label>
          <div className="progress" style={{ marginBottom: '0.5rem' }}>
            <div className="progress-bar bg-success" style={{ width: '90%' }}>Bus #001 - 90%</div>
          </div>
          <div className="progress" style={{ marginBottom: '0.5rem' }}>
            <div className="progress-bar bg-warning" style={{ width: '35%' }}>Van #015 - 35%</div>
          </div>
          <div className="progress" style={{ marginBottom: '0.5rem' }}>
            <div className="progress-bar bg-danger" style={{ width: '15%' }}>Camión #008 - 15%</div>
          </div>
        </div>

        <div>
          <label>Capacidad de Flota</label>
          <div className="progress">
            <div className="progress-bar bg-info progress-bar-striped progress-bar-animated" 
                 style={{ width: '60%' }}>
              60% Utilizado
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Notifications;