import React, { useState } from 'react';

function Tables() {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  
  const vehiculos = [
    { id: 1, tipo: 'Bus', modelo: 'Mercedes-Benz', placa: 'ABC-123', estado: 'Activo', kilometraje: 125430 },
    { id: 2, tipo: 'Van', modelo: 'Toyota Hiace', placa: 'DEF-456', estado: 'Mantenimiento', kilometraje: 89200 },
    { id: 3, tipo: 'Camión', modelo: 'Volvo FH16', placa: 'GHI-789', estado: 'Inactivo', kilometraje: 250000 },
    { id: 4, tipo: 'Bus', modelo: 'Scania K360', placa: 'JKL-012', estado: 'Activo', kilometraje: 98000 },
    { id: 5, tipo: 'Van', modelo: 'Ford Transit', placa: 'MNO-345', estado: 'Activo', kilometraje: 45000 }
  ];

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedVehiculos = React.useMemo(() => {
    let sortableItems = [...vehiculos];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [sortConfig]);

  const getStatusBadge = (estado) => {
    const statusClasses = {
      'Activo': 'badge-success',
      'Mantenimiento': 'badge-warning',
      'Inactivo': 'badge-danger'
    };
    return `badge ${statusClasses[estado]}`;
  };

  return (
    <section className="section">
      <h2>Tablas</h2>

      <div className="example-group">
        <h3>Tabla Básica</h3>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Cargo</th>
                <th>Departamento</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Juan Pérez</td>
                <td>Conductor</td>
                <td>Operaciones</td>
              </tr>
              <tr>
                <td>2</td>
                <td>María García</td>
                <td>Supervisora</td>
                <td>Logística</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Carlos López</td>
                <td>Mecánico</td>
                <td>Mantenimiento</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="example-group">
        <h3>Tabla con Ordenamiento y Estados</h3>
        <div className="table-container">
          <table className="table table-hover">
            <thead>
              <tr>
                <th 
                  onClick={() => handleSort('id')}
                  style={{ cursor: 'pointer', minWidth: '50px' }}
                >
                  ID {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  onClick={() => handleSort('tipo')}
                  style={{ cursor: 'pointer', minWidth: '80px' }}
                >
                  Tipo {sortConfig.key === 'tipo' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  onClick={() => handleSort('modelo')}
                  style={{ cursor: 'pointer', minWidth: '120px' }}
                >
                  Modelo {sortConfig.key === 'modelo' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th style={{ minWidth: '80px' }}>Placa</th>
                <th 
                  onClick={() => handleSort('estado')}
                  style={{ cursor: 'pointer', minWidth: '100px' }}
                >
                  Estado {sortConfig.key === 'estado' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  onClick={() => handleSort('kilometraje')}
                  style={{ cursor: 'pointer', minWidth: '100px' }}
                >
                  Kilometraje {sortConfig.key === 'kilometraje' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th style={{ minWidth: '120px' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sortedVehiculos.map(vehiculo => (
                <tr key={vehiculo.id}>
                  <td>{vehiculo.id}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <i className={`fas fa-${vehiculo.tipo.toLowerCase()} text-primary`}></i> {vehiculo.tipo}
                  </td>
                  <td>{vehiculo.modelo}</td>
                  <td><code>{vehiculo.placa}</code></td>
                  <td>
                    <span className={getStatusBadge(vehiculo.estado)}>
                      {vehiculo.estado}
                    </span>
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>{vehiculo.kilometraje.toLocaleString()} km</td>
                  <td>
                    <div className="btn-group">
                      <button className="btn btn-sm btn-outline-primary">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-secondary">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-danger">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="example-group">
        <h3>Tabla con Scroll Horizontal (Móvil)</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          <i className="fas fa-info-circle"></i> En dispositivos móviles, la tabla permite scroll horizontal
        </p>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Conductor</th>
                <th>Vehículo</th>
                <th>Ruta</th>
                <th>Distancia</th>
                <th>Combustible</th>
                <th>Tiempo</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2024-01-15</td>
                <td>Juan Pérez</td>
                <td>Bus #001</td>
                <td>Santiago - Valparaíso</td>
                <td>120 km</td>
                <td>45 L</td>
                <td>2h 30min</td>
                <td><span className="badge badge-success">Completado</span></td>
              </tr>
              <tr>
                <td>2024-01-15</td>
                <td>María García</td>
                <td>Van #015</td>
                <td>Santiago - Rancagua</td>
                <td>85 km</td>
                <td>25 L</td>
                <td>1h 45min</td>
                <td><span className="badge badge-success">Completado</span></td>
              </tr>
              <tr>
                <td>2024-01-16</td>
                <td>Carlos López</td>
                <td>Camión #008</td>
                <td>Santiago - Concepción</td>
                <td>500 km</td>
                <td>180 L</td>
                <td>6h 00min</td>
                <td><span className="badge badge-warning">En Curso</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="example-group">
        <h3>Tabla Responsiva en Formato Cards (Móvil)</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          <i className="fas fa-mobile-alt"></i> Vista optimizada para dispositivos móviles
        </p>
        
        {/* Vista Desktop */}
        <div className="table-desktop">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Vehículo</th>
                <th>Conductor</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#001</td>
                <td>Bus Mercedes-Benz</td>
                <td>Juan Pérez</td>
                <td><span className="badge badge-success">Activo</span></td>
                <td>
                  <button className="btn btn-sm btn-outline-primary">Ver</button>
                </td>
              </tr>
              <tr>
                <td>#015</td>
                <td>Van Toyota Hiace</td>
                <td>María García</td>
                <td><span className="badge badge-warning">Mantenimiento</span></td>
                <td>
                  <button className="btn btn-sm btn-outline-primary">Ver</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Vista Mobile (Cards) */}
        <div className="table-mobile">
          <div className="mobile-card">
            <div className="mobile-card-header">
              <span className="mobile-card-id">#001</span>
              <span className="badge badge-success">Activo</span>
            </div>
            <div className="mobile-card-body">
              <div className="mobile-card-row">
                <span className="mobile-card-label">Vehículo:</span>
                <span className="mobile-card-value">Bus Mercedes-Benz</span>
              </div>
              <div className="mobile-card-row">
                <span className="mobile-card-label">Conductor:</span>
                <span className="mobile-card-value">Juan Pérez</span>
              </div>
            </div>
            <div className="mobile-card-footer">
              <button className="btn btn-sm btn-primary btn-block">Ver Detalles</button>
            </div>
          </div>

          <div className="mobile-card">
            <div className="mobile-card-header">
              <span className="mobile-card-id">#015</span>
              <span className="badge badge-warning">Mantenimiento</span>
            </div>
            <div className="mobile-card-body">
              <div className="mobile-card-row">
                <span className="mobile-card-label">Vehículo:</span>
                <span className="mobile-card-value">Van Toyota Hiace</span>
              </div>
              <div className="mobile-card-row">
                <span className="mobile-card-label">Conductor:</span>
                <span className="mobile-card-value">María García</span>
              </div>
            </div>
            <div className="mobile-card-footer">
              <button className="btn btn-sm btn-primary btn-block">Ver Detalles</button>
            </div>
          </div>
        </div>
      </div>

      <div className="example-group">
        <h3>Tabla Compacta</h3>
        <div className="table-container">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Hora</th>
                <th>Evento</th>
                <th>Usuario</th>
                <th>Detalles</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>09:15</td>
                <td>Inicio de Ruta</td>
                <td>jperez</td>
                <td>Bus #001 - Ruta Norte</td>
              </tr>
              <tr>
                <td>10:30</td>
                <td>Parada Programada</td>
                <td>mgarcia</td>
                <td>Van #015 - Terminal 2</td>
              </tr>
              <tr>
                <td>11:45</td>
                <td>Reabastecimiento</td>
                <td>clopez</td>
                <td>Camión #008 - 180L Diesel</td>
              </tr>
              <tr>
                <td>14:20</td>
                <td>Fin de Ruta</td>
                <td>jperez</td>
                <td>Bus #001 - Sin incidentes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Tables;