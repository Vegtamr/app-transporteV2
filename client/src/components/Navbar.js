import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({});

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = (key) => {
    setDropdownOpen(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            <img src="/img/logo.png" alt="Logo" className="navbar-logo" />
            <span className="navbar-title">App Transporte</span>
          </Link>

          <button className="hamburger" onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className="navbar-menu">
            <li className="navbar-item">
              <Link to="/" className="navbar-link">Inicio</Link>
            </li>
            <li className="navbar-item">
              <Link to="/vehiculos" className="navbar-link">Vehículos</Link>
            </li>
            <li className="navbar-item">
              <Link to="/conductores" className="navbar-link">Conductores</Link>
            </li>
            <li className="navbar-item navbar-dropdown">
              <a href="#" className="navbar-link navbar-dropdown-toggle" 
                 onClick={(e) => { e.preventDefault(); toggleDropdown('rutas'); }}>
                Rutas <i className="fas fa-chevron-down"></i>
              </a>
              {dropdownOpen.rutas && (
                <ul className="navbar-dropdown-menu">
                  <li><Link to="/rutas/activas" className="navbar-dropdown-link">Rutas Activas</Link></li>
                  <li><Link to="/rutas/historico" className="navbar-dropdown-link">Historial</Link></li>
                  <li><Link to="/rutas/planificar" className="navbar-dropdown-link">Planificar Ruta</Link></li>
                </ul>
              )}
            </li>
            <li className="navbar-item">
              <Link to="/mantenimiento" className="navbar-link">Mantenimiento</Link>
            </li>
            <li className="navbar-item navbar-dropdown">
              <a href="#" className="navbar-link navbar-dropdown-toggle"
                 onClick={(e) => { e.preventDefault(); toggleDropdown('reportes'); }}>
                Reportes <i className="fas fa-chevron-down"></i>
              </a>
              {dropdownOpen.reportes && (
                <ul className="navbar-dropdown-menu">
                  <li><Link to="/reportes/consumo" className="navbar-dropdown-link">Consumo Combustible</Link></li>
                  <li><Link to="/reportes/rendimiento" className="navbar-dropdown-link">Rendimiento</Link></li>
                  <li><Link to="/reportes/incidentes" className="navbar-dropdown-link">Incidentes</Link></li>
                </ul>
              )}
            </li>
            <li className="navbar-item">
              <Link to="/styleguide" className="navbar-link">
                <i className="fas fa-palette"></i> Styleguide
              </Link>
            </li>
          </ul>

          <div className="navbar-actions">
            <button className="navbar-icon-btn">
              <i className="fas fa-bell"></i>
              <span className="badge">3</span>
            </button>
            <button className="navbar-icon-btn">
              <i className="fas fa-user"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Menú móvil */}
      <div className={`navbar-mobile ${mobileMenuOpen ? 'active' : ''}`}>
        <ul className="navbar-mobile-menu">
          <li className="navbar-mobile-item">
            <Link to="/" className="navbar-mobile-link" onClick={toggleMobileMenu}>Inicio</Link>
          </li>
          <li className="navbar-mobile-item">
            <Link to="/vehiculos" className="navbar-mobile-link" onClick={toggleMobileMenu}>Vehículos</Link>
          </li>
          <li className="navbar-mobile-item">
            <Link to="/conductores" className="navbar-mobile-link" onClick={toggleMobileMenu}>Conductores</Link>
          </li>
          <li className="navbar-mobile-item">
            <Link to="/rutas" className="navbar-mobile-link" onClick={toggleMobileMenu}>Rutas</Link>
          </li>
          <li className="navbar-mobile-item">
            <Link to="/mantenimiento" className="navbar-mobile-link" onClick={toggleMobileMenu}>Mantenimiento</Link>
          </li>
          <li className="navbar-mobile-item">
            <Link to="/reportes" className="navbar-mobile-link" onClick={toggleMobileMenu}>Reportes</Link>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div className="navbar-overlay active" onClick={toggleMobileMenu}></div>
      )}
    </>
  );
}

export default Navbar;