const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
// hola Inge uso sqlite porque tengo problemas con xamp para la conexion es un error de archivos y pues no tenia 
//tiempo para ponerme a arreglarlo en medio del examen
app.use(cors());
app.use(bodyParser.json({limit: '10mb'}));
const dbPath = path.join(__dirname, 'productos.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    precio REAL,
    estado TEXT,
    categoria TEXT,
    url_foto TEXT,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

app.get('/productos', (req, res) => {
  db.all('SELECT * FROM productos ORDER BY creado_en DESC', [], (err, rows) => {
    if (err) return res.status(500).json({error: err.message});
    res.json(rows);
  });
});

app.post('/productos', (req, res) => {
  const { nombre, descripcion, precio, estado, categoria, url_foto } = req.body;
  if (!nombre) return res.status(400).json({error: 'El nombre es obligatorio'});
  const stmt = db.prepare('INSERT INTO productos (nombre, descripcion, precio, estado, categoria, url_foto) VALUES (?, ?, ?, ?, ?, ?)');
  stmt.run(nombre, descripcion || '', precio || 0, estado || 'Disponible', categoria || '', url_foto || '', function(err) {
    if (err) return res.status(500).json({error: err.message});
    db.get('SELECT * FROM productos WHERE id = ?', [this.lastID], (err2, row) => {
      if (err2) return res.status(500).json({error: err2.message});
      res.status(201).json(row);
    });
  });
});

app.delete('/productos/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM productos WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({error: err.message});
    if (this.changes === 0) return res.status(404).json({error: 'Producto no encontrado'});
    res.json({mensaje: 'Producto eliminado'});
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor iniciado en puerto', PORT);
});
