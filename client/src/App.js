import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Styleguide from './pages/Styleguide';
import './styleguide.css';

function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>App Transporte</h1>
      <p>Sistema de Gestión de Transporte</p>
      <Link to="/styleguide" className="btn btn-primary">
        Ver Sistema de Diseño
      </Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/styleguide" element={<Styleguide />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
