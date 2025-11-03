const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Si no se define PORT, usará 5003 para no chocar con tus otros servicios
const PORT = process.env.PORT || 5003;

app.use(cors());

// Desactivar caché para todos los archivos
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

// Servir archivos estáticos de tu landing SIN caché
app.use(express.static(path.join(__dirname), {
  maxAge: 0,
  etag: false,
  lastModified: false,
  setHeaders: (res, path) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  }
}));

// Endpoint de mariposas
app.get('/butterflies', (req, res) => {
  const butterflies = [
    { top: 100, left: 100, color: '#ff69b4', size: 80, animation: 'butterfly1' },
    { top: 200, left: 800, color: '#d94f8b', size: 80, animation: 'butterfly2' },
    { top: 300, left: 300, color: '#d94f8b', size: 80, animation: 'butterfly3' },
    { top: 400, left: 700, color: '#ff69b4', size: 80, animation: 'butterfly4' },
    { top: 250, left: 500, color: '#d94f8b', size: 80, animation: 'butterfly5' }
  ];
  res.json(butterflies);
});

// Cargar index.html en cualquier ruta que no sea API
app.get('/*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`WebEuchuy corriendo en puerto ${PORT}`);
});
