import './style.css';

// 1. Lógica del menú hamburguesa con animación y deslizamiento
const btn = document.getElementById('menu-btn');
const menu = document.getElementById('mobile-menu');
const links = document.querySelectorAll('.mobile-link');

function toggleMenu() {
  btn.classList.toggle('is-active');
  menu.classList.toggle('mobile-menu-closed');
  menu.classList.toggle('mobile-menu-open');
}

btn.addEventListener('click', toggleMenu);

links.forEach(link => {
  link.addEventListener('click', () => {
    btn.classList.remove('is-active');
    menu.classList.add('mobile-menu-closed');
    menu.classList.remove('mobile-menu-open');
  });
});

// 2. Cambio de color del header al hacer scroll
const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('bg-interactive-dark/90', 'backdrop-blur-md', 'shadow-lg', 'border-b', 'border-text-light/10');
    header.classList.remove('bg-transparent');
  } else {
    header.classList.remove('bg-interactive-dark/90', 'backdrop-blur-md', 'shadow-lg', 'border-b', 'border-text-light/10');
    header.classList.add('bg-transparent');
  }
});

// Lógica de Filtrado Multi-selección con validación de mínimo 1 activo
const audienceButtons = document.querySelectorAll('.filter-btn-audience');
const levelButtons = document.querySelectorAll('.filter-btn-level');
const cards = document.querySelectorAll('.proposal-card');

function filterCards() {
  const activeAudiences = Array.from(document.querySelectorAll('.filter-btn-audience.active'))
                               .map(btn => btn.getAttribute('data-filter'));
  const activeLevels = Array.from(document.querySelectorAll('.filter-btn-level.active'))
                          .map(btn => btn.getAttribute('data-filter'));

  cards.forEach(card => {
    const cardAudience = card.getAttribute('data-audience');
    const cardLevels = card.getAttribute('data-level').split(' ');

    const matchesAudience = activeAudiences.includes(cardAudience);
    const matchesLevel = cardLevels.some(l => activeLevels.includes(l));

    if (matchesAudience && matchesLevel) {
      card.style.display = 'block';
      setTimeout(() => card.style.opacity = '1', 10);
    } else {
      card.style.opacity = '0';
      setTimeout(() => card.style.display = 'none', 300);
    }
  });
}

function setupStrictToggleFilter(buttons, activeBgClass, inactiveBgClass) {
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeCount = Array.from(buttons).filter(b => b.classList.contains('active')).length;

      // Si intenta apagar el último botón activo de este grupo, se cancela la acción
      if (btn.classList.contains('active') && activeCount === 1) {
        return; 
      }

      btn.classList.toggle('active');

      if (btn.classList.contains('active')) {
        btn.classList.remove(...inactiveBgClass.split(' '));
        btn.classList.add(...activeBgClass.split(' '));
      } else {
        btn.classList.remove(...activeBgClass.split(' '));
        btn.classList.add(...inactiveBgClass.split(' '));
      }

      filterCards();
    });
  });
}

setupStrictToggleFilter(
  audienceButtons, 
  'bg-interactive-purple shadow-md text-text-light border-transparent', 
  'bg-interactive-purple/40 border border-interactive-purple/60 text-text-light/80'
);

setupStrictToggleFilter(
  levelButtons, 
  'bg-interactive-yellow shadow-md text-surface-black border-interactive-yellow', 
  'bg-interactive-yellow/20 border border-interactive-yellow text-interactive-yellow'
);