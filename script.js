document.addEventListener('DOMContentLoaded', () => {
  const modalTriggers = document.querySelectorAll('.modal-trigger');
  const modal = document.getElementById('customModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalText = document.getElementById('modalText');
  const stickerElement = modal.querySelector('.love-sticker');
  const closeModal = document.querySelector('.close-modal');

  // Función para abrir el modal con los datos del botón
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const title = trigger.getAttribute('data-title');
      const content = trigger.getAttribute('data-content');
      const sticker = trigger.getAttribute('data-sticker');

      modalTitle.textContent = title;
      modalText.textContent = content;
      stickerElement.src = sticker;
      
      // Mostrar el modal y reiniciar la animación
      modal.style.display = 'flex';
      const modalContent = modal.querySelector('.modal-content');
      modalContent.style.animation = 'none';
      // Forzar reflow para reiniciar la animación
      void modalContent.offsetWidth;
      modalContent.style.animation = 'mapOpen 0.5s ease forwards';
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
