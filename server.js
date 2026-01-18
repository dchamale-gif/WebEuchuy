const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const app = express();

// Si no se define PORT, usará 5003 para no chocar con tus otros servicios
const PORT = process.env.PORT || 5003;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de multer para subida de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'assets');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, name + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB límite
  fileFilter: function (req, file, cb) {
    // Aceptar solo imágenes
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de imagen'));
    }
  }
});

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

// ============= API ENDPOINTS =============

// Endpoint para subir imágenes
app.post('/api/upload-image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se recibió ningún archivo' });
    }
    
    const imageData = {
      id: Date.now(),
      name: req.file.filename,
      originalName: req.file.originalname,
      url: 'assets/' + req.file.filename,
      size: (req.file.size / 1024 / 1024).toFixed(2) + ' MB',
      date: new Date().toISOString().split('T')[0],
      category: req.body.category || 'portfolio'
    };
    
    res.json({ success: true, image: imageData });
  } catch (error) {
    console.error('Error al subir imagen:', error);
    res.status(500).json({ error: 'Error al subir la imagen' });
  }
});

// Endpoint para subir múltiples imágenes
app.post('/api/upload-images', upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No se recibieron archivos' });
    }
    
    const images = req.files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.filename,
      originalName: file.originalname,
      url: 'assets/' + file.filename,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      date: new Date().toISOString().split('T')[0],
      category: req.body.category || 'portfolio'
    }));
    
    res.json({ success: true, images: images });
  } catch (error) {
    console.error('Error al subir imágenes:', error);
    res.status(500).json({ error: 'Error al subir las imágenes' });
  }
});

// Endpoint para listar imágenes
app.get('/api/images', (req, res) => {
  try {
    const assetsDir = path.join(__dirname, 'assets');
    
    if (!fs.existsSync(assetsDir)) {
      return res.json({ images: [] });
    }
    
    const files = fs.readdirSync(assetsDir);
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    
    const images = files
      .filter(file => imageExtensions.includes(path.extname(file).toLowerCase()))
      .map((file, index) => {
        const filePath = path.join(assetsDir, file);
        const stats = fs.statSync(filePath);
        
        return {
          id: index + 1,
          name: file,
          url: 'assets/' + file,
          size: (stats.size / 1024 / 1024).toFixed(2) + ' MB',
          date: stats.mtime.toISOString().split('T')[0],
          category: 'portfolio'
        };
      });
    
    res.json({ images: images });
  } catch (error) {
    console.error('Error al listar imágenes:', error);
    res.status(500).json({ error: 'Error al listar imágenes' });
  }
});

// Endpoint para eliminar imagen
app.delete('/api/images/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'assets', filename);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ success: true, message: 'Imagen eliminada correctamente' });
    } else {
      res.status(404).json({ error: 'Imagen no encontrada' });
    }
  } catch (error) {
    console.error('Error al eliminar imagen:', error);
    res.status(500).json({ error: 'Error al eliminar la imagen' });
  }
});

// Endpoint para guardar datos de blog
app.post('/api/blogs', (req, res) => {
  try {
    const blogsFile = path.join(__dirname, 'data', 'blogs.json');
    const blogsDir = path.dirname(blogsFile);
    
    if (!fs.existsSync(blogsDir)) {
      fs.mkdirSync(blogsDir, { recursive: true });
    }
    
    const blogs = req.body.blogs || [];
    fs.writeFileSync(blogsFile, JSON.stringify(blogs, null, 2));
    
    res.json({ success: true, message: 'Blogs guardados correctamente' });
  } catch (error) {
    console.error('Error al guardar blogs:', error);
    res.status(500).json({ error: 'Error al guardar blogs' });
  }
});

// Endpoint para obtener blogs
app.get('/api/blogs', (req, res) => {
  try {
    const blogsFile = path.join(__dirname, 'data', 'blogs.json');
    
    if (fs.existsSync(blogsFile)) {
      const data = fs.readFileSync(blogsFile, 'utf8');
      const blogs = JSON.parse(data);
      res.json({ blogs: blogs });
    } else {
      res.json({ blogs: [] });
    }
  } catch (error) {
    console.error('Error al obtener blogs:', error);
    res.status(500).json({ error: 'Error al obtener blogs' });
  }
});

// Endpoint para guardar configuración de páginas
app.post('/api/pages', (req, res) => {
  try {
    const pagesFile = path.join(__dirname, 'data', 'pages.json');
    const pagesDir = path.dirname(pagesFile);
    
    if (!fs.existsSync(pagesDir)) {
      fs.mkdirSync(pagesDir, { recursive: true });
    }
    
    const pages = req.body.pages || [];
    fs.writeFileSync(pagesFile, JSON.stringify(pages, null, 2));
    
    res.json({ success: true, message: 'Páginas guardadas correctamente' });
  } catch (error) {
    console.error('Error al guardar páginas:', error);
    res.status(500).json({ error: 'Error al guardar páginas' });
  }
});

// Endpoint para obtener configuración de páginas
app.get('/api/pages', (req, res) => {
  try {
    const pagesFile = path.join(__dirname, 'data', 'pages.json');
    
    if (fs.existsSync(pagesFile)) {
      const data = fs.readFileSync(pagesFile, 'utf8');
      const pages = JSON.parse(data);
      res.json({ pages: pages });
    } else {
      res.json({ pages: [] });
    }
  } catch (error) {
    console.error('Error al obtener páginas:', error);
    res.status(500).json({ error: 'Error al obtener páginas' });
  }
});

// ============= PUBLICACIONES =============

// Crear nueva publicación
app.post('/api/posts', (req, res) => {
  try {
    const postsFile = path.join(__dirname, 'data', 'posts.json');
    const postsDir = path.dirname(postsFile);
    
    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir, { recursive: true });
    }
    
    let posts = [];
    if (fs.existsSync(postsFile)) {
      const data = fs.readFileSync(postsFile, 'utf8');
      posts = JSON.parse(data);
    }
    
    const newPost = {
      id: Date.now(),
      message: req.body.message,
      image: req.body.image || null,
      date: new Date().toISOString(),
      published: req.body.published !== false,
      comments: []
    };
    
    posts.unshift(newPost);
    fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
    
    res.json({ success: true, post: newPost });
  } catch (error) {
    console.error('Error al crear publicación:', error);
    res.status(500).json({ error: 'Error al crear publicación' });
  }
});

// Obtener todas las publicaciones
app.get('/api/posts', (req, res) => {
  try {
    const postsFile = path.join(__dirname, 'data', 'posts.json');
    
    if (fs.existsSync(postsFile)) {
      const data = fs.readFileSync(postsFile, 'utf8');
      const posts = JSON.parse(data);
      res.json({ posts: posts.filter(p => p.published) });
    } else {
      res.json({ posts: [] });
    }
  } catch (error) {
    console.error('Error al obtener publicaciones:', error);
    res.status(500).json({ error: 'Error al obtener publicaciones' });
  }
});

// Obtener todas las publicaciones (admin - incluye borradores)
app.get('/api/posts/all', (req, res) => {
  try {
    const postsFile = path.join(__dirname, 'data', 'posts.json');
    
    if (fs.existsSync(postsFile)) {
      const data = fs.readFileSync(postsFile, 'utf8');
      const posts = JSON.parse(data);
      res.json({ posts: posts });
    } else {
      res.json({ posts: [] });
    }
  } catch (error) {
    console.error('Error al obtener publicaciones:', error);
    res.status(500).json({ error: 'Error al obtener publicaciones' });
  }
});

// Actualizar publicación
app.put('/api/posts/:id', (req, res) => {
  try {
    const postsFile = path.join(__dirname, 'data', 'posts.json');
    
    if (!fs.existsSync(postsFile)) {
      return res.status(404).json({ error: 'No se encontraron publicaciones' });
    }
    
    const data = fs.readFileSync(postsFile, 'utf8');
    let posts = JSON.parse(data);
    
    const postIndex = posts.findIndex(p => p.id == req.params.id);
    if (postIndex === -1) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }
    
    posts[postIndex] = { ...posts[postIndex], ...req.body };
    fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
    
    res.json({ success: true, post: posts[postIndex] });
  } catch (error) {
    console.error('Error al actualizar publicación:', error);
    res.status(500).json({ error: 'Error al actualizar publicación' });
  }
});

// Eliminar publicación
app.delete('/api/posts/:id', (req, res) => {
  try {
    const postsFile = path.join(__dirname, 'data', 'posts.json');
    
    if (!fs.existsSync(postsFile)) {
      return res.status(404).json({ error: 'No se encontraron publicaciones' });
    }
    
    const data = fs.readFileSync(postsFile, 'utf8');
    let posts = JSON.parse(data);
    
    posts = posts.filter(p => p.id != req.params.id);
    fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error al eliminar publicación:', error);
    res.status(500).json({ error: 'Error al eliminar publicación' });
  }
});

// ============= COMENTARIOS =============

// Agregar comentario a una publicación
app.post('/api/posts/:id/comments', (req, res) => {
  try {
    const postsFile = path.join(__dirname, 'data', 'posts.json');
    
    if (!fs.existsSync(postsFile)) {
      return res.status(404).json({ error: 'No se encontraron publicaciones' });
    }
    
    const data = fs.readFileSync(postsFile, 'utf8');
    let posts = JSON.parse(data);
    
    const postIndex = posts.findIndex(p => p.id == req.params.id);
    if (postIndex === -1) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }
    
    const newComment = {
      id: Date.now(),
      name: req.body.name,
      message: req.body.message,
      date: new Date().toISOString()
    };
    
    if (!posts[postIndex].comments) {
      posts[postIndex].comments = [];
    }
    
    posts[postIndex].comments.push(newComment);
    fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
    
    res.json({ success: true, comment: newComment });
  } catch (error) {
    console.error('Error al agregar comentario:', error);
    res.status(500).json({ error: 'Error al agregar comentario' });
  }
});

// Eliminar comentario (admin)
app.delete('/api/posts/:postId/comments/:commentId', (req, res) => {
  try {
    const postsFile = path.join(__dirname, 'data', 'posts.json');
    
    if (!fs.existsSync(postsFile)) {
      return res.status(404).json({ error: 'No se encontraron publicaciones' });
    }
    
    const data = fs.readFileSync(postsFile, 'utf8');
    let posts = JSON.parse(data);
    
    const postIndex = posts.findIndex(p => p.id == req.params.postId);
    if (postIndex === -1) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }
    
    if (posts[postIndex].comments) {
      posts[postIndex].comments = posts[postIndex].comments.filter(
        c => c.id != req.params.commentId
      );
    }
    
    fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error al eliminar comentario:', error);
    res.status(500).json({ error: 'Error al eliminar comentario' });
  }
});

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

// Cargar index.html en cualquier ruta que no sea API (fallback)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`WebEuchuy corriendo en puerto ${PORT}`);
});
