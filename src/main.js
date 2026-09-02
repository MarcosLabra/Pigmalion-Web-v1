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

function renderCards(data) {
  const container = document.getElementById("cards-container");
  if (!container) return;

  container.innerHTML = "";

  const isMobile = window.innerWidth < 768;

  data.forEach((item, index) => {
    const card = document.createElement("div");

    // En mobile usaremos un offset superior más ajustado (70px + 12px por tarjeta)
    // En desktop mantenemos (112px + 24px por tarjeta)
    const baseTop = isMobile ? 70 : 112;
    const step = isMobile ? 12 : 24;
    const topOffset = baseTop + index * step;

    card.className =
      "proposal-card sticky w-full max-w-4xl lg:max-w-5xl 2xl:max-w-6xl p-[2px] rounded-[24px] sm:rounded-[32px] bg-[linear-gradient(135deg,#111111_0%,#754595_100%)] shadow-[0_-12px_30px_rgba(0,0,0,0.35)] transition-all duration-300 mb-[25vh] sm:mb-[35vh]";

    card.style.top = `${topOffset}px`;
    card.style.zIndex = (index + 10).toString();

    card.setAttribute("data-audience", item.audience.join(" "));
    card.setAttribute("data-level", item.level.join(" "));

    const badgesHTML = item.badges
      .map((b) => {
        const bgClass =
          b.type === "yellow"
            ? "bg-interactive-yellow text-surface-black"
            : "bg-interactive-purple text-text-light";
        return `<span class="${bgClass} text-[10px] sm:text-xs font-bold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full">${b.label}</span>`;
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

    // Padding optimizado: p-5 en móvil para reducir altura vertical
    card.innerHTML = `
      <div class="w-full h-full bg-surface-background text-text-primary rounded-[22px] sm:rounded-[30px] p-5 sm:p-10 2xl:p-12">
        <div class="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-6">
          ${badgesHTML}
        </div>

        <h3 class="font-heading text-xl sm:text-3xl font-bold text-center mb-3 sm:mb-6 text-surface-black">
          ${item.title}
        </h3>

        <p class="font-body text-text-secondary text-sm sm:text-base mb-3 sm:mb-6 leading-relaxed">
          ${item.description}
        </p>

        <ul class="list-disc list-inside space-y-1 sm:space-y-2 text-text-secondary text-xs sm:text-base mb-4 sm:mb-8">
          ${listHTML}
        </ul>

        <div class="border-t border-text-secondary/20 pt-4 sm:pt-6 space-y-1 sm:space-y-2 text-xs sm:text-base text-text-secondary">
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
