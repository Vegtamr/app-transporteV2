import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/styleguide/Logo';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }
    
    if (!formData.apellido) {
      newErrors.apellido = 'El apellido es requerido';
    } else if (formData.apellido.length < 2) {
      newErrors.apellido = 'El apellido debe tener al menos 2 caracteres';
    }
    
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Debe confirmar la contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    // Simulación de registro - aquí iría la llamada al backend
    setTimeout(() => {
      console.log('Registration attempt:', formData);
      
      // Simulación de registro exitoso
      alert('Registro exitoso. Tu cuenta ha sido creada pero requiere activación por un administrador.');
      
      setIsLoading(false);
      // Redirigir al login después del registro exitoso
      navigate('/');
    }, 2000);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <Logo size="large" />
          <p className="register-subtitle">Completa el formulario para registrarte</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="nombre" className="form-label">
                <i className="fas fa-user"></i> Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                placeholder="Tu nombre"
                value={formData.nombre}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.nombre && (
                <div className="invalid-feedback">
                  <i className="fas fa-exclamation-circle"></i> {errors.nombre}
                </div>
              )}
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="apellido" className="form-label">
                <i className="fas fa-user"></i> Apellido
              </label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                className={`form-control ${errors.apellido ? 'is-invalid' : ''}`}
                placeholder="Tu apellido"
                value={formData.apellido}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.apellido && (
                <div className="invalid-feedback">
                  <i className="fas fa-exclamation-circle"></i> {errors.apellido}
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <i className="fas fa-envelope"></i> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="correo@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.email && (
              <div className="invalid-feedback">
                <i className="fas fa-exclamation-circle"></i> {errors.email}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              <i className="fas fa-lock"></i> Contraseña
            </label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />
              <button
                type="button"
                className="btn-input-addon"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                <i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
              </button>
            </div>
            {errors.password && (
              <div className="invalid-feedback">
                <i className="fas fa-exclamation-circle"></i> {errors.password}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              <i className="fas fa-lock"></i> Confirmar Contraseña
            </label>
            <div className="input-group">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
              />
              <button
                type="button"
                className="btn-input-addon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex="-1"
              >
                <i className={`fas fa-eye${showConfirmPassword ? '-slash' : ''}`}></i>
              </button>
            </div>
            {errors.confirmPassword && (
              <div className="invalid-feedback">
                <i className="fas fa-exclamation-circle"></i> {errors.confirmPassword}
              </div>
            )}
          </div>

          <div className="alert alert-info">
            <i className="fas fa-info-circle"></i>
            <span>Tu cuenta será creada como <strong>inactiva</strong> y requerirá activación por un administrador.</span>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block btn-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Registrando...
              </>
            ) : (
              <>
                <i className="fas fa-user-plus"></i> Crear Cuenta
              </>
            )}
          </button>
        </form>

        <div className="register-divider">
          <span>o</span>
        </div>

        <div className="register-alternative">
          <p>¿Ya tienes una cuenta? <Link to="/" className="register-link">Inicia sesión aquí</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;