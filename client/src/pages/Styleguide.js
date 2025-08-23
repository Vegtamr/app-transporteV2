import React, { useState } from 'react';
import ColorPalette from '../components/styleguide/ColorPalette';
import Typography from '../components/styleguide/Typography';
import Buttons from '../components/styleguide/Buttons';
import Forms from '../components/styleguide/Forms';
import Cards from '../components/styleguide/Cards';
import Tables from '../components/styleguide/Tables';
import Notifications from '../components/styleguide/Notifications';
import Navigation from '../components/styleguide/Navigation';
import DesignGuide from '../components/styleguide/DesignGuide';
import DateTimePickers from '../components/styleguide/DateTimePickers';

function Styleguide() {
  const [activeTab, setActiveTab] = useState('guide');

  const tabs = [
    { id: 'guide', label: 'Guía', icon: 'fa-book' },
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