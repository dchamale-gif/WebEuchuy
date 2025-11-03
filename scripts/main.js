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

// Función para manejar el envío del formulario
document.addEventListener('DOMContentLoaded', function() {
    // Formulario
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los valores del formulario
            const formData = new FormData(this);
            const data = {
                nombre: formData.get('nombre'),
                apellido: formData.get('apellido'),
                email: formData.get('email'),
                mensaje: formData.get('mensaje')
            };
            
            // Mostrar mensaje de éxito
            const submitBtn = this.querySelector('.btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simular envío
            setTimeout(() => {
                submitBtn.textContent = '¡Enviado!';
                submitBtn.style.background = '#10b981';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    this.reset();
                }, 2000);
            }, 1000);
            
            console.log('Formulario enviado:', data);
        });
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