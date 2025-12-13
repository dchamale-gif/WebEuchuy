# 🎨 Panel de Administración - Eunice Chuy

Panel de administración completo para gestionar el contenido del sitio web.

## 🚀 Características

### ✅ Sistema de Autenticación
- Login seguro con sesión de 24 horas
- Usuario: `admin`
- Contraseña: `eunice2024` (CAMBIAR en producción)

### 📸 Gestión de Imágenes
- ✨ Subir múltiples imágenes simultáneamente
- 👁️ Vista previa con thumbnails
- 📋 Copiar URL de imágenes al portapapeles
- 🗑️ Eliminar imágenes
- 💾 Almacenamiento en carpeta `assets/`
- 📊 Estadísticas de uso

### 📝 Gestión de Blogs
- ➕ Crear nuevas entradas de blog
- ✏️ Editar contenido existente
- 📤 Publicar/Archivar blogs
- 🗑️ Eliminar entradas
- 🔗 URLs amigables (slugs automáticos)

### 🌐 Gestión de Páginas
- Editar contenido de todas las páginas del sitio
- Modificar títulos, subtítulos y textos
- Vista organizada por secciones

## 📦 Instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor:**
   ```bash
   npm start
   ```
   
   O en modo desarrollo:
   ```bash
   npm run dev
   ```

3. **Acceder al panel:**
   - Admin: `http://localhost:5003/admin-login.html`
   - Sitio web: `http://localhost:5003/`

## 🔧 Configuración

### Cambiar Contraseña de Admin
Editar en `admin-login.html` línea 172:
```javascript
const ADMIN_PASSWORD = 'eunice2024'; // CAMBIAR AQUÍ
```

### Cambiar Puerto del Servidor
Editar en `server.js` línea 8:
```javascript
const PORT = process.env.PORT || 5003; // CAMBIAR AQUÍ
```

## 📂 Estructura de Archivos

```
WebEuchuy/
├── admin-login.html          # Página de login
├── admin-dashboard.html      # Panel de administración
├── scripts/
│   ├── admin.js             # Lógica del panel admin
│   └── main.js              # Scripts del sitio principal
├── assets/                   # Imágenes subidas
├── data/                     # Datos JSON (blogs, páginas)
├── server.js                 # Servidor Node.js con APIs
└── package.json              # Dependencias
```

## 🔌 API Endpoints

### Imágenes
- `POST /api/upload-image` - Subir una imagen
- `POST /api/upload-images` - Subir múltiples imágenes
- `GET /api/images` - Listar todas las imágenes
- `DELETE /api/images/:filename` - Eliminar una imagen

### Blogs
- `POST /api/blogs` - Guardar blogs
- `GET /api/blogs` - Obtener blogs

### Páginas
- `POST /api/pages` - Guardar configuración
- `GET /api/pages` - Obtener configuración

## 💡 Cómo Usar

### Subir Imágenes

1. Ir a "Gestión de Imágenes"
2. Click en "Subir Imagen"
3. Seleccionar una o múltiples imágenes
4. Las imágenes se guardan automáticamente
5. Copiar URL para usar en el sitio

### Crear un Blog

1. Ir a "Gestión de Blogs"
2. Click en "Nuevo Blog"
3. Ingresar título (se genera slug automático)
4. Click en "Editar" para modificar contenido
5. Click en "Publicar" para hacerlo visible

### Editar Páginas

1. Ir a "Gestión de Páginas"
2. Click en "Editar Contenido" de la página deseada
3. Modificar textos mediante los prompts
4. Los cambios se guardan en localStorage y JSON

## 🎯 Mejoras Futuras Sugeridas

### Backend Robusto
- [ ] Implementar base de datos (MongoDB/PostgreSQL)
- [ ] Sistema de usuarios con roles
- [ ] Autenticación con JWT
- [ ] Optimización de imágenes automática
- [ ] CDN para imágenes

### Editor Avanzado
- [ ] Editor WYSIWYG para blogs (TinyMCE/Quill)
- [ ] Editor de código para HTML/CSS
- [ ] Vista previa en tiempo real
- [ ] Galería de imágenes con búsqueda

### SEO y Analytics
- [ ] Meta tags personalizables
- [ ] Integración con Google Analytics
- [ ] Sitemap automático
- [ ] Panel de estadísticas

### Funcionalidades Adicionales
- [ ] Sistema de comentarios en blogs
- [ ] Newsletter/Email marketing
- [ ] Backup automático
- [ ] Historial de cambios (versionado)
- [ ] Multi-idioma

## 🔒 Seguridad

⚠️ **IMPORTANTE:**
- Cambiar la contraseña por defecto
- No subir credenciales a GitHub
- Usar HTTPS en producción
- Implementar rate limiting
- Validar todos los inputs

## 📝 Notas

- Actualmente usa **localStorage** para almacenamiento temporal
- Para producción, considera migrar a base de datos
- Las imágenes se almacenan en la carpeta `assets/`
- Los datos de blogs/páginas se guardan en `data/`

## 🆘 Soporte

Para problemas o mejoras, contactar al desarrollador.

---

**Desarrollado con 💜 para Eunice Chuy**
