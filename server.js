const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static(__dirname));

// Ruta para obtener la configuración de las mariposas

app.get('/butterflies', (req, res) => {
  // Puedes hacer esto dinámico si lo deseas
  const butterflies = [
    { top: 100, left: 100, color: '#ff69b4', size: 80, animation: 'butterfly1' },
    { top: 200, left: 800, color: '#d94f8b', size: 80, animation: 'butterfly2' },
    { top: 300, left: 300, color: '#d94f8b', size: 80, animation: 'butterfly3' },
    { top: 400, left: 700, color: '#ff69b4', size: 80, animation: 'butterfly4' },
    { top: 250, left: 500, color: '#d94f8b', size: 80, animation: 'butterfly5' }
  ];
  res.json(butterflies);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
