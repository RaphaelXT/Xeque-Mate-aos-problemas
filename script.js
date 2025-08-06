document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.toggle_btn');
  const toggleBtnIcon = document.querySelector('.toggle_btn i');
  const dropdownMenu = document.querySelector('.dropdown_menu');

  if (toggleBtn && dropdownMenu && toggleBtnIcon) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = dropdownMenu.classList.toggle('open');
      toggleBtnIcon.classList = isOpen 
        ? 'fa-solid fa-xmark' 
        : 'fa-solid fa-bars';
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });
  }

  const hero = document.getElementById('hero');
  const particles = document.querySelectorAll('.particle');
  const { innerWidth: w, innerHeight: h } = window;

  if (w > 768 && hero) {
    window.addEventListener('mousemove', (e) => {
      const { clientX: x, clientY: y } = e;

      hero.style.transform = `translate(${(x - w / 2) / 60}px, ${(y - h / 2) / 60}px)`;

      particles.forEach(particle => {
        const speed = parseFloat(particle.style.animationDuration) || 5;
        particle.style.transform = `
          translate(
            ${x / (120 * speed)}px, 
            ${y / (100 * speed)}px
          )
        `;
      });
    });
  }

  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  const container = document.querySelector('.index');
  const symbols = [
    '♔', '♕', '♖', '♗', '♘', '♙', 
    '♚', '♛', '♜', '♝', '♞', '♟', 
    '⚠️', '💡', '🛡️', '❤️', '🎯', '✨'
  ];

  if (container) {
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      p.style.left = `${Math.random() * 95}%`;
      p.style.top = `${Math.random() * 90 + 5}%`;
      p.style.opacity = (Math.random() * 0.5 + 0.4).toFixed(2);
      p.style.animationDuration = `${4 + Math.random() * 6}s`;
      p.style.animationDelay = `${Math.random() * 3}s`;
      p.setAttribute('aria-hidden', 'true');
      container.appendChild(p);
    }
  }

  const modal = document.getElementById('aboutModal');
  const aboutBtns = document.querySelectorAll('[data-modal]');
  const closeModal = document.getElementById('closeModal');

  const openModal = (e) => {
    e.preventDefault();
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
  };

  const closeModalFn = () => {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  };

  aboutBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  closeModal?.addEventListener('click', closeModalFn);

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModalFn();
  });

  const audio = document.getElementById('bg-music');
  if (audio) {
    const playAudio = () => {
      audio.volume = 0.3;
      audio.muted = false;
      audio.play().catch(e => {
        console.warn("Reprodução automática bloqueada pelo navegador.", e);
      });

      document.removeEventListener('click', playAudio);
      document.removeEventListener('touchstart', playAudio);
    };

    document.addEventListener('click', playAudio);
    document.addEventListener('touchstart', playAudio);
  }
});