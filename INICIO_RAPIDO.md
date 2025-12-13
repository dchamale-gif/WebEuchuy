# 🚀 Inicio Rápido - Panel Admin

## ⚡ Comandos Esenciales

### 1. Iniciar el servidor
```bash
npm start
```

### 2. Acceder al panel admin
Abre en tu navegador:
```
http://localhost:5003/admin-login.html
```

### 3. Credenciales de acceso
- **Usuario**: `admin`
- **Contraseña**: `eunice2024`

⚠️ **IMPORTANTE**: Cambiar la contraseña en `admin-login.html` (línea 172)

## 📋 Accesos Rápidos

| Página | URL |
|--------|-----|
| 🔐 Login Admin | http://localhost:5003/admin-login.html |
| 🎨 Panel Admin | http://localhost:5003/admin-dashboard.html |
| 🏠 Sitio Web | http://localhost:5003/ |
| 🖼️ Galería Ejemplo | http://localhost:5003/galeria.html |

## 🎯 Funcionalidades Principales

### 📸 Gestión de Imágenes
- ✅ Subir múltiples imágenes
- ✅ Ver todas las imágenes
- ✅ Copiar URL al portapapeles
- ✅ Eliminar imágenes
- ✅ Almacenamiento en servidor

### 📝 Gestión de Blogs
- ✅ Crear nuevos blogs
- ✅ Editar contenido
- ✅ Publicar/Archivar
- ✅ Eliminar blogs
- ✅ URLs amigables automáticas

### 🌐 Gestión de Páginas
- ✅ Editar contenido de páginas
- ✅ Modificar títulos y textos
- ✅ Vista organizada por secciones

## 📁 Estructura de Archivos

```
WebEuchuy/
│
├── 🔑 ADMIN
│   ├── admin-login.html          # Login
│   ├── admin-dashboard.html      # Dashboard
│   └── scripts/admin.js          # Lógica admin
│
├── 📄 PÁGINAS
│   ├── index.html                # Página principal
│   ├── galeria.html              # Galería ejemplo
│   ├── estrategias-contenido.html
│   ├── fotografia-creativa.html
│   └── video-marketing.html
│
├── 📂 ASSETS
│   ├── assets/                   # Imágenes subidas
│   └── data/                     # Datos JSON
│
├── ⚙️ BACKEND
│   ├── server.js                 # Servidor Node.js
│   └── package.json              # Dependencias
│
└── 📚 DOCUMENTACIÓN
    ├── ADMIN_README.md           # Guía completa
    ├── GUIA_IMAGENES.md          # Cómo usar imágenes
    └── INICIO_RAPIDO.md          # Este archivo
```

## 🔧 Configuración Rápida

### Cambiar Puerto
Editar `server.js` línea 8:
```javascript
const PORT = process.env.PORT || 5003; // Cambiar aquí
```

### Cambiar Contraseña Admin
Editar `admin-login.html` línea 172:
```javascript
const ADMIN_PASSWORD = 'eunice2024'; // Cambiar aquí
```

## 💾 Almacenamiento

### Datos Locales (localStorage)
- Datos temporales del navegador
- Se borran al limpiar caché
- Usado como fallback

### Datos en Servidor
- 📸 Imágenes: `assets/`
- 📝 Blogs: `data/blogs.json`
- 🌐 Páginas: `data/pages.json`

## 🎨 Uso Básico de Imágenes

### 1. Subir imagen en el admin
```
Panel Admin → Imágenes → + Subir Imagen
```

### 2. Copiar URL
```
Click en "📋 Copiar URL"
```

### 3. Usar en HTML
```html
<img src="assets/tu-imagen.jpg" alt="Descripción">
```

Ver más ejemplos en `GUIA_IMAGENES.md`

## 🐛 Solución de Problemas

### El servidor no inicia
```bash
# Verificar que el puerto esté libre
netstat -ano | findstr :5003

# Cambiar puerto en server.js si es necesario
```

### No puedo acceder al admin
1. Verificar que el servidor esté corriendo
2. Verificar la URL: `http://localhost:5003/admin-login.html`
3. Verificar usuario y contraseña

### Las imágenes no se guardan
1. Verificar que el servidor esté corriendo
2. Verificar que la carpeta `assets/` exista
3. Verificar permisos de escritura

### Error al subir imágenes
- Verificar tamaño máximo: 10MB
- Verificar formato: solo imágenes
- Verificar conexión con el servidor

## 📖 Documentación Completa

Para información detallada, consulta:

- **ADMIN_README.md** - Guía completa del panel admin
- **GUIA_IMAGENES.md** - Cómo usar y optimizar imágenes
- **EMAILJS_SETUP.md** - Configuración del formulario de contacto

## 🎯 Próximos Pasos

1. ✅ Cambiar contraseña del admin
2. ✅ Subir tus imágenes
3. ✅ Crear entradas de blog
4. ✅ Personalizar contenido
5. ✅ Explorar la galería de ejemplo

## 🆘 ¿Necesitas Ayuda?

Si encuentras algún problema:
1. Revisa la consola del navegador (F12)
2. Revisa los logs del servidor en la terminal
3. Consulta la documentación completa

---

**¡Listo para empezar! 🚀**

Inicia el servidor con `npm start` y accede a:
**http://localhost:5003/admin-login.html**
