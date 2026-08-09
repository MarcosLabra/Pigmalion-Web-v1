import "./style.css";

// 1. Lógica del menú hamburguesa con animación y deslizamiento
const btn = document.getElementById("menu-btn");
const menu = document.getElementById("mobile-menu");
const links = document.querySelectorAll(".mobile-link");

function toggleMenu() {
  btn.classList.toggle("is-active");
  menu.classList.toggle("mobile-menu-closed");
  menu.classList.toggle("mobile-menu-open");
}

btn.addEventListener("click", toggleMenu);

links.forEach((link) => {
  link.addEventListener("click", () => {
    btn.classList.remove("is-active");
    menu.classList.add("mobile-menu-closed");
    menu.classList.remove("mobile-menu-open");
  });
});

// 2. Cambio de color del header al hacer scroll
const header = document.getElementById("main-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add(
      "bg-interactive-dark/90",
      "backdrop-blur-md",
      "shadow-lg",
      "border-b",
      "border-text-light/10",
    );
    header.classList.remove("bg-transparent");
  } else {
    header.classList.remove(
      "bg-interactive-dark/90",
      "backdrop-blur-md",
      "shadow-lg",
      "border-b",
      "border-text-light/10",
    );
    header.classList.add("bg-transparent");
  }
});

// Secuencia de máquina de escribir y encendido en el Hero (20% más lenta)
document.addEventListener("DOMContentLoaded", () => {
  const line1 = "Esculpiendo el futuro de la"; // 27 caracteres
  const line2 = "a través de la"; // 14 caracteres

  const el1 = document.getElementById("typed-text-1");
  const el2 = document.getElementById("typed-text-2");
  const glow1 = document.getElementById("glow-word-1");
  const glow2 = document.getElementById("glow-word-2");
  const fadeContent = document.getElementById("hero-fade-content");
  const heroCta = document.getElementById("hero-cta");

  if (!el1 || !el2 || !glow1 || !glow2) return;

  let i = 0;
  let j = 0;

  // Velocidades incrementadas un 20% en milisegundos (más lento = mayor número)
  const speed1 = Math.round(45 * 1.2); // ~54 ms por carácter
  const baseSpeed2 = Math.floor((line1.length * 54) / line2.length);
  const speed2 = Math.round(baseSpeed2 * 1.2); // Proporcional y 20% más lento

  function typeWriter1() {
    if (i < line1.length) {
      el1.textContent += line1.charAt(i);
      i++;
      setTimeout(typeWriter1, speed1);
    } else {
      // Termina línea 1 -> Enciende Pedagogía (pausa un 20% más lenta: 720ms)
      glow1.classList.remove("opacity-0");
      glow1.classList.add(
        "drop-shadow-[0_0_25px_rgba(255,215,0,0.8)]",
        "scale-105",
      );
      setTimeout(typeWriter2, Math.round(600 * 1.2));
    }
  }

  function typeWriter2() {
    if (j < line2.length) {
      el2.textContent += line2.charAt(j);
      j++;
      setTimeout(typeWriter2, speed2);
    } else {
      // Termina línea 2 -> Enciende Tecnología
      glow2.classList.remove("opacity-0");
      glow2.classList.add(
        "drop-shadow-[0_0_25px_rgba(255,215,0,0.8)]",
        "scale-105",
      );

      // Muestra el párrafo y el botón final un 20% más lento (600ms)
      setTimeout(
        () => {
          fadeContent.classList.remove("opacity-0");
          heroCta.classList.remove("opacity-0");
        },
        Math.round(500 * 1.2),
      );
    }
  }

  // Iniciar la secuencia al cargar la página con un margen un 20% más lento (360ms)
  setTimeout(typeWriter1, Math.round(300 * 1.2));
});

// Lógica de Filtrado Multi-selección con validación de mínimo 1 activo
const audienceButtons = document.querySelectorAll(".filter-btn-audience");
const levelButtons = document.querySelectorAll(".filter-btn-level");
const cards = document.querySelectorAll(".proposal-card");

function filterCards() {
  const activeAudiences = Array.from(
    document.querySelectorAll(".filter-btn-audience.active"),
  ).map((btn) => btn.getAttribute("data-filter"));
  const activeLevels = Array.from(
    document.querySelectorAll(".filter-btn-level.active"),
  ).map((btn) => btn.getAttribute("data-filter"));

  cards.forEach((card) => {
    const cardAudience = card.getAttribute("data-audience");
    const cardLevels = card.getAttribute("data-level").split(" ");

    const matchesAudience = activeAudiences.includes(cardAudience);
    const matchesLevel = cardLevels.some((l) => activeLevels.includes(l));

    if (matchesAudience && matchesLevel) {
      card.style.display = "block";
      setTimeout(() => (card.style.opacity = "1"), 10);
    } else {
      card.style.opacity = "0";
      setTimeout(() => (card.style.display = "none"), 300);
    }
  });
}

function setupStrictToggleFilter(buttons, activeBgClass, inactiveBgClass) {
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const activeCount = Array.from(buttons).filter((b) =>
        b.classList.contains("active"),
      ).length;

      // Si intenta apagar el último botón activo de este grupo, se cancela la acción
      if (btn.classList.contains("active") && activeCount === 1) {
        return;
      }

      btn.classList.toggle("active");

      if (btn.classList.contains("active")) {
        btn.classList.remove(...inactiveBgClass.split(" "));
        btn.classList.add(...activeBgClass.split(" "));
      } else {
        btn.classList.remove(...activeBgClass.split(" "));
        btn.classList.add(...inactiveBgClass.split(" "));
      }

      filterCards();
    });
  });
}

setupStrictToggleFilter(
  audienceButtons,
  "bg-interactive-purple shadow-md text-text-light border-transparent",
  "bg-interactive-purple/40 border border-interactive-purple/60 text-text-light/80",
);

setupStrictToggleFilter(
  levelButtons,
  "bg-interactive-yellow shadow-md text-surface-black border-interactive-yellow",
  "bg-interactive-yellow/20 border border-interactive-yellow text-interactive-yellow",
);
