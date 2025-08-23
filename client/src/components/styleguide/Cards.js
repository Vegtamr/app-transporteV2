import React from 'react';
import { LazyImage } from '../../hooks/useLazyLoad';

function Cards() {
  return (
    <section className="section">
      <h2>Cards</h2>

      <div className="example-group">
        <h3>Card Básica</h3>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Título de la Card</h5>
            <p className="card-text">
              Este es el contenido de una card básica. Puede contener texto, 
              imágenes y acciones.
            </p>
            <button className="btn btn-primary">Acción Principal</button>
          </div>
        </div>
      </div>

      <div className="example-group">
        <h3>Cards de Vehículos</h3>
        <div className="card-grid">
          <div className="card">
            <div className="card-header">
              <span className="badge badge-success">Activo</span>
            </div>
            <div className="card-body">
              <div className="vehicle-icon">
                <i className="fas fa-bus fa-3x text-primary"></i>
              </div>
              <h5 className="card-title">Bus #001</h5>
              <p className="card-subtitle">Mercedes-Benz Sprinter</p>
              <div className="card-stats">
                <div className="stat">
                  <span className="stat-label">Capacidad</span>
                  <span className="stat-value">45</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Km</span>
                  <span className="stat-value">125,430</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Combustible</span>
                  <span className="stat-value">75%</span>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button className="btn btn-sm btn-outline-primary">
                <i className="fas fa-eye"></i> Ver Detalles
              </button>
              <button className="btn btn-sm btn-outline-secondary">
                <i className="fas fa-route"></i> Asignar Ruta
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <span className="badge badge-warning">Mantenimiento</span>
            </div>
            <div className="card-body">
              <div className="vehicle-icon">
                <i className="fas fa-van-shuttle fa-3x text-secondary"></i>
              </div>
              <h5 className="card-title">Van #015</h5>
              <p className="card-subtitle">Toyota Hiace</p>
              <div className="card-stats">
                <div className="stat">
                  <span className="stat-label">Capacidad</span>
                  <span className="stat-value">15</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Km</span>
                  <span className="stat-value">89,200</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Combustible</span>
                  <span className="stat-value">30%</span>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button className="btn btn-sm btn-warning btn-block">
                <i className="fas fa-wrench"></i> En Mantenimiento
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <span className="badge badge-danger">Inactivo</span>
            </div>
            <div className="card-body">
              <div className="vehicle-icon">
                <i className="fas fa-truck fa-3x text-gray"></i>
              </div>
              <h5 className="card-title">Camión #008</h5>
              <p className="card-subtitle">Volvo FH16</p>
              <div className="card-stats">
                <div className="stat">
                  <span className="stat-label">Capacidad</span>
                  <span className="stat-value">20T</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Km</span>
                  <span className="stat-value">250,000</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Combustible</span>
                  <span className="stat-value">0%</span>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button className="btn btn-sm btn-danger btn-block" disabled>
                <i className="fas fa-times"></i> Fuera de Servicio
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="example-group">
        <h3>Card de Estadísticas</h3>
        <div className="stats-grid">
          <div className="card stat-card">
            <div className="card-body">
              <div className="stat-icon bg-primary">
                <i className="fas fa-car"></i>
              </div>
              <div className="stat-content">
                <h3>45</h3>
                <p>Vehículos Activos</p>
                <span className="stat-change positive">
                  <i className="fas fa-arrow-up"></i> 12%
                </span>
              </div>
            </div>
          </div>

          <div className="card stat-card">
            <div className="card-body">
              <div className="stat-icon bg-success">
                <i className="fas fa-route"></i>
              </div>
              <div className="stat-content">
                <h3>128</h3>
                <p>Rutas Completadas</p>
                <span className="stat-change positive">
                  <i className="fas fa-arrow-up"></i> 8%
                </span>
              </div>
            </div>
          </div>

          <div className="card stat-card">
            <div className="card-body">
              <div className="stat-icon bg-warning">
                <i className="fas fa-gas-pump"></i>
              </div>
              <div className="stat-content">
                <h3>2,450L</h3>
                <p>Combustible Consumido</p>
                <span className="stat-change negative">
                  <i className="fas fa-arrow-down"></i> 5%
                </span>
              </div>
            </div>
          </div>

          <div className="card stat-card">
            <div className="card-body">
              <div className="stat-icon bg-info">
                <i className="fas fa-users"></i>
              </div>
              <div className="stat-content">
                <h3>32</h3>
                <p>Conductores</p>
                <span className="stat-change neutral">
                  <i className="fas fa-minus"></i> 0%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="example-group">
        <h3>Card con Imagen (Lazy Loading)</h3>
        <div className="card" style={{ maxWidth: '400px' }}>
          <LazyImage 
            src="https://via.placeholder.com/400x200/2D54A6/ffffff?text=Vehículo" 
            className="card-img-top" 
            alt="Vehículo"
            placeholder="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23f8f9fa'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%236c757d' font-family='sans-serif'%3ECargando...%3C/text%3E%3C/svg%3E"
          />
          <div className="card-body">
            <h5 className="card-title">Nuevo Vehículo Disponible</h5>
            <p className="card-text">
              Se ha agregado un nuevo bus a la flota. Modelo 2024 con capacidad 
              para 50 pasajeros y tecnología híbrida.
            </p>
            <button className="btn btn-primary">Ver Especificaciones</button>
          </div>
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          <i className="fas fa-info-circle"></i> La imagen se carga solo cuando está cerca del viewport
        </p>
      </div>

      <div className="example-group">
        <h3>Galería con Lazy Loading</h3>
        <div className="card-grid">
          {[1, 2, 3, 4, 5, 6].map(num => (
            <div key={num} className="card">
              <LazyImage
                src={`https://via.placeholder.com/300x180/FAB31B/2B2B2B?text=Imagen+${num}`}
                alt={`Imagen ${num}`}
                className="card-img-top"
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">Elemento {num}</h5>
                <p className="card-text">
                  Ejemplo de lazy loading en galería.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Cards;