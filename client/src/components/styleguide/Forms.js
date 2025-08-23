import React, { useState } from 'react';

function Forms() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    select: '',
    checkbox: false,
    radio: '',
    textarea: ''
  });

  const [showPassword, setShowPassword] = useState(false);

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

      <div className="example-group">
        <h3>Campos de Texto</h3>
        <form className="form-example">
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
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
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

      <div className="example-group">
        <h3>Selectores</h3>
        <div className="form-group">
          <label htmlFor="vehiculo" className="form-label">Tipo de Vehículo</label>
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

      <div className="example-group">
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

      <div className="example-group">
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

      <div className="example-group">
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

      <div className="example-group">
        <h3>Formulario Completo</h3>
        <form className="card">
          <div className="card-body">
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
            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Registrar Conductor
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Forms;