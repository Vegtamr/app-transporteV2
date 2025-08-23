import React from 'react';

function ColorPalette() {
  const colors = {
    primary: [
      { name: 'Primary', var: '--primary', value: '#2D54A6' },
      { name: 'Primary Dark', var: '--primary-dark', value: '#1E3A70' },
      { name: 'Primary Light', var: '--primary-light', value: '#4B6FBF' }
    ],
    secondary: [
      { name: 'Secondary', var: '--secondary', value: '#FF6B35' },
      { name: 'Secondary Dark', var: '--secondary-dark', value: '#E55100' },
      { name: 'Secondary Light', var: '--secondary-light', value: '#FF8F5C' }
    ],
    neutrals: [
      { name: 'Dark', var: '--dark', value: '#212529' },
      { name: 'Gray Dark', var: '--gray-dark', value: '#495057' },
      { name: 'Gray', var: '--gray', value: '#6C757D' },
      { name: 'Gray Light', var: '--gray-light', value: '#ADB5BD' },
      { name: 'Light', var: '--light', value: '#F8F9FA' },
      { name: 'White', var: '--white', value: '#FFFFFF' }
    ],
    semantic: [
      { name: 'Success', var: '--success', value: '#28A745' },
      { name: 'Warning', var: '--warning', value: '#FFC107' },
      { name: 'Danger', var: '--danger', value: '#DC3545' },
      { name: 'Info', var: '--info', value: '#17A2B8' }
    ]
  };

  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
    // Aquí podrías mostrar un toast notification
    console.log(`Color ${value} copiado`);
  };

  const ColorGroup = ({ title, colors }) => (
    <div className="color-group">
      <h3>{title}</h3>
      <div className="color-grid">
        {colors.map(color => (
          <div 
            key={color.var}
            className="color-item" 
            onClick={() => copyToClipboard(color.value)}
            style={{ cursor: 'pointer' }}
          >
            <div 
              className="color-sample" 
              style={{ backgroundColor: color.value }}
            ></div>
            <div className="color-info">
              <span className="color-name">{color.name}</span>
              <span className="color-code">{color.value}</span>
              <span className="color-var">{color.var}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="section">
      <h2>Paleta de Colores</h2>
      
      <ColorGroup title="Colores Primarios" colors={colors.primary} />
      <ColorGroup title="Colores Secundarios" colors={colors.secondary} />
      <ColorGroup title="Colores Neutrales" colors={colors.neutrals} />
      <ColorGroup title="Colores Semánticos" colors={colors.semantic} />
    </section>
  );
}

export default ColorPalette;