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