# 📸 Guía de Uso de Imágenes

Esta guía explica cómo agregar y gestionar imágenes en tu sitio web usando el panel de administración.

## 🚀 Subir Imágenes

### Método 1: Panel de Administración (Recomendado)

1. Acceder a `http://localhost:5003/admin-login.html`
2. Iniciar sesión con tus credenciales
3. Ir a la pestaña **"📸 Imágenes"**
4. Click en **"+ Subir Imagen"**
5. Seleccionar una o múltiples imágenes
6. Las imágenes se guardan automáticamente en la carpeta `assets/`

### Método 2: Subida Manual

Coloca tus imágenes directamente en la carpeta `assets/` del proyecto.

## 📋 Copiar URLs de Imágenes

1. En el panel admin, ir a **Gestión de Imágenes**
2. Buscar la imagen que deseas usar
3. Click en **"📋 Copiar URL"**
4. La URL se copia al portapapeles: `assets/nombre-imagen.jpg`

## 💻 Usar Imágenes en HTML

### Imagen Simple

```html
<img src="assets/tu-imagen.jpg" alt="Descripción de la imagen">
```

### Imagen Responsive

```html
<img src="assets/tu-imagen.jpg" 
     alt="Descripción" 
     style="width: 100%; height: auto;">
```

### Imagen como Fondo

```html
<div style="
    background-image: url('assets/tu-imagen.jpg');
    background-size: cover;
    background-position: center;
    height: 400px;
">
    <!-- Contenido -->
</div>
```

### Imagen en CSS

```css
.hero-section {
    background-image: url('../assets/tu-imagen.jpg');
    background-size: cover;
    background-position: center;
}
```

## 🎨 Layouts de Galería

### Grid Layout (Cuadrícula)

```html
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
    <img src="assets/imagen1.jpg" alt="Imagen 1">
    <img src="assets/imagen2.jpg" alt="Imagen 2">
    <img src="assets/imagen3.jpg" alt="Imagen 3">
</div>
```

### Flexbox Layout

```html
<div style="display: flex; gap: 20px; flex-wrap: wrap;">
    <img src="assets/imagen1.jpg" style="flex: 1; min-width: 300px;" alt="Imagen 1">
    <img src="assets/imagen2.jpg" style="flex: 1; min-width: 300px;" alt="Imagen 2">
</div>
```

### Masonry Layout

Usa la página de ejemplo `galeria.html` incluida en el proyecto.

## 🖼️ Ejemplos Prácticos

### Hero Section con Imagen

```html
<section style="
    position: relative;
    height: 100vh;
    background-image: url('assets/hero-image.jpg');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
">
    <div style="text-align: center; color: white; z-index: 1;">
        <h1 style="font-size: 48px; margin-bottom: 20px;">Eunice Chuy</h1>
        <p style="font-size: 24px;">Creadora de Contenido</p>
    </div>
    
    <!-- Overlay oscuro -->
    <div style="
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
    "></div>
</section>
```

### Galería de Portfolio

```html
<section style="padding: 80px 20px;">
    <h2 style="text-align: center; font-size: 36px; margin-bottom: 50px;">
        Mi Portfolio
    </h2>
    
    <div style="
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 30px;
        max-width: 1200px;
        margin: 0 auto;
    ">
        <div style="
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        ">
            <img src="assets/portfolio1.jpg" 
                 alt="Proyecto 1"
                 style="width: 100%; height: 300px; object-fit: cover;">
            <div style="padding: 20px;">
                <h3>Proyecto 1</h3>
                <p>Descripción del proyecto</p>
            </div>
        </div>
        
        <!-- Repetir para más proyectos -->
    </div>
</section>
```

### Carrusel de Imágenes

Ver implementación completa en `galeria.html`

## 🎯 Optimización de Imágenes

### Tamaños Recomendados

- **Hero/Banner**: 1920x1080px (16:9)
- **Portfolio**: 800x800px (1:1) o 1200x800px (3:2)
- **Thumbnails**: 400x400px
- **Blog**: 1200x630px (ideal para redes sociales)

### Formato Recomendado

- **JPG**: Fotos y imágenes con muchos colores
- **PNG**: Imágenes con transparencia o texto
- **WebP**: Mejor compresión (navegadores modernos)

### Herramientas de Optimización

- [TinyPNG](https://tinypng.com/) - Comprimir imágenes
- [Squoosh](https://squoosh.app/) - Optimizar y convertir
- [ImageOptim](https://imageoptim.com/) - App para Mac

## 📱 Imágenes Responsive

### Usando srcset

```html
<img 
    src="assets/imagen-medium.jpg"
    srcset="
        assets/imagen-small.jpg 400w,
        assets/imagen-medium.jpg 800w,
        assets/imagen-large.jpg 1200w
    "
    sizes="(max-width: 400px) 400px, 
           (max-width: 800px) 800px, 
           1200px"
    alt="Imagen responsive"
>
```

### Lazy Loading

```html
<img src="assets/imagen.jpg" 
     alt="Imagen" 
     loading="lazy">
```

## 🔗 Integración con Blogs

### En admin.js

Las imágenes subidas están disponibles para usar en blogs:

```javascript
// Al crear/editar un blog
const blog = {
    title: 'Mi Blog',
    image: 'assets/imagen-blog.jpg', // Copiar URL del panel
    content: '...'
};
```

### En HTML del Blog

```html
<article>
    <img src="assets/imagen-blog.jpg" 
         alt="Título del blog"
         style="width: 100%; border-radius: 15px; margin-bottom: 30px;">
    
    <h1>Título del Blog</h1>
    <p>Contenido...</p>
</article>
```

## 💡 Tips y Mejores Prácticas

### 1. Nombres de Archivo
- Usa nombres descriptivos: `fotografia-producto-2024.jpg`
- Evita espacios: usa guiones `-`
- Lowercase: `mi-imagen.jpg` mejor que `Mi-Imagen.JPG`

### 2. Alt Text
Siempre incluye texto alternativo descriptivo:
```html
<img src="assets/foto.jpg" alt="Eunice Chuy fotografiando en estudio">
```

### 3. Organización
Crea subcarpetas en `assets/` si tienes muchas imágenes:
```
assets/
├── portfolio/
├── blogs/
├── productos/
└── equipo/
```

### 4. Backup
- Haz respaldo de la carpeta `assets/` regularmente
- Considera usar servicios de almacenamiento en la nube

### 5. CDN (Avanzado)
Para sitios con muchas visitas, considera usar un CDN:
- [Cloudinary](https://cloudinary.com/)
- [ImageKit](https://imagekit.io/)
- [Imgix](https://www.imgix.com/)

## 🌐 Ver Galería de Ejemplo

Abre `galeria.html` en tu navegador para ver ejemplos de diferentes layouts:

```
http://localhost:5003/galeria.html
```

## 📊 API de Imágenes

Si necesitas acceder programáticamente:

### Listar todas las imágenes
```javascript
fetch('/api/images')
    .then(res => res.json())
    .then(data => {
        console.log(data.images);
    });
```

### Subir imagen con JavaScript
```javascript
const formData = new FormData();
formData.append('images', fileInput.files[0]);

fetch('/api/upload-images', {
    method: 'POST',
    body: formData
})
.then(res => res.json())
.then(data => {
    console.log('Imagen subida:', data.images);
});
```

## 🆘 Solución de Problemas

### Imagen no se muestra
1. Verificar que la ruta sea correcta: `assets/imagen.jpg`
2. Verificar que el archivo exista en la carpeta
3. Revisar la consola del navegador (F12) para errores

### Imagen muy pesada
1. Comprimir con TinyPNG
2. Redimensionar a tamaño apropiado
3. Convertir a WebP si es posible

### No se puede subir imagen
1. Verificar que el servidor esté corriendo: `npm start`
2. Verificar límite de tamaño (máximo 10MB)
3. Verificar formato (solo imágenes)

---

**¿Necesitas más ayuda?** Consulta el archivo `ADMIN_README.md`
