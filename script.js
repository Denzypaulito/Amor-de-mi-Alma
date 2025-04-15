document.addEventListener('DOMContentLoaded', () => {

  function rectsOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(x1 + w1 <= x2 ||
             x2 + w2 <= x1 ||
             y1 + h1 <= y2 ||
             y2 + h2 <= y1);
  }
  function launchBgHearts() {
    const bgOverlay = document.createElement('div');
    bgOverlay.classList.add('bg-hearts-overlay');
    document.body.appendChild(bgOverlay);
    
    const heartCount = 30; // Ajusta la cantidad de corazones de fondo
    const placedHearts = []; // Array para guardar los rectángulos ya colocados
    const maxAttempts = 10;
  
    for (let i = 0; i < heartCount; i++) {
      let attempts = 0;
      let placed = false;
      let newX, newY, size;
      while (!placed && attempts < maxAttempts) {
        // Tamaño aleatorio en píxeles (puedes ajustar el rango)
        size = 50 + Math.random() * 30; // entre 50 y 80 px
        // Genera posición aleatoria considerando el tamaño
        newX = Math.random() * (window.innerWidth - size);
        newY = Math.random() * (window.innerHeight - size);
        
        // Comprueba solapamiento con los corazones ya colocados
        let collides = false;
        for (const pos of placedHearts) {
          if (rectsOverlap(newX, newY, size, size, pos.x, pos.y, pos.width, pos.height)) {
            collides = true;
            break;
          }
        }
        
        if (!collides) {
          placed = true;
          placedHearts.push({ x: newX, y: newY, width: size, height: size });
        }
        attempts++;
      }
      // Si se superan los intentos, se usa la última posición generada
      const bgHeart = document.createElement('img');
      bgHeart.classList.add('bg-heart');
      // Utiliza la imagen base del corazón (ajusta la ruta según corresponda)
      bgHeart.src = "CorazonNegro.png"; // o "black-heart.svg" si prefieres
      bgHeart.alt = "Corazón de fondo";
      
      // Aplica el tamaño (en píxeles)
      bgHeart.style.width = size + "px";
      bgHeart.style.height = size + "px";
      // Asigna la posición en píxeles
      bgHeart.style.left = newX + "px";
      bgHeart.style.top = newY + "px";
      
      // Asigna aleatoriamente una variante de color: morado o menta
      if (Math.random() < 0.5) {
        bgHeart.classList.add("purple-heart");
      } else {
        bgHeart.classList.add("mint-heart");
      }
      
      bgOverlay.appendChild(bgHeart);
    }
    // Estos corazones de fondo se mantienen de forma permanente (o puedes remover el overlay según tu diseño)
  }
  
  /* Llama a la función de background hearts en tu código, por ejemplo: */
  launchBgHearts();

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
        heart.style.left = Math.random() * window.innerWidth + "px";
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
    const constantSpeed = 0.5; // Velocidad base
  buttons.forEach(btn => {
    btn.style.position = 'absolute';
    const btnRect = btn.getBoundingClientRect();
    btn.style.width = btnRect.width + 'px';
    btn.style.height = btnRect.height + 'px';
    const initX = Math.random() * (containerRect.width - btnRect.width);
    const initY = Math.random() * (containerRect.height - btnRect.height);
    btn.style.left = initX + 'px';
    btn.style.top = initY + 'px';
    // Velocidades con variación mínima (por ejemplo, entre 0.5 y 0.55 o 0.5 y 0.45)
    btn.vx = (Math.random() < 0.5 ? -1 : 1) * (constantSpeed + Math.random() * 0.05);
    btn.vy = (Math.random() < 0.5 ? -1 : 1) * (constantSpeed + Math.random() * 0.05);
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
