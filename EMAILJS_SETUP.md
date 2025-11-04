# 📧 Configuración de EmailJS - Instrucciones

## Paso 1: Crear cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Regístrate con tu email (Gmail recomendado)
3. Confirma tu email

## Paso 2: Configurar servicio de email

1. En el dashboard, ve a **Email Services**
2. Haz clic en **Add New Service**
3. Selecciona **Gmail** (recomendado)
4. Autoriza EmailJS a usar tu cuenta de Gmail
5. Copia el **Service ID** (ejemplo: `service_abc123`)

## Paso 3: Crear template de email

1. Ve a **Email Templates**
2. Haz clic en **Create New Template**
3. Usa este template:

```
Asunto: Nuevo contacto desde tu web - {{pagina}}

De: {{nombre}} <{{email}}>
Fecha: {{fecha}}
Página: {{pagina}}

INFORMACIÓN DE CONTACTO:
========================
Nombre: {{nombre}}
Email: {{email}}
Teléfono: {{telefono}}
Empresa: {{empresa}}

DETALLES DEL PROYECTO:
=====================
{{mensaje}}
{{objetivos}}
{{audiencia}}

Plataformas: {{plataformas}}
Presupuesto: {{presupuesto}}
Industria: {{industria}}

---
Este mensaje fue enviado desde tu sitio web.
```

4. Guarda y copia el **Template ID** (ejemplo: `template_xyz789`) template_8b59m3l

## Paso 4: Obtener Public Key

1. Ve a **Integration**
2. Copia tu **Public Key** (ejemplo: `ABC123def456`)   l_eJURlqIbyXU1U0X

## Paso 5: Configurar en el código

Edita el archivo `scripts/main.js` línea 13:

```javascript
emailjs.init("TU_PUBLIC_KEY_AQUI"); // Reemplaza con tu Public Key real
```

Y las líneas 42-43:

```javascript
emailjs.send('TU_SERVICE_ID', 'TU_TEMPLATE_ID', templateParams)
```

## Ejemplo de configuración final:

```javascript
// Línea 13:
emailjs.init("ABC123def456");

// Líneas 42-43:
emailjs.send('service_abc123', 'template_xyz789', templateParams)
```

## ✅ Verificación

1. Guarda los cambios
2. Abre tu sitio web
3. Llena y envía un formulario
4. Revisa tu email para ver si llegó el mensaje

## 📊 Panel de control

- **Dashboard EmailJS**: Ver estadísticas de emails enviados
- **Límites gratuitos**: 200 emails/mes
- **Historial**: Ver todos los emails enviados

## 🆘 Solución de problemas

**Error "Public Key not found":**
- Verifica que hayas copiado bien la Public Key

**No llegan emails:**
- Revisa la carpeta de spam
- Verifica que el Service ID y Template ID sean correctos

**Error 403:**
- Asegúrate de que el dominio esté autorizado en EmailJS

## 🔧 Configuración avanzada (opcional)

Para recibir emails en diferentes direcciones según el servicio:

1. Crea templates separados para cada página
2. Modifica el JavaScript para usar diferentes template IDs según la página actual

---

Una vez configurado, ¡recibirás automáticamente todos los formularios en tu email! 🚀