import React, { useState } from 'react';

function Navigation() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="section">
      <h2>Navegación</h2>

      <div className="example-group">
        <h3>Navbar Principal con Menú Móvil</h3>
        <div className="navbar-demo">
          <nav className="navbar">
            <div className="navbar-container">
              <div className="navbar-brand">
                <img src="/img/logo.png" alt="Logo" className="navbar-logo" />
              </div>

              <ul className="navbar-menu">
                <li className="navbar-item">
                  <a href="#inicio" className="navbar-link active">Inicio</a>
                </li>
                <li className="navbar-item">
                  <a href="#vehiculos" className="navbar-link">Vehículos</a>
                </li>
                <li className="navbar-item navbar-dropdown">
                  <button 
                    className="navbar-link"
                    onClick={() => setActiveDropdown(activeDropdown === 'rutas' ? null : 'rutas')}
                  >
                    Rutas <i className="fas fa-chevron-down"></i>
                  </button>
                  {activeDropdown === 'rutas' && (
                    <div className="navbar-dropdown-menu">
                      <a href="#rutas-activas" className="navbar-dropdown-link">Rutas Activas</a>
                      <a href="#rutas-programadas" className="navbar-dropdown-link">Programadas</a>
                      <a href="#rutas-historico" className="navbar-dropdown-link">Histórico</a>
                      <hr className="dropdown-divider" />
                      <a href="#nueva-ruta" className="navbar-dropdown-link">
                        <i className="fas fa-plus"></i> Nueva Ruta
                      </a>
                    </div>
                  )}
                </li>
                <li className="navbar-item">
                  <a href="#reportes" className="navbar-link">Reportes</a>
                </li>
              </ul>

              <button 
                className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>

            {/* Menú Móvil Desplegable */}
            <div className={`navbar-mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
              <ul className="navbar-mobile-list">
                <li className="navbar-mobile-item">
                  <a href="#inicio" className="navbar-mobile-link active">
                    <i className="fas fa-home"></i>
                    Inicio
                  </a>
                </li>
                <li className="navbar-mobile-item">
                  <a href="#vehiculos" className="navbar-mobile-link">
                    <i className="fas fa-truck"></i>
                    Vehículos
                  </a>
                </li>
                <li className="navbar-mobile-item">
                  <button 
                    className="navbar-mobile-link navbar-mobile-dropdown-toggle"
                    onClick={() => setActiveDropdown(activeDropdown === 'mobile-rutas' ? null : 'mobile-rutas')}
                  >
                    <i className="fas fa-route"></i>
                    Rutas
                    <i className={`fas fa-chevron-down ${activeDropdown === 'mobile-rutas' ? 'rotated' : ''}`}></i>
                  </button>
                  {activeDropdown === 'mobile-rutas' && (
                    <div className="navbar-mobile-submenu">
                      <a href="#rutas-activas" className="navbar-mobile-sublink">
                        Rutas Activas
                      </a>
                      <a href="#rutas-programadas" className="navbar-mobile-sublink">
                        Programadas
                      </a>
                      <a href="#rutas-historico" className="navbar-mobile-sublink">
                        Histórico
                      </a>
                      <a href="#nueva-ruta" className="navbar-mobile-sublink">
                        <i className="fas fa-plus"></i> Nueva Ruta
                      </a>
                    </div>
                  )}
                </li>
                <li className="navbar-mobile-item">
                  <a href="#reportes" className="navbar-mobile-link">
                    <i className="fas fa-chart-bar"></i>
                    Reportes
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          <i className="fas fa-info-circle"></i> Redimensiona la ventana para ver el comportamiento responsivo
        </p>
      </div>

      <div className="example-group">
        <h3>Navbar Minimalista</h3>
        <div className="navbar-minimal-demo">
          <nav className="navbar-minimal">
            <div className="navbar-minimal-brand">Brand</div>
            <div className="navbar-minimal-links">
              <a href="#" className="navbar-minimal-link active">Inicio</a>
              <a href="#" className="navbar-minimal-link">Servicios</a>
              <a href="#" className="navbar-minimal-link">Contacto</a>
            </div>
            <button className="btn btn-outline-primary btn-sm">
              Acceder
            </button>
          </nav>
        </div>
      </div>

      <div className="example-group">
        <h3>Navbar con Búsqueda</h3>
        <div className="navbar-search-demo">
          <nav className="navbar-search">
            <div className="navbar-search-brand">
              <i className="fas fa-bus"></i>
              FleetManager
            </div>
            
            <div className="navbar-search-box">
              <input 
                type="search" 
                className="navbar-search-input" 
                placeholder="Buscar vehículos, rutas..."
              />
              <i className="fas fa-search navbar-search-icon"></i>
            </div>

            <div className="navbar-search-actions">
              <button className="btn btn-primary">
                <i className="fas fa-plus"></i> Nuevo
              </button>
              <button className="btn btn-icon btn-outline-primary">
                <i className="fas fa-cog"></i>
              </button>
            </div>
          </nav>
        </div>
      </div>

      <div className="example-group">
        <h3>Tabs de Navegación</h3>
        <div className="tabs">
          <button className="tab-item active">
            <i className="fas fa-home"></i>
            General
          </button>
          <button className="tab-item">
            <i className="fas fa-chart-line"></i>
            Estadísticas
          </button>
          <button className="tab-item">
            <i className="fas fa-cog"></i>
            Configuración
          </button>
          <button className="tab-item" disabled>
            <i className="fas fa-lock"></i>
            Bloqueado
          </button>
        </div>
      </div>

      <div className="example-group">
        <h3>Breadcrumb</h3>
        <nav className="breadcrumb">
          <a href="#home" className="breadcrumb-link">Inicio</a>
          <span className="breadcrumb-separator">/</span>
          <a href="#vehiculos" className="breadcrumb-link">Vehículos</a>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Detalles</span>
        </nav>
      </div>

      <div className="example-group">
        <h3>Navegación Lateral (Sidebar)</h3>
        <div className="sidebar-demo">
          <aside className="sidebar">
            <h4 className="sidebar-title">
              <i className="fas fa-th-large"></i> Panel
            </h4>
            <nav className="sidebar-nav">
              <a href="#" className="sidebar-link active">
                <i className="fas fa-tachometer-alt"></i>
                Dashboard
              </a>
              <a href="#" className="sidebar-link">
                <i className="fas fa-truck"></i>
                Vehículos
                <span className="badge badge-primary">12</span>
              </a>
              <a href="#" className="sidebar-link">
                <i className="fas fa-route"></i>
                Rutas
              </a>
              <a href="#" className="sidebar-link">
                <i className="fas fa-users"></i>
                Conductores
              </a>
              <hr className="sidebar-divider" />
              <a href="#" className="sidebar-link">
                <i className="fas fa-chart-bar"></i>
                Reportes
              </a>
              <a href="#" className="sidebar-link">
                <i className="fas fa-cog"></i>
                Configuración
              </a>
            </nav>
          </aside>
          <div className="sidebar-content">
            <p>Contenido Principal</p>
          </div>
        </div>
      </div>

      <div className="example-group">
        <h3>Pagination</h3>
        <nav className="pagination">
          <button className="pagination-item" disabled>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="pagination-item active">1</button>
          <button className="pagination-item">2</button>
          <button className="pagination-item">3</button>
          <span className="pagination-ellipsis">...</span>
          <button className="pagination-item">10</button>
          <button className="pagination-item">
            <i className="fas fa-chevron-right"></i>
          </button>
        </nav>
      </div>

      <div className="example-group">
        <h3>Stepper (Pasos)</h3>
        <div className="stepper">
          <div className="stepper-item completed">
            <div className="stepper-circle">
              <i className="fas fa-check"></i>
            </div>
            <div className="stepper-label">Información</div>
          </div>
          <div className="stepper-line"></div>
          <div className="stepper-item active">
            <div className="stepper-circle">2</div>
            <div className="stepper-label">Verificación</div>
          </div>
          <div className="stepper-line"></div>
          <div className="stepper-item">
            <div className="stepper-circle">3</div>
            <div className="stepper-label">Confirmación</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Navigation;