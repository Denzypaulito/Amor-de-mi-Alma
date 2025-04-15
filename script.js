document.addEventListener('DOMContentLoaded', () => {
  // --- Funcionalidad del modal (se mantiene igual) ---
  const modalTriggers = document.querySelectorAll('.modal-trigger');
  const modal = document.getElementById('customModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalText = document.getElementById('modalText');
  const stickerElement = modal.querySelector('.love-sticker');
  const closeModal = document.querySelector('.close-modal');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const title = trigger.getAttribute('data-title');
      const content = trigger.getAttribute('data-content');
      const sticker = trigger.getAttribute('data-sticker');

      modalTitle.textContent = title;
      modalText.textContent = content;
      stickerElement.src = sticker;
      
      modal.style.display = 'flex';
      const modalContent = modal.querySelector('.modal-content');
      modalContent.style.animation = 'none';
      void modalContent.offsetWidth; // Forzar reflow
      modalContent.style.animation = 'mapOpen 0.5s ease forwards';
    });
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', event => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  // --- Movimiento rebotante actualizado ---
  const container = document.querySelector('.bouncing-container');
  const buttons = Array.from(document.querySelectorAll('.modal-trigger'));

  // Asignar posiciones y velocidades iniciales
  const containerRect = container.getBoundingClientRect();
  buttons.forEach(btn => {
    btn.style.position = 'absolute';
    const btnRect = btn.getBoundingClientRect();
    // Fijar dimensiones para evitar reajuste (por contenido, etc.)
    btn.style.width = btnRect.width + 'px';
    btn.style.height = btnRect.height + 'px';

    // Posición aleatoria dentro del contenedor
    const initX = Math.random() * (containerRect.width - btnRect.width);
    const initY = Math.random() * (containerRect.height - btnRect.height);
    btn.style.left = initX + 'px';
    btn.style.top = initY + 'px';

    // Velocidades aleatorias (más lentas, usando factor 0.5)
    btn.vx = (Math.random() * 2 - 1) * 0.5; // valor entre -0.5 y 0.5
    btn.vy = (Math.random() * 2 - 1) * 0.5;
  });

  function updatePositions() {
    const containerRect = container.getBoundingClientRect();

    buttons.forEach((btn, index) => {
      let x = parseFloat(btn.style.left);
      let y = parseFloat(btn.style.top);
      const width = btn.offsetWidth;
      const height = btn.offsetHeight;

      // Actualizar posición según la velocidad
      x += btn.vx;
      y += btn.vy;

      // Rebotar en los límites del contenedor
      if (x <= 0 || x + width >= containerRect.width) {
        btn.vx = -btn.vx;
        x = x <= 0 ? 0 : containerRect.width - width;
      }
      if (y <= 0 || y + height >= containerRect.height) {
        btn.vy = -btn.vy;
        y = y <= 0 ? 0 : containerRect.height - height;
      }

      // --- Detección y resolución de colisiones entre botones ---
      buttons.forEach((other, j) => {
        if (index === j) return;
        let ox = parseFloat(other.style.left);
        let oy = parseFloat(other.style.top);
        const oWidth = other.offsetWidth;
        const oHeight = other.offsetHeight;

        // Verificar si se sobreponen
        if (
          x < ox + oWidth &&
          x + width > ox &&
          y < oy + oHeight &&
          y + height > oy
        ) {
          // Calcular el solapamiento en cada eje
          const overlapX = Math.min(x + width, ox + oWidth) - Math.max(x, ox);
          const overlapY = Math.min(y + height, oy + oHeight) - Math.max(y, oy);
          
          // Calcular los centros para determinar la dirección
          const btnCenterX = x + width / 2;
          const btnCenterY = y + height / 2;
          const otherCenterX = ox + oWidth / 2;
          const otherCenterY = oy + oHeight / 2;
          
          // Resolver la colisión usando el eje con menor solapamiento
          if (overlapX < overlapY) {
            // Colisión horizontal
            if (btnCenterX > otherCenterX) {
              x += overlapX;
            } else {
              x -= overlapX;
            }
            btn.vx = -btn.vx;
          } else {
            // Colisión vertical
            if (btnCenterY > otherCenterY) {
              y += overlapY;
            } else {
              y -= overlapY;
            }
            btn.vy = -btn.vy;
          }
        }
      });

      btn.style.left = x + 'px';
      btn.style.top = y + 'px';
    });

    requestAnimationFrame(updatePositions);
  }

  updatePositions();
});
