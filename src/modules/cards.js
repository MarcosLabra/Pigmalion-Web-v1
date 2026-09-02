import propuestasData from "../data/propuestas.json";

export function initCards() {
  const container = document.getElementById("cards-container");
  if (!container) return;

  function renderCards(data) {
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

      card.addEventListener("click", () => {
        if (typeof window.openModal === "function") {
          window.openModal(item);
        }
      });
      container.appendChild(card);
    });
  }

  renderCards(propuestasData);

  const audienceButtons = document.querySelectorAll(".filter-btn-audience");
  const levelButtons = document.querySelectorAll(".filter-btn-level");

  function filterCards() {
    const cards = document.querySelectorAll(".proposal-card");
    const activeAudiences = Array.from(
      document.querySelectorAll(".filter-btn-audience.active")
    ).map((btn) => btn.getAttribute("data-filter"));

    const activeLevels = Array.from(
      document.querySelectorAll(".filter-btn-level.active")
    ).map((btn) => btn.getAttribute("data-filter"));

    cards.forEach((card) => {
      const cardAudience = card.getAttribute("data-audience").split(" ");
      const cardLevels = card.getAttribute("data-level").split(" ");

      const matchesAudience = activeAudiences.some((a) =>
        cardAudience.includes(a)
      );
      const matchesLevel = cardLevels.some((l) => activeLevels.includes(l));

      if (matchesAudience && matchesLevel) {
        card.classList.remove("hidden");
        window.requestAnimationFrame(() => {
          card.classList.remove("opacity-0");
        });
      } else {
        card.classList.add("opacity-0");
        setTimeout(() => {
          if (card.classList.contains("opacity-0")) {
            card.classList.add("hidden");
          }
        }, 300);
      }
    });
  }

  function setupStrictToggleFilter(buttons, activeBgClass, inactiveBgClass) {
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const activeCount = Array.from(buttons).filter((b) =>
          b.classList.contains("active")
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
    "bg-interactive-purple/40 border border-interactive-purple/60 text-text-light/80"
  );

  setupStrictToggleFilter(
    levelButtons,
    "bg-interactive-yellow shadow-md text-surface-black border-interactive-yellow",
    "bg-interactive-yellow/20 border border-interactive-yellow text-interactive-yellow"
  );

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

    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleFloatingButtonVisibility();
          ticking = false;
        });
        ticking = true;
      }
    });

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
}
