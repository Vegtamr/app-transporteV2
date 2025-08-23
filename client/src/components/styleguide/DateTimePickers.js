import React, { useState } from 'react';

function DateTimePickers() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Obtener fecha de hoy para min/max
  const today = new Date().toISOString().split('T')[0];
  const currentTime = new Date().toTimeString().slice(0, 5);

  return (
    <section className="section">
      <h2>Selectores de Fecha y Hora</h2>

      <div className="example-group">
        <h3>Selector de Fecha</h3>
        <div className="form-group">
          <label htmlFor="date-basic" className="form-label">
            Fecha básica
          </label>
          <input
            type="date"
            id="date-basic"
            className="form-control"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          {selectedDate && (
            <small className="form-text">
              Fecha seleccionada: {new Date(selectedDate).toLocaleDateString('es-CL', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="date-restricted" className="form-label">
            Fecha con restricciones (Solo fechas futuras)
          </label>
          <input
            type="date"
            id="date-restricted"
            className="form-control"
            min={today}
            max="2024-12-31"
          />
          <small className="form-text">
            Solo permite seleccionar desde hoy hasta fin de año
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="date-required" className="form-label">
            Fecha requerida *
          </label>
          <input
            type="date"
            id="date-required"
            className="form-control"
            required
            defaultValue={today}
          />
        </div>
      </div>

      <div className="example-group">
        <h3>Selector de Hora</h3>
        <div className="form-group">
          <label htmlFor="time-basic" className="form-label">
            Hora básica
          </label>
          <input
            type="time"
            id="time-basic"
            className="form-control"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          />
          {selectedTime && (
            <small className="form-text">
              Hora seleccionada: {selectedTime}
            </small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="time-step" className="form-label">
            Hora con intervalos de 15 minutos
          </label>
          <input
            type="time"
            id="time-step"
            className="form-control"
            step="900"
          />
          <small className="form-text">
            Solo permite seleccionar en intervalos de 15 minutos
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="time-restricted" className="form-label">
            Horario de oficina (08:00 - 18:00)
          </label>
          <input
            type="time"
            id="time-restricted"
            className="form-control"
            min="08:00"
            max="18:00"
            defaultValue="09:00"
          />
        </div>
      </div>

      <div className="example-group">
        <h3>Selector de Fecha y Hora Combinado</h3>
        <div className="form-group">
          <label htmlFor="datetime-local" className="form-label">
            Fecha y hora completa
          </label>
          <input
            type="datetime-local"
            id="datetime-local"
            className="form-control"
            value={selectedDateTime}
            onChange={(e) => setSelectedDateTime(e.target.value)}
          />
          {selectedDateTime && (
            <small className="form-text">
              Seleccionado: {new Date(selectedDateTime).toLocaleString('es-CL', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="datetime-min" className="form-label">
            Programar viaje (mínimo 2 horas desde ahora)
          </label>
          <input
            type="datetime-local"
            id="datetime-min"
            className="form-control"
            min={new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().slice(0, 16)}
          />
        </div>
      </div>

      <div className="example-group">
        <h3>Selectores Especiales</h3>
        <div className="form-group">
          <label htmlFor="month-picker" className="form-label">
            Selector de mes
          </label>
          <input
            type="month"
            id="month-picker"
            className="form-control"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
          {selectedMonth && (
            <small className="form-text">
              Mes seleccionado: {new Date(selectedMonth + '-01').toLocaleDateString('es-CL', {
                year: 'numeric',
                month: 'long'
              })}
            </small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="week-picker" className="form-label">
            Selector de semana
          </label>
          <input
            type="week"
            id="week-picker"
            className="form-control"
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
          />
          {selectedWeek && (
            <small className="form-text">
              Semana seleccionada: {selectedWeek}
            </small>
          )}
        </div>
      </div>

      <div className="example-group">
        <h3>Rango de Fechas</h3>
        <div className="date-range-container">
          <div className="form-group">
            <label htmlFor="date-start" className="form-label">
              Fecha de inicio
            </label>
            <input
              type="date"
              id="date-start"
              className="form-control"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              max={dateRange.end || undefined}
            />
          </div>
          
          <div className="date-range-separator">
            <i className="fas fa-arrow-right"></i>
          </div>

          <div className="form-group">
            <label htmlFor="date-end" className="form-label">
              Fecha de fin
            </label>
            <input
              type="date"
              id="date-end"
              className="form-control"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              min={dateRange.start || undefined}
            />
          </div>
        </div>
        {dateRange.start && dateRange.end && (
          <small className="form-text text-success">
            <i className="fas fa-check-circle"></i> Rango: {' '}
            {new Date(dateRange.start).toLocaleDateString('es-CL')} - {' '}
            {new Date(dateRange.end).toLocaleDateString('es-CL')}
            {' '}({Math.ceil((new Date(dateRange.end) - new Date(dateRange.start)) / (1000 * 60 * 60 * 24))} días)
          </small>
        )}
      </div>

      <div className="example-group">
        <h3>Selectores con Iconos y Estados</h3>
        <div className="form-group">
          <label htmlFor="date-icon" className="form-label">
            Con icono de calendario
          </label>
          <div className="input-with-icon">
            <input
              type="date"
              id="date-icon"
              className="form-control"
              placeholder="Seleccionar fecha"
            />
            <div className="input-icon-left">
              <i className="fas fa-calendar-alt"></i>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="time-icon" className="form-label">
            Con icono de reloj
          </label>
          <div className="input-with-icon">
            <input
              type="time"
              id="time-icon"
              className="form-control"
            />
            <div className="input-icon-left">
              <i className="fas fa-clock"></i>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="date-disabled" className="form-label">
            Deshabilitado
          </label>
          <input
            type="date"
            id="date-disabled"
            className="form-control"
            disabled
            value={today}
          />
        </div>

        <div className="form-group">
          <label htmlFor="date-readonly" className="form-label">
            Solo lectura
          </label>
          <input
            type="date"
            id="date-readonly"
            className="form-control"
            readOnly
            value={today}
          />
        </div>
      </div>

      <div className="example-group">
        <h3>Diseño Responsivo</h3>
        <div className="datetime-grid">
          <div className="form-group">
            <label className="form-label">Fecha de salida</label>
            <input type="date" className="form-control" />
          </div>
          <div className="form-group">
            <label className="form-label">Hora de salida</label>
            <input type="time" className="form-control" />
          </div>
          <div className="form-group">
            <label className="form-label">Fecha de regreso</label>
            <input type="date" className="form-control" />
          </div>
          <div className="form-group">
            <label className="form-label">Hora de regreso</label>
            <input type="time" className="form-control" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default DateTimePickers;