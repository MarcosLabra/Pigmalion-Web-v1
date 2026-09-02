import "./style.css";
import propuestasData from "./data/propuestas.json";

// 1. Lógica del menú hamburguesa
const btn = document.getElementById("menu-btn");
const menu = document.getElementById("mobile-menu");
const links = document.querySelectorAll(".mobile-link");

function toggleMenu() {
  btn?.classList.toggle("is-active");
  menu?.classList.toggle("mobile-menu-closed");
  menu?.classList.toggle("mobile-menu-open");
}

btn?.addEventListener("click", toggleMenu);

links.forEach((link) => {
  link.addEventListener("click", () => {
    btn?.classList.remove("is-active");
    menu?.classList.add("mobile-menu-closed");
    menu?.classList.remove("mobile-menu-open");
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

// Animación Fade-In de entrada para el Hero al cargar la página
function initHeroFadeIn() {
  const heroItems = document.querySelectorAll(".hero-fade-item");
  if (!heroItems.length) return;

  // Retraso mínimo para asegurar la inicialización completa del DOM
  setTimeout(() => {
    heroItems.forEach((el) => {
      el.classList.remove("opacity-0", "translate-y-6");
      el.classList.add("opacity-100", "translate-y-0");
    });
  }, 100);
}

document.addEventListener("DOMContentLoaded", initHeroFadeIn);
// Fallback en caso de que DOMContentLoaded ya haya ocurrido
if (document.readyState === "complete" || document.readyState === "interactive") {
  initHeroFadeIn();
}

// 3. Animación de revelado progresivo + Zoom interno en fotos
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

// 4. Renderizado Dinámico de Propuestas Formativas
function renderCards(data) {
  const container = document.getElementById("cards-container");
  if (!container) return;

  container.innerHTML = "";

  data.forEach((item) => {
    const card = document.createElement("div");

    card.className =
      "proposal-card w-full h-full bg-surface-background text-text-primary rounded-[24px] p-6 sm:p-8 2xl:p-12 shadow-2xl transition-all duration-300 border border-black/5 flex flex-col justify-between";

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
      <div class="flex flex-col h-full justify-between">
        <div>
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
        </div>

        <div class="border-t border-text-secondary/20 pt-6 space-y-2 text-sm sm:text-base text-text-secondary mt-auto">
          <p><strong>Duración:</strong> ${item.details.duration}</p>
          <p><strong>Modalidad:</strong> ${item.details.modality}</p>
          <p><strong>Entregable:</strong> ${item.details.deliverable}</p>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

renderCards(propuestasData);

// 5. Lógica de Filtrado Multi-selección
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
      card.style.display = "flex";
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

// 6. Botón Flotante para Volver a Filtros
const backToFiltersBtn = document.getElementById("btn-back-to-filters");
const cardsContainer = document.getElementById("cards-container");

if (backToFiltersBtn && cardsContainer) {
  function handleFloatingButtonVisibility() {
    const rect = cardsContainer.getBoundingClientRect();
    const isInsideCardsArea = rect.top < 0 && rect.bottom > 300;

    if (isInsideCardsArea) {
      backToFiltersBtn.classList.remove("opacity-0", "pointer-events-none");
      backToFiltersBtn.classList.add("opacity-100", "pointer-events-auto");
    } else {
      backToFiltersBtn.classList.remove("opacity-100", "pointer-events-auto");
      backToFiltersBtn.classList.add("opacity-0", "pointer-events-none");
    }
  }

  window.addEventListener("scroll", handleFloatingButtonVisibility);

  backToFiltersBtn.addEventListener("click", () => {
    const anchor = document.getElementById("filtros-anchor");
    if (!anchor) return;

    const headerOffset = 100;
    const elementPosition = anchor.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  });
}

function initServicesStacking() {
  const serviceCards = document.querySelectorAll(".service-card");
  if (!serviceCards.length) return;

  const isMobile = window.innerWidth < 768;

  // Offsets progresivos para replicar la cascada exacta de OpenOnion
  const baseTop = isMobile ? 70 : 100;
  const step = isMobile ? 18 : 28;

  serviceCards.forEach((card, index) => {
    card.style.top = `${baseTop + index * step}px`;
    card.style.marginTop = index === 0 ? "0px" : isMobile ? "2rem" : "3rem";
  });
}

window.addEventListener("resize", initServicesStacking);
initServicesStacking();