import './style.css';

// Lógica del menú hamburguesa
const btn = document.getElementById('menu-btn');
const menu = document.getElementById('mobile-menu');
const links = document.querySelectorAll('.mobile-link');

btn.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});

// Cierra el menú automáticamente al hacer clic en una opción
links.forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.add('hidden');
  });
});