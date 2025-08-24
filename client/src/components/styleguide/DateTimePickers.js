import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';

// Registrar el idioma español con formato personalizado
registerLocale('es', es);

// Formato personalizado para el header del calendario
const customHeaderFormat = "MMM yyyy";

function DateTimePickers() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [inlineDate, setInlineDate] = useState(new Date());
  const [monthYear, setMonthYear] = useState(null);
  const [multiDates, setMultiDates] = useState([]);

  return (
    <section className="section">
      <h2>Selectores de Fecha y Hora - React DatePicker</h2>

      <div className="surface-padded-section">
        <h3>Selectores Básicos</h3>
        
        <div className="form-group">
          <label className="form-label">
            Fecha básica
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="form-control"
            placeholderText="Seleccionar fecha"
            dateFormat="dd/MM/yyyy"
            dateFormatCalendarHeader={customHeaderFormat}
            locale="es"
            isClearable
            showPopperArrow={false}
          />
          {selectedDate && (
            <small className="form-text">
              Fecha: {selectedDate.toLocaleDateString('es-CL', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </small>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">
            Solo hora
          </label>
          <DatePicker
            selected={selectedTime}
            onChange={(date) => setSelectedTime(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Hora"
            dateFormat="HH:mm"
            className="form-control"
            placeholderText="Seleccionar hora"
            locale="es"
            showPopperArrow={false}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Fecha y hora combinados
          </label>
          <DatePicker
            selected={selectedDateTime}
            onChange={(date) => setSelectedDateTime(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="dd/MM/yyyy HH:mm"
            timeCaption="Hora"
            className="form-control"
            placeholderText="Seleccionar fecha y hora"
            locale="es"
            showPopperArrow={false}
          />
        </div>
      </div>

      <div className="surface-padded-section">
        <h3>Selectores con Restricciones</h3>
        
        <div className="form-group">
          <label className="form-label">
            Solo fechas futuras (próximos 30 días)
          </label>
          <DatePicker
            selected={null}
            onChange={(date) => {}}
            className="form-control"
            placeholderText="Solo fechas futuras"
            dateFormat="dd/MM/yyyy"
            locale="es"
            minDate={new Date()}
            maxDate={new Date(new Date().setDate(new Date().getDate() + 30))}
            showPopperArrow={false}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Días laborales únicamente (L-V)
          </label>
          <DatePicker
            selected={null}
            onChange={(date) => {}}
            className="form-control"
            placeholderText="Solo días laborales"
            dateFormat="dd/MM/yyyy"
            locale="es"
            filterDate={(date) => {
              const day = date.getDay();
              return day !== 0 && day !== 6;
            }}
            showPopperArrow={false}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Con días destacados y excluidos
          </label>
          <DatePicker
            selected={null}
            onChange={(date) => {}}
            className="form-control"
            placeholderText="Días específicos"
            dateFormat="dd/MM/yyyy"
            locale="es"
            excludeDates={[
              new Date(),
              new Date(new Date().setDate(new Date().getDate() + 1))
            ]}
            highlightDates={[
              { "react-datepicker__day--highlighted-custom-1": [new Date(new Date().setDate(new Date().getDate() + 7))] },
              { "react-datepicker__day--highlighted-custom-2": [new Date(new Date().setDate(new Date().getDate() + 14))] }
            ]}
            showPopperArrow={false}
          />
          <small className="form-text">
            Hoy y mañana deshabilitados, próximas semanas destacadas
          </small>
        </div>
      </div>

      <div className="surface-padded-section">
        <h3>Selectores Avanzados</h3>
        
        <div className="form-group">
          <label className="form-label">
            Rango de fechas
          </label>
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => setDateRange(update)}
            className="form-control"
            placeholderText="Seleccionar rango"
            dateFormat="dd/MM/yyyy"
            locale="es"
            isClearable={true}
            showPopperArrow={false}
          />
          {startDate && endDate && (
            <small className="form-text text-success">
              <i className="fas fa-check-circle"></i> {' '}
              {Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1} días seleccionados
            </small>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">
            Selector de mes y año
          </label>
          <DatePicker
            selected={monthYear}
            onChange={(date) => setMonthYear(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            className="form-control"
            placeholderText="Seleccionar mes"
            locale="es"
            showPopperArrow={false}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Selección múltiple de fechas
          </label>
          <DatePicker
            selectedDates={multiDates}
            onChange={(dates) => setMultiDates(dates)}
            shouldCloseOnSelect={false}
            disabledKeyboardNavigation
            placeholderText="Seleccionar múltiples fechas"
            className="form-control"
            dateFormat="dd/MM/yyyy"
            locale="es"
            isClearable
            multidate
            showPopperArrow={false}
          />
          {multiDates.length > 0 && (
            <small className="form-text">
              {multiDates.length} fechas seleccionadas
            </small>
          )}
        </div>
      </div>

      <div className="surface-padded-section">
        <h3>Calendario Inline</h3>
        <div className="form-group">
          <label className="form-label">
            Calendario siempre visible
          </label>
          <div className="datepicker-inline-wrapper">
            <DatePicker
              selected={inlineDate}
              onChange={(date) => setInlineDate(date)}
              inline
              locale="es"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              calendarClassName="datepicker-inline"
            />
          </div>
          {inlineDate && (
            <small className="form-text">
              Seleccionado: {inlineDate.toLocaleDateString('es-CL', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </small>
          )}
        </div>
      </div>

      <div className="surface-padded-section">
        <h3>Personalización Visual</h3>
        
        <div className="form-group">
          <label className="form-label">
            Con icono personalizado
          </label>
          <div className="input-with-icon">
            <DatePicker
              selected={null}
              onChange={(date) => {}}
              className="form-control with-icon"
              placeholderText="Fecha con icono"
              dateFormat="dd/MM/yyyy"
              locale="es"
              showPopperArrow={false}
            />
            <div className="input-icon-left">
              <i className="fas fa-calendar-alt"></i>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Tamaño pequeño
          </label>
          <DatePicker
            selected={null}
            onChange={(date) => {}}
            className="form-control form-control-sm"
            placeholderText="Selector pequeño"
            dateFormat="dd/MM/yyyy"
            locale="es"
            showPopperArrow={false}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Tamaño grande
          </label>
          <DatePicker
            selected={null}
            onChange={(date) => {}}
            className="form-control form-control-lg"
            placeholderText="Selector grande"
            dateFormat="dd/MM/yyyy"
            locale="es"
            showPopperArrow={false}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Deshabilitado
          </label>
          <DatePicker
            selected={new Date()}
            onChange={(date) => {}}
            className="form-control"
            dateFormat="dd/MM/yyyy"
            locale="es"
            disabled
            showPopperArrow={false}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Solo lectura
          </label>
          <DatePicker
            selected={new Date()}
            onChange={(date) => {}}
            className="form-control"
            dateFormat="dd/MM/yyyy"
            locale="es"
            readOnly
            showPopperArrow={false}
          />
        </div>
      </div>
    </section>
  );
}

export default DateTimePickers;