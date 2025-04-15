document.addEventListener('DOMContentLoaded', () => {
  const modalTriggers = document.querySelectorAll('.modal-trigger');
  const modal = document.getElementById('customModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalText = document.getElementById('modalText');
  const closeModal = document.querySelector('.close-modal');

  // Función para abrir el modal con los datos del botón
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const title = trigger.getAttribute('data-title');
      const content = trigger.getAttribute('data-content');

      modalTitle.textContent = title;
      modalText.textContent = content;
      
      // Mostrar el modal y reiniciar la animación
      modal.style.display = 'flex';
      // Reiniciamos la animación quitando y reponiendo la clase (o forzando un redraw)
      const modalContent = modal.querySelector('.modal-content');
      modalContent.style.animation = 'none';
      // Forzar reflow
      void modalContent.offsetWidth;
      modalContent.style.animation = 'unroll 0.5s ease forwards';
    });
  });

  // Cerrar el modal al hacer clic en el botón de cerrar
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Cerrar el modal si se hace clic fuera del contenido
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});
