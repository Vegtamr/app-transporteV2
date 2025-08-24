import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DateTimePickers() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Selectores de Fecha y Hora - React DatePicker</h2>
      
      <div className="card">
        <div className="card-content">
          <h4>Selectores Básicos</h4>
          
          <div className="form-row">
            <div className="form-group col-md-6">
              <label className="form-label">Fecha básica</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                placeholderText="Seleccionar fecha"
                dateFormat="dd/MM/yyyy"
                className="form-control"
                minDate={new Date()}
                onFocus={(e) => e.target.blur()}
              />
            </div>

            <div className="form-group col-md-6">
              <label className="form-label">Solo hora</label>
              <DatePicker
                selected={selectedTime}
                onChange={(date) => setSelectedTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Hora"
                dateFormat="HH:mm"
                placeholderText="Seleccionar hora"
                className="form-control"
                onFocus={(e) => e.target.blur()}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Fecha y hora</label>
            <DatePicker
              selected={selectedDateTime}
              onChange={(date) => setSelectedDateTime(date)}
              showTimeSelect
              dateFormat="dd/MM/yyyy HH:mm"
              placeholderText="Seleccionar fecha y hora"
              className="form-control"
              minDate={new Date()}
              onFocus={(e) => e.target.blur()}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Rango de fechas</label>
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                const [start, end] = update;
                setStartDate(start);
                setEndDate(end);
              }}
              placeholderText="Seleccionar rango"
              dateFormat="dd/MM/yyyy"
              className="form-control"
              minDate={new Date()}
              onFocus={(e) => e.target.blur()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DateTimePickers;