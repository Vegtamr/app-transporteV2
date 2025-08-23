import React from 'react';

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
        <h3>Card con Imagen</h3>
        <div className="card" style={{ maxWidth: '400px' }}>
          <img 
            src="https://via.placeholder.com/400x200/2D54A6/ffffff?text=Vehículo" 
            className="card-img-top" 
            alt="Vehículo"
          />
          <div className="card-body">
            <h5 className="card-title">Nuevo Vehículo Disponible</h5>
            <p className="card-text">
              Se ha agregado un nuevo bus a la flota. Modelo 2024 con capacidad 
              para 50 pasajeros y tecnología híbrida.
            </p>
            <a href="#" className="btn btn-primary">Ver Especificaciones</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cards;