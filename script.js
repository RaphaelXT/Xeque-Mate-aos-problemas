// Executa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  // ==================== MENU MOBILE TOGGLE ====================
  const toggleBtn = document.querySelector('.toggle_btn');
  const toggleBtnIcon = document.querySelector('.toggle_btn i');
  const dropdownMenu = document.querySelector('.dropdown_menu');

  if (toggleBtn && dropdownMenu && toggleBtnIcon) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = dropdownMenu.classList.toggle('open');
      toggleBtnIcon.classList = isOpen 
        ? 'fa-solid fa-xmark' 
        : 'fa-solid fa-bars';
      
      // Acessibilidade
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });
  }

  // ==================== PARALLAX SUAVE NO HERO E PARTÍCULAS ====================
  const hero = document.getElementById('hero');
  const particles = document.querySelectorAll('.particle');
  const { innerWidth: w, innerHeight: h } = window;

  if (w > 768 && hero) {
    window.addEventListener('mousemove', (e) => {
      const { clientX: x, clientY: y } = e;

      // Movimento sutil no hero
      hero.style.transform = `translate(${(x - w / 2) / 60}px, ${(y - h / 2) / 60}px)`;

      // Movimento diferenciado nas partículas
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

  // ==================== SCROLL NA NAVBAR ====================
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ==================== GERAÇÃO DE PARTÍCULAS DECORATIVAS ====================
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

      // Símbolo aleatório
      p.textContent = symbols[Math.floor(Math.random() * symbols.length)];

      // Posição aleatória
      p.style.left = `${Math.random() * 95}%`;
      p.style.top = `${Math.random() * 90 + 5}%`;

      // Opacidade e velocidade variadas
      p.style.opacity = (Math.random() * 0.5 + 0.4).toFixed(2);
      p.style.animationDuration = `${4 + Math.random() * 6}s`;
      p.style.animationDelay = `${Math.random() * 3}s`;

      // Acessibilidade
      p.setAttribute('aria-hidden', 'true');

      container.appendChild(p);
    }
  }

  // ==================== MODAL SOBRE NÓS ====================
  const modal = document.getElementById('aboutModal');
  const aboutBtns = document.querySelectorAll('[data-modal]');
  const closeModal = document.getElementById('closeModal');

  // Abre o modal
  const openModal = (e) => {
    e.preventDefault();
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
  };

  // Fecha o modal
  const closeModalFn = () => {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  };

  // Adiciona evento a todos os botões "SOBRE NÓS"
  aboutBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  // Fecha ao clicar no X
  closeModal?.addEventListener('click', closeModalFn);

  // Fecha ao clicar fora do conteúdo
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModalFn();
  });

  // ==================== CONTROLE DE ÁUDIO (autoplay seguro) ====================
  const audio = document.getElementById('bg-music');
  if (audio) {
    const playAudio = () => {
      audio.volume = 0.3;
      audio.muted = false;
      audio.play().catch(e => {
        console.warn("Reprodução automática bloqueada pelo navegador.", e);
      });

      // Remove o evento após tocar
      document.removeEventListener('click', playAudio);
      document.removeEventListener('touchstart', playAudio);
    };

    // Adiciona evento de clique ou toque para iniciar o áudio
    document.addEventListener('click', playAudio);
    document.addEventListener('touchstart', playAudio);
  }
});
