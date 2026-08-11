import "./style.css";
import propuestasData from "./data/propuestas.json";

// 1. Lógica del menú hamburguesa con animación y deslizamiento
const btn = document.getElementById("menu-btn");
const menu = document.getElementById("mobile-menu");
const links = document.querySelectorAll(".mobile-link");

function toggleMenu() {
  btn.classList.toggle("is-active");
  menu.classList.toggle("mobile-menu-closed");
  menu.classList.toggle("mobile-menu-open");
}

btn?.addEventListener("click", toggleMenu);

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
  if (!header) return;
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

// 6. Animación de revelado progresivo + Zoom interno en fotos
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".scroll-reveal");
  if (!revealElements.length) return;

  if ("IntersectionObserver" in window) {
    revealElements.forEach((el) => {
      el.classList.add("opacity-0", "translate-y-8");
    });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-8");
            entry.target.classList.add("opacity-100", "translate-y-0");

            // Si el contenedor tiene una foto interna con .photo-zoom, activa la escala normal
            const photo = entry.target.querySelector(".photo-zoom");
            if (photo) {
              photo.classList.remove("scale-110");
              photo.classList.add("scale-100");
            }

            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -20px 0px",
      },
    );

    revealElements.forEach((el) => observer.observe(el));
  }
}

initScrollReveal();

// 3. Secuencia de máquina de escribir y encendido en el Hero
document.addEventListener("DOMContentLoaded", () => {
  const line1 = "Esculpiendo el futuro de la";
  const line2 = "a través de la";

  const el1 = document.getElementById("typed-text-1");
  const el2 = document.getElementById("typed-text-2");
  const glow1 = document.getElementById("glow-word-1");
  const glow2 = document.getElementById("glow-word-2");
  const fadeContent = document.getElementById("hero-fade-content");
  const heroCta = document.getElementById("hero-cta");

  if (!el1 || !el2 || !glow1 || !glow2) return;

  let i = 0;
  let j = 0;

  const speed1 = Math.round(45 * 1.2);
  const baseSpeed2 = Math.floor((line1.length * 54) / line2.length);
  const speed2 = Math.round(baseSpeed2 * 1.2);

  function typeWriter1() {
    if (i < line1.length) {
      el1.textContent += line1.charAt(i);
      i++;
      setTimeout(typeWriter1, speed1);
    } else {
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
      glow2.classList.remove("opacity-0");
      glow2.classList.add(
        "drop-shadow-[0_0_25px_rgba(255,215,0,0.8)]",
        "scale-105",
      );

      setTimeout(
        () => {
          fadeContent?.classList.remove("opacity-0");
          heroCta?.classList.remove("opacity-0");
        },
        Math.round(500 * 1.2),
      );
    }
  }

  setTimeout(typeWriter1, Math.round(300 * 1.2));
});

// 4. Renderizado Dinámico de Propuestas Formativas
function renderCards(data) {
  const container = document.getElementById("cards-container");
  if (!container) return;

  container.innerHTML = "";

  data.forEach((item) => {
    const card = document.createElement("div");
    card.className =
      "proposal-card w-full bg-surface-background text-text-primary rounded-[24px] p-8 sm:p-10 2xl:p-12 shadow-2xl transition-all duration-300";
    card.setAttribute("data-audience", item.audience.join(" "));
    card.setAttribute("data-level", item.level.join(" "));

    const badgesHTML = item.badges
      .map((b) => {
        const bgClass =
          b.type === "yellow"
            ? "bg-interactive-yellow text-surface-black"
            : "bg-interactive-purple text-text-light";
        return `<span class="${bgClass} text-xs font-bold px-3 py-1 rounded-full">${b.label}</span>`;
      })
      .join("");

    const listHTML = item.items
      .map(
        (i) => `
      <li>
        <strong>${i.topic}:</strong> ${i.text}
      </li>
    `,
      )
      .join("");

    card.innerHTML = `
      <div class="flex flex-wrap gap-2 mb-6">
        ${badgesHTML}
      </div>

      <h3 class="font-heading text-2xl sm:text-3xl font-bold text-center mb-6 text-surface-black">
        ${item.title}
      </h3>

      <p class="font-body text-text-secondary text-base mb-6 leading-relaxed">
        ${item.description}
      </p>

      <ul class="list-disc list-inside space-y-2 text-text-secondary text-sm sm:text-base mb-8">
        ${listHTML}
      </ul>

      <div class="border-t border-text-secondary/20 pt-6 space-y-2 text-sm sm:text-base text-text-secondary">
        <p><strong>Duracion:</strong> ${item.details.duration}</p>
        <p><strong>Modalidad:</strong> ${item.details.modality}</p>
        <p><strong>Entregable:</strong> ${item.details.deliverable}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

// Renderizar tarjetas de inmediato
renderCards(propuestasData);

// 5. Lógica de Filtrado Multi-selección con validación de mínimo 1 activo
const audienceButtons = document.querySelectorAll(".filter-btn-audience");
const levelButtons = document.querySelectorAll(".filter-btn-level");

function filterCards() {
  const cards = document.querySelectorAll(".proposal-card");
  const activeAudiences = Array.from(
    document.querySelectorAll(".filter-btn-audience.active"),
  ).map((btn) => btn.getAttribute("data-filter"));
  const activeLevels = Array.from(
    document.querySelectorAll(".filter-btn-level.active"),
  ).map((btn) => btn.getAttribute("data-filter"));

  cards.forEach((card) => {
    const cardAudience = card.getAttribute("data-audience").split(" ");
    const cardLevels = card.getAttribute("data-level").split(" ");

    const matchesAudience = activeAudiences.some((a) =>
      cardAudience.includes(a),
    );
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
