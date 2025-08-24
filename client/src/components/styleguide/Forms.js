import React, { useState } from 'react';

function Forms() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    select: '',
    checkbox: false,
    radio: '',
    textarea: '',
    address: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Simular direcciones de un servidor
  const mockAddresses = [
    { id: 1, street: 'Av. Libertador Bernardo O\'Higgins 1234', city: 'Santiago', postal: '8320000' },
    { id: 2, street: 'Av. Providencia 2594', city: 'Providencia', postal: '7500000' },
    { id: 3, street: 'Av. Apoquindo 3000', city: 'Las Condes', postal: '7550000' },
    { id: 4, street: 'Av. Vicuña Mackenna 4860', city: 'Macul', postal: '7820000' },
    { id: 5, street: 'Av. Pedro de Valdivia 305', city: 'Providencia', postal: '7500000' },
    { id: 6, street: 'Av. Los Leones 1095', city: 'Providencia', postal: '7510000' },
    { id: 7, street: 'Av. Manuel Montt 1725', city: 'Providencia', postal: '7500000' },
    { id: 8, street: 'Av. Irarrázaval 3255', city: 'Ñuñoa', postal: '7750000' }
  ];

  const filteredAddresses = mockAddresses.filter(addr => 
    addr.street.toLowerCase().includes(searchTerm.toLowerCase()) ||
    addr.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <section className="section">
      <h2>Formularios</h2>

      <div className="surface-padded-section">
        <h3>Campos de Texto</h3>
        <div className="form-flex-centered">
          <div className="form-card">
            <form>
              <div className="form-group">
                <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                <input 
                  type="text" 
                  id="nombre" 
                  className="form-control" 
                  placeholder="Ingrese su nombre"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Correo Electrónico *</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  className="form-control" 
                  placeholder="correo@ejemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
            />
            <small className="form-text">Nunca compartiremos tu correo.</small>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <div className="input-group">
              <input 
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="form-control" 
                placeholder="Ingrese su contraseña"
                value={formData.password}
                onChange={handleChange}
              />
              <button 
                type="button"
                className={`password-toggle ${showPassword ? 'active' : ''}`}
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                <i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
              </button>
            </div>
          </div>

              <div className="form-group">
                <label htmlFor="telefono" className="form-label">Teléfono</label>
                <input 
                  type="tel" 
                  id="telefono" 
                  className="form-control" 
                  placeholder="+56 9 1234 5678"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="surface-padded-section">
        <h3>Selectores y Autocomplete</h3>
        
        <div className="form-group">
          <label htmlFor="address-search" className="form-label">
            Buscar Dirección (Autocomplete)
          </label>
          <div className="position-relative-container">
            <div className="input-with-icon">
              <input
                type="text"
                id="address-search"
                className="form-control"
                placeholder="Escriba para buscar direcciones..."
                value={searchTerm}
                title={searchTerm.length > 40 ? searchTerm : ''}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowDropdown(true);
                  // Simular carga desde servidor
                  if (e.target.value.length > 2) {
                    setIsLoading(true);
                    setTimeout(() => setIsLoading(false), 500);
                  }
                }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 300)}
              />
              {isLoading && (
                <div className="input-icon-right">
                  <i className="fas fa-spinner fa-spin"></i>
                </div>
              )}
              {!isLoading && searchTerm && (
                <button 
                  className="input-action-button"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedAddress('');
                  }}
                  type="button"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
            
            {showDropdown && searchTerm.length > 0 && (
              <div className="autocomplete-dropdown">
                {isLoading ? (
                  <div className="state-loading-centered">
                    <i className="fas fa-spinner fa-spin"></i>
                    <span>Buscando direcciones...</span>
                  </div>
                ) : filteredAddresses.length > 0 ? (
                  filteredAddresses.map(addr => (
                    <div
                      key={addr.id}
                      className="dropdown-item"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setSearchTerm(addr.street);
                        setSelectedAddress(`${addr.street}, ${addr.city}`);
                        setShowDropdown(false);
                      }}
                    >
                      <div className="dropdown-item-icon">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                      <div className="dropdown-item-content">
                        <div className="dropdown-item-title">{addr.street}</div>
                        <div className="dropdown-item-subtitle">
                          {addr.city} - CP: {addr.postal}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="state-empty-centered">
                    <i className="fas fa-exclamation-circle"></i>
                    <span>No se encontraron direcciones</span>
                  </div>
                )}
              </div>
            )}
          </div>
          {selectedAddress && (
            <small className="form-text text-success">
              <i className="fas fa-check-circle"></i> Dirección seleccionada: {selectedAddress}
            </small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="long-text-demo" className="form-label">
            Ejemplo con Texto Largo (Demo visual)
          </label>
          <div className="input-with-icon">
            <input
              type="text"
              id="long-text-demo"
              className="form-control"
              value="Av. Libertador Bernardo O'Higgins 1234, Santiago Centro, Región Metropolitana, Chile - Código Postal 8320000"
              readOnly
              title="Av. Libertador Bernardo O'Higgins 1234, Santiago Centro, Región Metropolitana, Chile - Código Postal 8320000"
            />
            <span className="text-overflow-gradient"></span>
          </div>
          <small className="form-text">
            <i className="fas fa-info-circle"></i> El texto largo se trunca con ellipsis. Al hacer focus, se muestra completo.
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="vehiculo" className="form-label">Tipo de Vehículo (Select tradicional)</label>
          <select 
            id="vehiculo" 
            name="select"
            className="form-control"
            value={formData.select}
            onChange={handleChange}
          >
            <option value="">Seleccione un vehículo</option>
            <option value="bus">Bus</option>
            <option value="van">Van</option>
            <option value="camion">Camión</option>
            <option value="auto">Automóvil</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="multiple" className="form-label">Selección Múltiple</label>
          <select id="multiple" className="form-control" multiple size="4">
            <option>Opción 1</option>
            <option>Opción 2</option>
            <option>Opción 3</option>
            <option>Opción 4</option>
          </select>
        </div>
      </div>

      <div className="surface-padded-section">
        <h3>Checkboxes y Radios</h3>
        <div className="form-group">
          <label className="form-label">Servicios Adicionales</label>
          <div className="form-check">
            <input 
              type="checkbox" 
              id="check1" 
              className="form-check-input"
            />
            <label htmlFor="check1" className="form-check-label">
              GPS Tracking
            </label>
          </div>
          <div className="form-check">
            <input 
              type="checkbox" 
              id="check2" 
              className="form-check-input"
            />
            <label htmlFor="check2" className="form-check-label">
              Seguro adicional
            </label>
          </div>
          <div className="form-check">
            <input 
              type="checkbox" 
              id="check3" 
              className="form-check-input"
            />
            <label htmlFor="check3" className="form-check-label">
              Conductor adicional
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Tipo de Servicio</label>
          <div className="form-check">
            <input 
              type="radio" 
              id="radio1" 
              name="radio"
              value="express"
              className="form-check-input"
              onChange={handleChange}
            />
            <label htmlFor="radio1" className="form-check-label">
              Express
            </label>
          </div>
          <div className="form-check">
            <input 
              type="radio" 
              id="radio2" 
              name="radio"
              value="standard"
              className="form-check-input"
              onChange={handleChange}
            />
            <label htmlFor="radio2" className="form-check-label">
              Standard
            </label>
          </div>
          <div className="form-check">
            <input 
              type="radio" 
              id="radio3" 
              name="radio"
              value="economico"
              className="form-check-input"
              onChange={handleChange}
            />
            <label htmlFor="radio3" className="form-check-label">
              Económico
            </label>
          </div>
        </div>
      </div>

      <div className="surface-padded-section">
        <h3>Área de Texto</h3>
        <div className="form-group">
          <label htmlFor="observaciones" className="form-label">Observaciones</label>
          <textarea 
            id="observaciones"
            name="textarea"
            className="form-control" 
            rows="4" 
            placeholder="Ingrese sus observaciones..."
            value={formData.textarea}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>

      <div className="surface-padded-section">
        <h3>Campos con Validación</h3>
        <div className="form-group">
          <label className="form-label">Campo Válido</label>
          <input type="text" className="form-control success" defaultValue="Contenido válido" />
          <small className="form-text text-success">¡Looks good!</small>
        </div>

        <div className="form-group">
          <label className="form-label">Campo con Error</label>
          <input type="email" className="form-control error" defaultValue="email-invalido" />
          <small className="form-text text-danger">Por favor ingrese un email válido</small>
        </div>
      </div>

      <div className="surface-padded-section">
        <h3>Formulario Completo</h3>
        <form className="card">
          <div className="card-content">
            <h4>Registro de Conductor</h4>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">Apellido</label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" />
            </div>
            <div className="form-group">
              <label className="form-label">Licencia</label>
              <select className="form-control">
                <option>Seleccione tipo de licencia</option>
                <option>Clase A</option>
                <option>Clase B</option>
                <option>Clase C</option>
              </select>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="terms" />
              <label className="form-check-label" htmlFor="terms">
                Acepto los términos y condiciones
              </label>
            </div>
            <button type="submit" className="btn btn-primary margin-top-md">
              Registrar Conductor
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Forms;