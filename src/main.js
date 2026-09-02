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

  setTimeout(() => {
    heroItems.forEach((el) => {
      el.classList.remove("opacity-0", "translate-y-6");
      el.classList.add("opacity-100", "translate-y-0");
    });
  }, 100);
}

document.addEventListener("DOMContentLoaded", initHeroFadeIn);
if (
  document.readyState === "complete" ||
  document.readyState === "interactive"
) {
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

// 4. Lógica Modal
const modal = document.getElementById("modal-propuesta");
const modalContent = document.getElementById("modal-content");
const closeModalBtn = document.getElementById("close-modal");

function openModal(item) {
  if (!modal || !modalContent) return;

  const badgesHTML = item.badges
    .map((b) => {
      const bgClass =
        b.type === "yellow"
          ? "bg-interactive-yellow text-surface-black"
          : "bg-interactive-purple text-text-light";
      return `<span class="${bgClass} text-xs font-bold px-3 py-1 rounded-full">${b.label}</span>`;
    })
    .join("");

  const itemsHTML = item.items
    .map(
      (it) => `
      <div class="p-4 rounded-xl bg-surface-black/30 border border-text-light/10">
        <h5 class="font-heading font-bold text-interactive-yellow text-base mb-1">${it.topic}</h5>
        <p class="font-body text-text-light/80 text-sm leading-relaxed">${it.text}</p>
      </div>
    `,
    )
    .join("");

  modalContent.innerHTML = `
    <div>
      <div class="flex flex-wrap gap-2 mb-4">${badgesHTML}</div>
      <h3 class="font-heading text-2xl sm:text-3xl font-bold text-text-light mb-4">
        ${item.title}
      </h3>
      <p class="font-body text-text-light/90 text-base leading-relaxed mb-6">
        ${item.description}
      </p>
    </div>

    <div class="space-y-3">
      <h4 class="font-heading text-lg font-semibold text-text-light">Ejes de trabajo</h4>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        ${itemsHTML}
      </div>
    </div>

    <div class="mt-4 p-5 rounded-xl bg-interactive-purple/20 border border-interactive-purple/40 space-y-2 text-sm font-body">
      <p><strong class="text-interactive-yellow">Duración:</strong> ${item.details.duration}</p>
      <p><strong class="text-interactive-yellow">Modalidad:</strong> ${item.details.modality}</p>
      <p><strong class="text-interactive-yellow">Entregables:</strong> ${item.details.deliverable}</p>
    </div>

    <div class="pt-4 flex justify-end">
      <a
        href="#contacto"
        id="modal-cta-btn"
        class="w-full sm:w-auto px-6 py-3 bg-interactive-yellow text-surface-black font-body font-bold text-sm rounded-xl text-center hover:opacity-95 active:scale-95 transition-all"
      >
        Solicitar esta propuesta
      </a>
    </div>
  `;

  document
    .getElementById("modal-cta-btn")
    ?.addEventListener("click", closeModalFunc);

  modal.classList.remove("hidden");
  setTimeout(() => {
    modal.classList.remove("opacity-0");
  }, 10);
  document.body.style.overflow = "hidden";
}

function closeModalFunc() {
  if (!modal) return;
  modal.classList.add("opacity-0");
  setTimeout(() => {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }, 300);
}

closeModalBtn?.addEventListener("click", closeModalFunc);
modal?.addEventListener("click", (e) => {
  if (e.target === modal) closeModalFunc();
});

// 5. Renderizado Dinámico de Propuestas Formativas (Cards Reducidas)
function renderCards(data) {
  const container = document.getElementById("cards-container");
  if (!container) return;

  container.innerHTML = "";

  data.forEach((item) => {
    const card = document.createElement("div");

    card.className =
      "proposal-card w-full bg-interactive-dark/80 border border-text-light/10 hover:border-interactive-purple/60 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_25px_rgba(117,69,149,0.25)] flex flex-col justify-between group";

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

    card.innerHTML = `
      <div>
        <div class="flex flex-wrap gap-2 mb-4">
          ${badgesHTML}
        </div>

        <h3 class="font-heading text-xl font-bold text-text-light mb-3 group-hover:text-interactive-yellow transition-colors">
          ${item.title}
        </h3>

        <p class="font-body text-text-light/80 text-sm line-clamp-3 mb-6 leading-relaxed">
          ${item.description}
        </p>
      </div>

      <div class="pt-4 border-t border-text-light/10 flex items-center justify-between text-xs font-body text-interactive-yellow">
        <span class="flex items-center gap-1.5 font-medium">
          ⏱️ ${item.details.duration}
        </span>
        <span class="font-bold underline underline-offset-4 group-hover:translate-x-1 transition-transform">
          Ver detalle &rarr;
        </span>
      </div>
    `;

    card.addEventListener("click", () => openModal(item));
    container.appendChild(card);
  });
}

renderCards(propuestasData);

// 6. Lógica de Filtrado Multi-selección
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

// 7. Botón Flotante para Volver a Filtros
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
  const baseTop = isMobile ? 70 : 100;
  const step = isMobile ? 18 : 28;

  serviceCards.forEach((card, index) => {
    card.style.top = `${baseTop + index * step}px`;
    card.style.marginTop = index === 0 ? "0px" : isMobile ? "2rem" : "3rem";
  });
}

window.addEventListener("resize", initServicesStacking);
initServicesStacking();
