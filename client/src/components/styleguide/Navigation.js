import React, { useState } from 'react';

function Navigation() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <section className="section">
      <h2>Navegación</h2>

      <div className="surface-padded-section">
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
                <li 
                  className="navbar-item navbar-dropdown"
                  onMouseEnter={() => setActiveDropdown('rutas')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button 
                    className="navbar-link navbar-link-dropdown"
                  >
                    <span>Rutas</span>
                    <i className={`fas fa-caret-down ${activeDropdown === 'rutas' ? 'rotated' : ''}`}></i>
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
                    <span>Rutas</span>
                    <span className="dropdown-indicator">
                      <span className="dropdown-badge">4</span>
                      <i className={`fas fa-angle-right ${activeDropdown === 'mobile-rutas' ? 'rotated' : ''}`}></i>
                    </span>
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

      <div className="surface-padded-section">
        <h3>Alternativas de Dropdown para Navbar Principal</h3>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', padding: '1rem', background: 'var(--primary-color)' }}>
          
          {/* Opción 1: Solo chevron sutil */}
          <button className="navbar-link" style={{ color: 'var(--secondary-color)' }}>
            Opción 1
            <i className="fas fa-chevron-down" style={{ marginLeft: '4px', fontSize: '0.7rem', opacity: 0.5 }}></i>
          </button>

          {/* Opción 2: Con punto indicador */}
          <button className="navbar-link" style={{ color: 'var(--secondary-color)' }}>
            Opción 2
            <span style={{ 
              width: '4px', 
              height: '4px', 
              background: 'currentColor', 
              borderRadius: '50%', 
              marginLeft: '6px',
              opacity: 0.5
            }}></span>
          </button>

          {/* Opción 3: Con subrayado parcial */}
          <button className="navbar-link" style={{ 
            color: 'var(--secondary-color)',
            borderBottom: '2px dashed rgba(43, 43, 43, 0.3)',
            borderRadius: 0,
            paddingBottom: '6px'
          }}>
            Opción 3
          </button>

          {/* Opción 4: Sin indicador (minimalista) */}
          <button className="navbar-link" style={{ 
            color: 'var(--secondary-color)',
            fontWeight: '600'
          }}>
            Opción 4
          </button>

          {/* Opción 5: Con icono más */}
          <button className="navbar-link" style={{ color: 'var(--secondary-color)' }}>
            Opción 5
            <i className="fas fa-plus" style={{ marginLeft: '6px', fontSize: '0.6rem', opacity: 0.4 }}></i>
          </button>
        </div>
      </div>

      <div className="surface-padded-section">
        <h3>Alternativas de Indicadores Dropdown (Menú Móvil)</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          
          {/* Opción 1: Con badge contador */}
          <button className="navbar-mobile-link" style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <i className="fas fa-folder"></i>
            <span>Opción con Badge</span>
            <span className="dropdown-indicator">
              <span className="dropdown-badge">3</span>
              <i className="fas fa-angle-right"></i>
            </span>
          </button>

          {/* Opción 2: Con plus/minus */}
          <button className="navbar-mobile-link" style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <i className="fas fa-box"></i>
            <span>Opción Plus/Minus</span>
            <span style={{ marginLeft: 'auto', width: '24px', height: '24px', background: 'rgba(0,0,0,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-plus" style={{ fontSize: '0.75rem' }}></i>
            </span>
          </button>

          {/* Opción 3: Con dots */}
          <button className="navbar-mobile-link" style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <i className="fas fa-layer-group"></i>
            <span>Opción con Dots</span>
            <i className="fas fa-ellipsis-h" style={{ marginLeft: 'auto', color: 'rgba(0,0,0,0.3)' }}></i>
          </button>

          {/* Opción 4: Minimalista con línea */}
          <button className="navbar-mobile-link" style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '8px', borderRight: '3px solid black' }}>
            <i className="fas fa-compass"></i>
            <span>Opción con Línea</span>
          </button>

          {/* Opción 5: Con icono doble */}
          <button className="navbar-mobile-link" style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <i className="fas fa-sitemap"></i>
            <span>Opción Doble Chevron</span>
            <span style={{ marginLeft: 'auto', color: 'rgba(0,0,0,0.3)' }}>
              <i className="fas fa-angle-double-right"></i>
            </span>
          </button>
        </div>
      </div>



      <div className="surface-padded-section">
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

      <div className="surface-padded-section">
        <h3>Breadcrumb</h3>
        <nav className="breadcrumb">
          <a href="#home" className="breadcrumb-link">Inicio</a>
          <span className="breadcrumb-separator">/</span>
          <a href="#vehiculos" className="breadcrumb-link">Vehículos</a>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Detalles</span>
        </nav>
      </div>

      <div className="surface-padded-section">
        <h3>Navegación Lateral Responsiva (Sidebar)</h3>
        
        {/* Botón para abrir sidebar */}
        <button 
          className="btn btn-primary"
          onClick={() => setSidebarOpen(true)}
          style={{ marginBottom: '1rem' }}
        >
          <i className="fas fa-bars"></i> Abrir Menú Lateral
        </button>

        <div className="sidebar-responsive-demo">
          {/* Overlay */}
          {sidebarOpen && (
            <div 
              className="sidebar-overlay"
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}

          {/* Sidebar deslizante */}
          <aside className={`sidebar-responsive ${sidebarOpen ? 'active' : ''}`}>
            <div className="sidebar-header">
              <img src="/img/logo.png" alt="Logo" className="sidebar-logo" />
              <button 
                className="sidebar-close"
                onClick={() => setSidebarOpen(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
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

          {/* Contenido principal */}
          <div className="sidebar-main-content">
            <div style={{ padding: '2rem', textAlign: 'center', background: 'var(--surface-color)', borderRadius: 'var(--radius-md)', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ color: 'var(--text-secondary)' }}>
                Contenido Principal<br/>
                <small>El sidebar se superpone sin desplazar el contenido</small>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="surface-padded-section">
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

      <div className="surface-padded-section">
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