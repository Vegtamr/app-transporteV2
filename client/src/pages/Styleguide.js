import React, { useState } from 'react';
import ColorPalette from '../components/styleguide/ColorPalette';
import Typography from '../components/styleguide/Typography';
import Buttons from '../components/styleguide/Buttons';
import Forms from '../components/styleguide/Forms';
import Cards from '../components/styleguide/Cards';
import Tables from '../components/styleguide/Tables';
import Notifications from '../components/styleguide/Notifications';
import Logo from '../components/styleguide/Logo';
import Navigation from '../components/styleguide/Navigation';
import DesignGuide from '../components/styleguide/DesignGuide';
import DateTimePickers from '../components/styleguide/DateTimePickers';

function Styleguide() {
  const [activeTab, setActiveTab] = useState('guide');

  const tabs = [
    { id: 'guide', label: 'Guía', icon: 'fa-book' },
    { id: 'logo', label: 'Logo', icon: 'fa-image' },
    { id: 'colors', label: 'Colores', icon: 'fa-palette' },
    { id: 'typography', label: 'Tipografía', icon: 'fa-font' },
    { id: 'buttons', label: 'Botones', icon: 'fa-square' },
    { id: 'forms', label: 'Formularios', icon: 'fa-edit' },
    { id: 'datetime', label: 'Fecha/Hora', icon: 'fa-calendar' },
    { id: 'cards', label: 'Cards', icon: 'fa-window-restore' },
    { id: 'tables', label: 'Tablas', icon: 'fa-table' },
    { id: 'navigation', label: 'Navegación', icon: 'fa-compass' },
    { id: 'notifications', label: 'Notificaciones', icon: 'fa-bell' }
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'guide': return <DesignGuide />;
      case 'logo': return <LogoShowcase />;
      case 'colors': return <ColorPalette />;
      case 'typography': return <Typography />;
      case 'buttons': return <Buttons />;
      case 'forms': return <Forms />;
      case 'datetime': return <DateTimePickers />;
      case 'cards': return <Cards />;
      case 'tables': return <Tables />;
      case 'navigation': return <Navigation />;
      case 'notifications': return <Notifications />;
      default: return <DesignGuide />;
    }
  };

  // Componente para mostrar variantes del Logo
  const LogoShowcase = () => (
    <section className="section-plain">
      <h2>Logo y Marca</h2>
      
      <div className="surface-padded-section">
        <h3>Tamaños</h3>
        <div className="display-flex align-center gap-lg flex-wrap">
          <div className="text-center">
            <Logo size="xs" />
            <p className="text-sm margin-top-sm">XS (24px)</p>
          </div>
          <div className="text-center">
            <Logo size="small" />
            <p className="text-sm margin-top-sm">Small (32px)</p>
          </div>
          <div className="text-center">
            <Logo size="medium" />
            <p className="text-sm margin-top-sm">Medium (48px)</p>
          </div>
          <div className="text-center">
            <Logo size="large" />
            <p className="text-sm margin-top-sm">Large (64px)</p>
          </div>
          <div className="text-center">
            <Logo size="xl" />
            <p className="text-sm margin-top-sm">XL (96px)</p>
          </div>
        </div>
      </div>

      <div className="surface-padded-section bg-secondary">
        <h3 className="text-white">Variante Blanca</h3>
        <div className="display-flex align-center gap-lg">
          <Logo size="medium" variant="white" />
        </div>
      </div>

      <div className="surface-padded-section">
        <h3>Con Interacción</h3>
        <Logo 
          size="medium" 
          showText={true} 
          onClick={() => alert('Logo clickeado!')} 
          className="hover-scale"
        />
        <p className="text-sm margin-top-sm">Click para probar interacción</p>
      </div>

      <div className="surface-padded-section">
        <h3>Código de Uso</h3>
        <pre className="code-block">
{`// Importar
import Logo from './components/styleguide/Logo';

// Uso básico
<Logo />

// Con tamaño
<Logo size="large" />

// Con texto
<Logo showText={true} />

// Variante blanca
<Logo variant="white" />

// Con click handler
<Logo onClick={handleClick} />`}
        </pre>
      </div>
    </section>
  );

  return (
    <div className="styleguide-container">
      <header className="styleguide-header">
        <h1>Sistema de Diseño - App Transporte</h1>
        <p>Guía de estilo y componentes reutilizables</p>
      </header>

      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <i className={`fas ${tab.icon}`}></i>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="styleguide-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default Styleguide;