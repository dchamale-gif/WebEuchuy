// Pantalla de carga
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    if (loader) {
        // Simular tiempo de carga (mínimo 1.5 segundos)
        setTimeout(() => {
            loader.classList.add('hidden');
            // Remover el elemento del DOM después de la animación
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1500);
    }
});

// Inicializar EmailJS
function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init("l_eJURlqIbyXU1U0X");
        console.log('EmailJS inicializado correctamente');
        return true;
    } else {
        console.error('EmailJS no está disponible. Verifica que el CDN se haya cargado.');
        return false;
    }
}

// Función para manejar el envío del formulario con EmailJS
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar EmailJS cuando el DOM esté listo
    const emailJSReady = initEmailJS();
    
    // Formularios
    const forms = document.querySelectorAll('.contact-form');
    console.log('Formularios encontrados:', forms.length);
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Formulario enviado - preventDefault activado');
            
            // Verificar que EmailJS esté disponible
            if (!emailJSReady || typeof emailjs === 'undefined') {
                console.error('EmailJS no está disponible');
                showNotification('Error: Servicio de email no disponible. Por favor contacta por WhatsApp.', 'error');
                return;
            }
            
            const submitBtn = this.querySelector('.btn');
            const originalText = submitBtn.textContent;
            
            // Cambiar estado del botón
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Obtener todos los datos del formulario
            const formData = new FormData(this);
            const templateParams = {};
            
            // Convertir FormData a objeto
            for (let [key, value] of formData.entries()) {
                templateParams[key] = value;
            }
            
            // Agregar información adicional
            templateParams.pagina = document.title;
            templateParams.fecha = new Date().toLocaleString('es-GT');
            
            console.log('Datos del formulario:', templateParams);
            console.log('Enviando con EmailJS...');
            
            // Enviar email usando EmailJS
            emailjs.send('service_4fheqyt', 'template_8b59m3l', templateParams)
                .then(function(response) {
                    console.log('Email enviado exitosamente!', response.status, response.text);
                    
                    // Mostrar éxito
                    submitBtn.textContent = '¡Enviado!';
                    submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                    
                    // Mostrar mensaje de éxito
                    showNotification('¡Gracias! Tu mensaje ha sido enviado correctamente. Te contactaré pronto.', 'success');
                    
                    // Resetear formulario después de 2 segundos
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                        form.reset();
                    }, 2000);
                    
                }, function(error) {
                    console.error('Error al enviar email:', error);
                    
                    // Mostrar error
                    submitBtn.textContent = 'Error';
                    submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
                    
                    showNotification('Hubo un error al enviar el mensaje. Por favor intenta de nuevo o contacta por WhatsApp.', 'error');
                    
                    // Volver al estado original después de 3 segundos
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                    }, 3000);
                });
        });
    });

    // Función para mostrar notificaciones
    function showNotification(message, type = 'success') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✅' : '❌'}</span>
                <span class="notification-message">${message}</span>
            </div>
        `;
        
        // Estilos inline para la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-family: var(--font-primary, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
            font-size: 14px;
            max-width: 400px;
            animation: slideIn 0.3s ease-out;
            transform: translateX(100%);
        `;
        
        // Agregar animación CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
        `;
        document.head.appendChild(style);
        
        // Agregar al DOM
        document.body.appendChild(notification);
        
        // Animación de entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 10);
        
        // Remover después de 5 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    // Menú móvil hamburguesa
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.menu');
    
    if (mobileToggle && menu) {
        mobileToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Navegación suave
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Cerrar menú móvil si está abierto
                if (menu && menu.classList.contains('active')) {
                    menu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            }
        });
    });

    // Optimización de mariposas para móviles
    function isMobile() {
        return window.innerWidth <= 768;
    }

    function loadButterflies() {
        // Solo cargar mariposas en desktop para mejor rendimiento
        if (isMobile()) return;
        
        fetch('/butterflies')
            .then(res => res.json())
            .then(butterflies => {
                butterflies.forEach((b, i) => {
                    const el = document.createElement('div');
                    el.className = 'butterfly';
                    el.style.top = b.top + 'px';
                    el.style.left = b.left + '%';
                    el.style.width = b.size + 'px';
                    el.style.height = b.size + 'px';
                    el.style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='${encodeURIComponent(b.color)}' d='M50 50 L30 20 C20 10 10 15 15 30 C20 45 35 45 50 50 L50 50 L70 20 C80 10 90 15 85 30 C80 45 65 45 50 50 M50 50 L30 80 C20 90 10 85 15 70 C20 55 35 55 50 50 L50 50 L70 80 C80 90 90 85 85 70 C80 55 65 55 50 50'/%3E%3Cpath fill='%238b4362' d='M48 48 L52 52 M48 52 L52 48'/%3E%3C/svg%3E")`;
                    el.style.position = 'absolute';
                    el.style.zIndex = '0';
                    el.style.pointerEvents = 'none';
                    el.style.animation = `${b.animation} 20s infinite alternate`;
                    document.body.appendChild(el);
                });
            })
            .catch(err => console.log('Mariposas no disponibles:', err));
    }

    // Cargar mariposas
    loadButterflies();

    // Recargar en cambio de orientación
    window.addEventListener('resize', function() {
        const butterflies = document.querySelectorAll('.butterfly');
        if (isMobile() && butterflies.length > 0) {
            butterflies.forEach(b => b.remove());
        } else if (!isMobile() && butterflies.length === 0) {
            loadButterflies();
        }
    });

    // Carrusel de imágenes - versión simplificada
    function initCarousel() {
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.indicator');
        let currentSlide = 0;
        let carouselInterval;

        console.log('Inicializando carrusel. Slides encontradas:', slides.length);

        if (slides.length === 0) {
            console.log('No se encontraron slides del carrusel');
            return;
        }

        // Asegurar que la primera imagen sea visible
        slides[0].classList.add('active');
        if (indicators.length > 0) {
            indicators[0].classList.add('active');
        }

        function showSlide(index) {
            console.log('Mostrando slide:', index);
            
            // Primero, preparar la siguiente slide
            slides[index].style.zIndex = '3';
            
            // Después de un pequeño delay, hacer la transición
            setTimeout(() => {
                // Remover clase active de todas las slides
                slides.forEach((slide, i) => {
                    slide.classList.remove('active');
                    if (indicators[i]) indicators[i].classList.remove('active');
                    if (i !== index) {
                        slide.style.zIndex = '1';
                    }
                });
                
                // Agregar clase active a la slide actual
                slides[index].classList.add('active');
                if (indicators[index]) {
                    indicators[index].classList.add('active');
                }
            }, 50);
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function startAutoSlide() {
            carouselInterval = setInterval(nextSlide, 6000); // Aumentado a 6 segundos
            console.log('Auto-slide iniciado');
        }

        function stopAutoSlide() {
            clearInterval(carouselInterval);
            console.log('Auto-slide pausado');
        }

        // Inicializar indicadores clicables
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                console.log('Click en indicador:', index);
                currentSlide = index;
                showSlide(currentSlide);
                stopAutoSlide();
                setTimeout(startAutoSlide, 100); // Reiniciar el auto-play
            });
        });

        // Pausar en hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoSlide);
            carouselContainer.addEventListener('mouseleave', startAutoSlide);
        }

        // Iniciar el carrusel después de un delay más largo para apreciar la primera imagen
        setTimeout(() => {
            startAutoSlide();
        }, 3000); // 3 segundos para ver bien la primera imagen

        // Verificar que las imágenes se carguen y aplicar estilos específicos
        slides.forEach((slide, index) => {
            const img = slide.querySelector('img');
            if (img) {
                img.addEventListener('load', () => {
                    console.log(`Imagen ${index + 1} cargada correctamente`);
                    // Asegurar que la imagen tenga los estilos correctos
                    img.style.objectFit = 'cover';
                    img.style.objectPosition = 'center top';
                    img.style.width = '100%';
                    img.style.height = '100%';
                });
                img.addEventListener('error', (e) => {
                    console.log(`Error cargando imagen ${index + 1}:`, e);
                });
            }
        });
    }



    // Inicializar carrusel cuando el DOM esté listo
    setTimeout(initCarousel, 100);
});