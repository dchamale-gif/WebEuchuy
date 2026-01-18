# 📱 Sistema de Publicaciones y Comentarios

## ✨ Descripción

Sistema completo de publicaciones estilo red social donde Eunice puede crear posts con texto y fotos, y los visitantes pueden comentar.

## 🎯 Características

### Para Eunice (Panel Admin)
- ✍️ Crear publicaciones con mensaje personalizado
- 📸 Agregar fotos a las publicaciones
- 👁️ Ver todas las publicaciones (publicadas y borradores)
- ✏️ Editar el texto de las publicaciones
- 📤 Publicar/Despublicar publicaciones
- 💬 Ver todos los comentarios
- 🗑️ Eliminar comentarios inapropiados
- 🗑️ Eliminar publicaciones

### Para Visitantes (Frontend)
- 👀 Ver todas las publicaciones publicadas
- 💬 Dejar comentarios con nombre
- 📱 Diseño responsive tipo red social
- 🔄 Actualización automática cada 30 segundos

## 🚀 Cómo Usar

### 1. Crear una Publicación (Admin)

1. Accede al panel admin: `http://localhost:5003/admin-login.html`
2. Login con: 
   - Usuario: `admin`
   - Contraseña: `eunice2024`
3. Ve a la pestaña **"📱 Publicaciones"**
4. Haz clic en **"+ Nueva Publicación"**
5. Escribe tu mensaje, por ejemplo:
   ```
   Hoy hice unas tomas hermosas en Cayalá 📸
   Esperen mi video en mis redes 🎬✨
   ```
6. Elige si quieres agregar una imagen (opcional)
7. Decide si publicar inmediatamente o guardar como borrador

### 2. Ver Publicaciones (Visitantes)

1. Desde el sitio web, haz clic en **"✨ Publicaciones"** en el menú
2. O accede directamente: `http://localhost:5003/publicaciones.html`
3. Verás todas las publicaciones ordenadas de la más reciente a la más antigua

### 3. Comentar en Publicaciones

1. En cualquier publicación, baja hasta el formulario de comentarios
2. Escribe tu nombre
3. Escribe tu comentario
4. Haz clic en **"Enviar comentario"**
5. El comentario aparecerá inmediatamente

### 4. Gestionar Comentarios (Admin)

1. En el panel admin, en la pestaña **"Publicaciones"**
2. Verás todos los comentarios de cada publicación
3. Puedes eliminar comentarios con el botón 🗑️

## 📂 Archivos del Sistema

```
WebEuchuy/
├── publicaciones.html          # Página pública para ver publicaciones
├── admin-dashboard.html        # Panel admin (actualizado)
├── server.js                   # Servidor (con nuevos endpoints)
├── scripts/
│   └── admin.js               # Lógica admin (con gestión de posts)
└── data/
    └── posts.json             # Base de datos de publicaciones
```

## 🔧 Endpoints de API

### Publicaciones

- `POST /api/posts` - Crear nueva publicación
  ```json
  {
    "message": "Texto de la publicación",
    "image": "assets/foto.jpg",  // opcional
    "published": true
  }
  ```

- `GET /api/posts` - Obtener publicaciones publicadas (frontend)
- `GET /api/posts/all` - Obtener todas las publicaciones (admin)
- `PUT /api/posts/:id` - Actualizar publicación
- `DELETE /api/posts/:id` - Eliminar publicación

### Comentarios

- `POST /api/posts/:id/comments` - Agregar comentario
  ```json
  {
    "name": "Nombre del usuario",
    "message": "Texto del comentario"
  }
  ```

- `DELETE /api/posts/:postId/comments/:commentId` - Eliminar comentario (admin)

## 💾 Estructura de Datos

### Publicación
```json
{
  "id": 1234567890,
  "message": "Hoy hice unas tomas hermosas en Cayalá...",
  "image": "assets/foto.jpg",
  "date": "2026-01-18T12:00:00.000Z",
  "published": true,
  "comments": [...]
}
```

### Comentario
```json
{
  "id": 1234567890,
  "name": "María García",
  "message": "¡Qué hermosas fotos!",
  "date": "2026-01-18T12:30:00.000Z"
}
```

## 🎨 Casos de Uso

### Ejemplo 1: Post Simple
```
Mensaje: "Feliz inicio de semana! 🌟 
         Hoy grabando contenido nuevo para ustedes"
Imagen: No
Estado: Publicado
```

### Ejemplo 2: Post con Foto
```
Mensaje: "Hoy hice unas tomas hermosas en Cayalá 📸
         Esperen mi video en mis redes 🎬"
Imagen: assets/cayala.jpg
Estado: Publicado
```

### Ejemplo 3: Borrador
```
Mensaje: "Próximamente: tutorial de edición de video..."
Imagen: No
Estado: Borrador (no visible para visitantes)
```

## 🔐 Seguridad

- Solo el admin puede crear, editar y eliminar publicaciones
- Solo el admin puede eliminar comentarios
- Cualquier visitante puede ver publicaciones publicadas
- Cualquier visitante puede comentar (sin autenticación)
- Los comentarios se guardan con nombre del usuario

## 🎯 Mejoras Futuras Sugeridas

- [ ] Paginación de publicaciones (cuando haya muchas)
- [ ] Likes/reacciones en publicaciones
- [ ] Notificaciones de nuevos comentarios por email
- [ ] Subir múltiples imágenes por publicación
- [ ] Videos en publicaciones
- [ ] Búsqueda de publicaciones
- [ ] Categorías o etiquetas
- [ ] Moderación automática de comentarios
- [ ] Captcha para evitar spam

## 🆘 Soporte

Si tienes problemas:
1. Asegúrate de que el servidor esté corriendo (`npm start`)
2. Verifica que estés en `http://localhost:5003`
3. Revisa la consola del navegador para errores
4. Verifica que el archivo `data/posts.json` exista

---

Creado con 💜 por BotEngine para Eunice Chuy
