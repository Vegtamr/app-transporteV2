const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'client/public')));
app.use('/src', express.static(path.join(__dirname, 'client/src')));

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite');
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS usuarios (
    rut TEXT PRIMARY KEY,
    nombre TEXT NOT NULL,
    correo_electronico TEXT NOT NULL,
    password TEXT NOT NULL,
    contacto TEXT,
    activo BOOLEAN DEFAULT 1,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) {
    console.error('Error al crear tabla usuarios:', err.message);
  } else {
    console.log('Tabla usuarios creada o ya existe');
  }
});

app.get('/', (req, res) => {
  res.json({
    mensaje: 'Servidor activo',
    styleguide: 'http://localhost:3000/styleguide.html',
    api: {
      usuarios: '/api/usuarios'
    }
  });
});

app.get('/api/usuarios', (req, res) => {
  db.all('SELECT rut, nombre, correo_electronico, contacto, activo, creado_en FROM usuarios', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ usuarios: rows });
  });
});

app.get('/api/usuarios/:rut', (req, res) => {
  const { rut } = req.params;
  db.get('SELECT rut, nombre, correo_electronico, contacto, activo, creado_en FROM usuarios WHERE rut = ?', [rut], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }
    res.json({ usuario: row });
  });
});

app.post('/api/usuarios', (req, res) => {
  const { rut, nombre, correo_electronico, password, contacto, activo } = req.body;
  
  if (!rut || !nombre || !correo_electronico || !password) {
    res.status(400).json({ error: 'RUT, nombre, correo electrónico y password son requeridos' });
    return;
  }

  const activoValue = activo !== undefined ? activo : 1;

  db.run(
    'INSERT INTO usuarios (rut, nombre, correo_electronico, password, contacto, activo) VALUES (?, ?, ?, ?, ?, ?)',
    [rut, nombre, correo_electronico, password, contacto, activoValue],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          res.status(400).json({ error: 'El RUT ya está registrado' });
        } else {
          res.status(500).json({ error: err.message });
        }
        return;
      }
      res.status(201).json({
        mensaje: 'Usuario creado exitosamente',
        usuario: { 
          rut, 
          nombre, 
          correo_electronico, 
          contacto,
          activo: activoValue
        }
      });
    }
  );
});

app.put('/api/usuarios/:rut', (req, res) => {
  const { rut } = req.params;
  const { nombre, correo_electronico, password, contacto, activo } = req.body;
  
  let query = 'UPDATE usuarios SET nombre = ?, correo_electronico = ?, contacto = ?, activo = ?';
  let params = [nombre, correo_electronico, contacto, activo];
  
  if (password) {
    query = 'UPDATE usuarios SET nombre = ?, correo_electronico = ?, password = ?, contacto = ?, activo = ?';
    params = [nombre, correo_electronico, password, contacto, activo];
  }
  
  query += ' WHERE rut = ?';
  params.push(rut);
  
  db.run(query, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }
    res.json({ mensaje: 'Usuario actualizado exitosamente' });
  });
});

app.delete('/api/usuarios/:rut', (req, res) => {
  const { rut } = req.params;
  
  db.run('DELETE FROM usuarios WHERE rut = ?', [rut], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }
    res.json({ mensaje: 'Usuario eliminado exitosamente' });
  });
});

// Ruta catch-all para React (descomentar cuando se compile React)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`API disponible en http://localhost:${PORT}/api`);
});

process.on('SIGINT', () => {
  console.log('\nCerrando servidor...');
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Base de datos cerrada');
    process.exit(0);
  });
});