# ⚡ INICIAR SERVIDOR - Sistema de Publicaciones

## 🚀 Pasos para Iniciar

### 1. Abrir Terminal en VS Code
```
Ctrl + Ñ  (o desde menú: Terminal > New Terminal)
```

### 2. Iniciar el Servidor
```bash
npm start
```

**Verás algo como:**
```
WebEuchuy corriendo en puerto 5003
```

### 3. Abrir en el Navegador

**Para Visitantes:**
```
http://localhost:5003
```

**Para Ver Publicaciones:**
```
http://localhost:5003/publicaciones.html
```

**Para Panel Admin:**
```
http://localhost:5003/admin-login.html
Usuario: admin
Contraseña: eunice2024
```

## ✅ Verificar que Todo Funciona

1. ✅ Servidor corriendo: Terminal muestra "WebEuchuy corriendo en puerto 5003"
2. ✅ Sitio web abre: `http://localhost:5003`
3. ✅ Menú tiene botón "✨ Publicaciones"
4. ✅ Panel admin tiene pestaña "📱 Publicaciones"

## 🛑 Detener el Servidor

En la terminal donde está corriendo:
```
Ctrl + C
```

## 🔄 Reiniciar el Servidor

Si haces cambios en el código:
1. Detener: `Ctrl + C`
2. Iniciar: `npm start`

## 🆘 Problemas Comunes

### "Cannot find module 'express'"
```bash
npm install
npm start
```

### "Puerto 5003 en uso"
Cierra otros programas que usen el puerto o cambia el puerto en `server.js`

### "No se pueden cargar publicaciones"
Verifica que el servidor esté corriendo y que accedas a `localhost:5003`

### Los cambios no se ven
1. Refresca la página: `Ctrl + F5` (forzar recarga)
2. O limpia caché del navegador

---

## 📝 Flujo Completo de Trabajo

```
1. Iniciar servidor: npm start
2. Ir al panel admin: localhost:5003/admin-login.html
3. Login (admin / eunice2024)
4. Crear publicación en pestaña "Publicaciones"
5. Ver resultado en: localhost:5003/publicaciones.html
6. Los visitantes pueden comentar
7. Gestionar comentarios desde el panel admin
```

## 🎯 Comandos Rápidos

```bash
# Iniciar servidor normal
npm start

# Iniciar en modo desarrollo (reinicio automático)
npm run dev

# Instalar dependencias
npm install
```

---

**¡El servidor debe estar corriendo para que el sitio funcione!**

Si cierras VS Code o la terminal, el servidor se detiene.
Para usar el sitio, siempre primero: `npm start`
