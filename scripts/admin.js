// Verificar autenticación
function checkAuth() {
    const token = localStorage.getItem('adminToken');
    const loginTime = localStorage.getItem('loginTime');
    const userName = localStorage.getItem('adminUser');
    
    // Sesión válida por 24 horas
    if (!token || !loginTime || (Date.now() - loginTime) > 86400000) {
        window.location.href = 'admin-login.html';
        return false;
    }
    
    // Mostrar nombre de usuario
    if (userName) {
        document.getElementById('userName').textContent = userName;
    }
    
    return true;
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('loginTime');
    window.location.href = 'admin-login.html';
}

// Sistema de notificaciones
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.borderLeftColor = type === 'success' ? '#10b981' : '#ef4444';
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Gestión de pestañas
function showTab(tabName) {
    // Ocultar todas las pestañas
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Mostrar pestaña seleccionada
    document.getElementById(tabName + '-tab').classList.add('active');
    
    // Activar botón de pestaña
    event.target.classList.add('active');
}

// ============= GESTIÓN DE IMÁGENES =============

// Estructura de datos para imágenes (localStorage)
function getImages() {
    const images = localStorage.getItem('adminImages');
    return images ? JSON.parse(images) : [
        {
            id: 1,
            name: 'IMG_8498.JPG',
            url: 'assets/IMG_8498.JPG',
            size: '2.3 MB',
            date: '2024-11-15',
            category: 'portfolio'
        },
        {
            id: 2,
            name: 'IMG_8499.JPG',
            url: 'assets/IMG_8499.JPG',
            size: '2.1 MB',
            date: '2024-11-15',
            category: 'portfolio'
        },
        {
            id: 3,
            name: 'IMG_8500.JPG',
            url: 'assets/IMG_8500.JPG',
            size: '2.4 MB',
            date: '2024-11-15',
            category: 'portfolio'
        },
        {
            id: 4,
            name: 'IMG_8501.JPG',
            url: 'assets/IMG_8501.JPG',
            size: '2.2 MB',
            date: '2024-11-15',
            category: 'portfolio'
        }
    ];
}

function saveImages(images) {
    localStorage.setItem('adminImages', JSON.stringify(images));
    updateStats();
}

function loadImages() {
    const images = getImages();
    const container = document.getElementById('images-content');
    
    if (images.length === 0) {
        container.innerHTML = '<p style="color: #666; text-align: center; padding: 40px;">No hay imágenes. Sube tu primera imagen.</p>';
        return;
    }
    
    container.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;">
            ${images.map(img => `
                <div style="background: #f9f9f9; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <div style="position: relative; padding-top: 75%; background: #e0e0e0; overflow: hidden;">
                        <img src="${img.url}" alt="${img.name}" 
                             style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;"
                             onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'padding: 20px; text-align: center; color: #999;\\'>❌ Error al cargar</div>'">
                    </div>
                    <div style="padding: 15px;">
                        <h4 style="font-size: 14px; margin-bottom: 8px; color: #333; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${img.name}</h4>
                        <p style="font-size: 12px; color: #666; margin-bottom: 5px;">📁 ${img.size}</p>
                        <p style="font-size: 12px; color: #666; margin-bottom: 15px;">📅 ${img.date}</p>
                        <div style="display: flex; gap: 8px;">
                            <button onclick="copyImageUrl('${img.url}')" style="flex: 1; padding: 8px; background: #667eea; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600;">
                                📋 Copiar URL
                            </button>
                            <button onclick="deleteImage(${img.id})" style="padding: 8px 12px; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">
                                🗑️
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function copyImageUrl(url) {
    // Copiar URL completa o relativa
    const fullUrl = window.location.origin + '/' + url;
    navigator.clipboard.writeText(fullUrl).then(() => {
        showNotification('URL copiada al portapapeles: ' + url, 'success');
    }).catch(() => {
        showNotification('Error al copiar URL', 'error');
    });
}

function deleteImage(imageId) {
    if (!confirm('¿Estás segura de eliminar esta imagen?')) return;
    
    const images = getImages();
    const image = images.find(img => img.id === imageId);
    
    if (!image) return;
    
    // Intentar eliminar del servidor si es una imagen real
    if (image.url.startsWith('assets/') && !image.url.startsWith('data:')) {
        const filename = image.url.replace('assets/', '');
        
        fetch(`/api/images/${filename}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(result => {
            console.log('Imagen eliminada del servidor:', result);
        })
        .catch(error => {
            console.log('No se pudo eliminar del servidor:', error);
        });
    }
    
    // Eliminar de localStorage
    const filtered = images.filter(img => img.id !== imageId);
    saveImages(filtered);
    loadImages();
    showNotification('Imagen eliminada correctamente', 'success');
}

function uploadImage() {
    // Crear input file dinámico
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    
    input.onchange = async function(e) {
        const files = Array.from(e.target.files);
        
        if (files.length === 0) return;
        
        // Mostrar indicador de carga
        showNotification('Subiendo imágenes...', 'success');
        
        try {
            // Intentar usar la API del servidor
            const formData = new FormData();
            files.forEach(file => {
                formData.append('images', file);
            });
            
            const response = await fetch('/api/upload-images', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                const result = await response.json();
                
                // Cargar imágenes desde el servidor
                loadImagesFromServer();
                showNotification(`${files.length} imagen(es) subida(s) correctamente al servidor`, 'success');
            } else {
                throw new Error('Error en el servidor');
            }
        } catch (error) {
            console.log('Backend no disponible, usando almacenamiento local');
            
            // Fallback: usar localStorage
            const images = getImages();
            let newId = Math.max(...images.map(img => img.id), 0) + 1;
            
            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const newImage = {
                        id: newId++,
                        name: file.name,
                        url: event.target.result, // Data URL
                        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
                        date: new Date().toISOString().split('T')[0],
                        category: 'portfolio'
                    };
                    
                    images.push(newImage);
                    saveImages(images);
                    loadImages();
                };
                reader.readAsDataURL(file);
            });
            
            showNotification(`${files.length} imagen(es) guardada(s) localmente`, 'success');
        }
    };
    
    input.click();
}

// Cargar imágenes desde el servidor
async function loadImagesFromServer() {
    try {
        const response = await fetch('/api/images');
        if (response.ok) {
            const result = await response.json();
            
            // Guardar en localStorage también
            if (result.images && result.images.length > 0) {
                localStorage.setItem('adminImages', JSON.stringify(result.images));
            }
            
            loadImages();
            updateStats();
        } else {
            loadImages(); // Cargar desde localStorage
        }
    } catch (error) {
        console.log('No se pudo conectar con el servidor, usando datos locales');
        loadImages();
    }
}

// ============= GESTIÓN DE BLOGS =============

function getBlogs() {
    const blogs = localStorage.getItem('adminBlogs');
    return blogs ? JSON.parse(blogs) : [
        {
            id: 1,
            title: 'Estrategias de Contenido para Redes Sociales',
            slug: 'estrategias-contenido',
            excerpt: 'Descubre las mejores estrategias para crear contenido que conecte con tu audiencia',
            content: 'Contenido completo del blog...',
            image: 'assets/IMG_8498.JPG',
            date: '2024-11-15',
            published: true
        },
        {
            id: 2,
            title: 'Fotografía Creativa: Tips y Trucos',
            slug: 'fotografia-creativa',
            excerpt: 'Aprende técnicas profesionales de fotografía para redes sociales',
            content: 'Contenido completo del blog...',
            image: 'assets/IMG_8499.JPG',
            date: '2024-11-10',
            published: true
        },
        {
            id: 3,
            title: 'Video Marketing: El Futuro del Contenido Digital',
            slug: 'video-marketing',
            excerpt: 'El video es el rey del contenido. Aprende a dominarlo',
            content: 'Contenido completo del blog...',
            image: 'assets/IMG_8500.JPG',
            date: '2024-11-05',
            published: true
        }
    ];
}

function saveBlogs(blogs) {
    localStorage.setItem('adminBlogs', JSON.stringify(blogs));
    updateStats();
}

function loadBlogs() {
    const blogs = getBlogs();
    const container = document.getElementById('blogs-content');
    
    if (blogs.length === 0) {
        container.innerHTML = '<p style="color: #666; text-align: center; padding: 40px;">No hay blogs. Crea tu primera entrada.</p>';
        return;
    }
    
    container.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 20px;">
            ${blogs.map(blog => `
                <div style="background: #f9f9f9; border-radius: 12px; padding: 20px; display: flex; gap: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <img src="${blog.image}" alt="${blog.title}" 
                         style="width: 150px; height: 150px; object-fit: cover; border-radius: 8px; flex-shrink: 0;">
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                            <div>
                                <h3 style="font-size: 18px; margin-bottom: 8px; color: #333;">${blog.title}</h3>
                                <p style="font-size: 12px; color: #666;">📅 ${blog.date} | 🔗 ${blog.slug}</p>
                            </div>
                            <span style="padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; ${blog.published ? 'background: #d1fae5; color: #065f46;' : 'background: #fee; color: #991b1b;'}">
                                ${blog.published ? '✓ Publicado' : '✗ Borrador'}
                            </span>
                        </div>
                        <p style="color: #666; font-size: 14px; margin-bottom: 15px; line-height: 1.5;">${blog.excerpt}</p>
                        <div style="display: flex; gap: 10px;">
                            <button onclick="editBlog(${blog.id})" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600;">
                                ✏️ Editar
                            </button>
                            <button onclick="togglePublishBlog(${blog.id})" style="padding: 8px 16px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600;">
                                ${blog.published ? '📥 Archivar' : '📤 Publicar'}
                            </button>
                            <button onclick="deleteBlog(${blog.id})" style="padding: 8px 16px; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600;">
                                🗑️ Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function createBlog() {
    const title = prompt('Título del blog:');
    if (!title) return;
    
    const slug = title.toLowerCase()
        .replace(/[áàäâ]/g, 'a')
        .replace(/[éèëê]/g, 'e')
        .replace(/[íìïî]/g, 'i')
        .replace(/[óòöô]/g, 'o')
        .replace(/[úùüû]/g, 'u')
        .replace(/ñ/g, 'n')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    
    const blogs = getBlogs();
    const newBlog = {
        id: Math.max(...blogs.map(b => b.id), 0) + 1,
        title: title,
        slug: slug,
        excerpt: 'Escribe un resumen breve aquí...',
        content: 'Contenido del blog...',
        image: 'assets/IMG_8498.JPG',
        date: new Date().toISOString().split('T')[0],
        published: false
    };
    
    blogs.unshift(newBlog);
    saveBlogs(blogs);
    loadBlogs();
    showNotification('Blog creado correctamente. Ahora edítalo para agregar contenido.', 'success');
}

function editBlog(blogId) {
    const blogs = getBlogs();
    const blog = blogs.find(b => b.id === blogId);
    
    if (!blog) return;
    
    const newTitle = prompt('Título:', blog.title);
    if (newTitle === null) return;
    
    const newExcerpt = prompt('Resumen:', blog.excerpt);
    if (newExcerpt === null) return;
    
    const newContent = prompt('Contenido (para edición completa usa un editor externo):', blog.content);
    if (newContent === null) return;
    
    blog.title = newTitle || blog.title;
    blog.excerpt = newExcerpt || blog.excerpt;
    blog.content = newContent || blog.content;
    
    saveBlogs(blogs);
    loadBlogs();
    showNotification('Blog actualizado correctamente', 'success');
}

function togglePublishBlog(blogId) {
    const blogs = getBlogs();
    const blog = blogs.find(b => b.id === blogId);
    
    if (!blog) return;
    
    blog.published = !blog.published;
    saveBlogs(blogs);
    loadBlogs();
    showNotification(`Blog ${blog.published ? 'publicado' : 'archivado'} correctamente`, 'success');
}

function deleteBlog(blogId) {
    if (!confirm('¿Estás segura de eliminar este blog?')) return;
    
    const blogs = getBlogs();
    const filtered = blogs.filter(b => b.id !== blogId);
    saveBlogs(filtered);
    loadBlogs();
    showNotification('Blog eliminado correctamente', 'success');
}

// ============= GESTIÓN DE PÁGINAS =============

function getPages() {
    const pages = localStorage.getItem('adminPages');
    return pages ? JSON.parse(pages) : [
        {
            id: 1,
            name: 'Página Principal',
            file: 'index.html',
            sections: [
                { id: 'hero-title', label: 'Título Hero', value: 'Eunice Chuy', type: 'text' },
                { id: 'hero-subtitle', label: 'Subtítulo Hero', value: 'Creadora de Contenido Visual', type: 'text' },
                { id: 'about-text', label: 'Texto Sobre Mí', value: 'Soy creadora de contenido...', type: 'textarea' }
            ]
        },
        {
            id: 2,
            name: 'Estrategias de Contenido',
            file: 'estrategias-contenido.html',
            sections: [
                { id: 'title', label: 'Título', value: 'Estrategias de Contenido', type: 'text' },
                { id: 'content', label: 'Contenido', value: 'Contenido del artículo...', type: 'textarea' }
            ]
        },
        {
            id: 3,
            name: 'Fotografía Creativa',
            file: 'fotografia-creativa.html',
            sections: [
                { id: 'title', label: 'Título', value: 'Fotografía Creativa', type: 'text' },
                { id: 'content', label: 'Contenido', value: 'Contenido del artículo...', type: 'textarea' }
            ]
        },
        {
            id: 4,
            name: 'Video Marketing',
            file: 'video-marketing.html',
            sections: [
                { id: 'title', label: 'Título', value: 'Video Marketing', type: 'text' },
                { id: 'content', label: 'Contenido', value: 'Contenido del artículo...', type: 'textarea' }
            ]
        }
    ];
}

function savePages(pages) {
    localStorage.setItem('adminPages', JSON.stringify(pages));
}

function loadPages() {
    const pages = getPages();
    const container = document.getElementById('pages-content');
    
    container.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 20px;">
            ${pages.map(page => `
                <div style="background: #f9f9f9; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <div>
                            <h3 style="font-size: 18px; color: #333; margin-bottom: 5px;">${page.name}</h3>
                            <p style="font-size: 12px; color: #666;">📄 ${page.file}</p>
                        </div>
                        <button onclick="editPage(${page.id})" style="padding: 8px 20px; background: #667eea; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600;">
                            ✏️ Editar Contenido
                        </button>
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        ${page.sections.map(section => `
                            <span style="padding: 4px 12px; background: white; border-radius: 6px; font-size: 12px; color: #666;">
                                ${section.label}
                            </span>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function editPage(pageId) {
    const pages = getPages();
    const page = pages.find(p => p.id === pageId);
    
    if (!page) return;
    
    let html = `
        <div style="background: white; padding: 30px; border-radius: 12px; max-width: 800px; margin: 20px auto;">
            <h2 style="margin-bottom: 20px; color: #333;">Editar: ${page.name}</h2>
    `;
    
    page.sections.forEach(section => {
        if (section.type === 'text') {
            const newValue = prompt(`${section.label}:`, section.value);
            if (newValue !== null) {
                section.value = newValue;
            }
        } else if (section.type === 'textarea') {
            const newValue = prompt(`${section.label} (para edición completa usa un editor externo):`, section.value);
            if (newValue !== null) {
                section.value = newValue;
            }
        }
    });
    
    savePages(pages);
    showNotification('Página actualizada correctamente', 'success');
}

// ============= ACTUALIZAR ESTADÍSTICAS =============

function updateStats() {
    const images = getImages();
    const blogs = getBlogs();
    const pages = getPages();
    
    document.getElementById('totalImages').textContent = images.length;
    document.getElementById('totalBlogs').textContent = blogs.filter(b => b.published).length;
    document.getElementById('totalPages').textContent = pages.length;
}

// ============= INICIALIZACIÓN =============

window.addEventListener('load', function() {
    if (!checkAuth()) return;
    
    // Intentar cargar desde el servidor primero
    loadImagesFromServer();
    loadBlogs();
    loadPages();
    updateStats();
});
