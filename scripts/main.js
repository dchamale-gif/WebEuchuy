// Función para manejar el envío del formulario
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
    
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log('Formulario enviado:', { nombre, apellido, email, mensaje });
    
    // Limpiar el formulario después del envío
    this.reset();
});

// Lógica para mostrar mariposas dinámicamente desde el backend
fetch('/butterflies')
  .then(res => res.json())
  .then(butterflies => {
    const body = document.body;
    butterflies.forEach((b, i) => {
      const el = document.createElement('div');
      el.className = 'butterfly';
      el.style.top = b.top + 'px';
      el.style.left = b.left + 'px';
      el.style.width = b.size + 'px';
      el.style.height = b.size + 'px';
      el.style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='${b.color}' d='M50 50 L30 20 C20 10 10 15 15 30 C20 45 35 45 50 50 L50 50 L70 20 C80 10 90 15 85 30 C80 45 65 45 50 50 M50 50 L30 80 C20 90 10 85 15 70 C20 55 35 55 50 50 L50 50 L70 80 C80 90 90 85 85 70 C80 55 65 55 50 50'/%3E%3Cpath fill='%238b4362' d='M48 48 L52 52 M48 52 L52 48'/%3E%3C/svg%3E")`;
      el.style.position = 'absolute';
      el.style.zIndex = '1000';
      el.style.animation = `${b.animation} 20s infinite alternate`;
      body.appendChild(el);
    });
  });