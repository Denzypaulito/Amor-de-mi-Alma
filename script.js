document.addEventListener('DOMContentLoaded', () => {

  function launchHearts() {
    const heartOverlay = document.createElement('div');
    heartOverlay.classList.add('heart-overlay');
    document.body.appendChild(heartOverlay);
  
    const heartCount = 150; // Número de corazones
    // Calcular el lapso entre la creación de cada corazón
    const interval = 1500 / heartCount; // en milisegundos
  
    for (let i = 0; i < heartCount; i++) {
      // Cada corazón se creará con un retardo basado en su índice
      setTimeout(() => {
        const heart = document.createElement('span');
        heart.classList.add('falling-heart');
        // Usamos la imagen personalizada para un corazón negro más bonito
        heart.innerHTML = '<img src="CorazonNegro.png" alt="Corazón negro" class="heart-image">';
        
        // Posición horizontal aleatoria
        heart.style.left = Math.random() * 100 + 'vw';
        // Como ya se está creando con un retardo, podemos dejar un pequeño retraso adicional (opcional)
        heart.style.animationDelay = (Math.random() * 0.5) + 's';
        
        // Tamaño aleatorio entre 50px y 90px
        const size = 50 + Math.random() * 40;
        heart.style.width = size + 'px';
        heart.style.height = size + 'px';
        
        // Duración de animación aleatoria entre 3 y 4 segundos
        const duration = 3 + Math.random() * 1;
        heart.style.animationDuration = duration + 's';
        
        heartOverlay.appendChild(heart);
      }, i * interval);
    }
    // Elimina el overlay después de 4 segundos (3 seg para aparición más un margen extra)
    setTimeout(() => {
      heartOverlay.remove();
    }, 10000);
  }
  
  

  launchHearts();
  
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
