import propuestasData from "../data/propuestas.json";

export function initCards() {
  const container = document.getElementById("cards-container");
  if (!container) return;

  function initCarousel() {
    const prevBtn = document.getElementById("carousel-prev");
    const nextBtn = document.getElementById("carousel-next");
    const dotsContainer = document.getElementById("carousel-dots");

    function getVisibleCards() {
      return Array.from(
        container.querySelectorAll(".proposal-card:not(.hidden)")
      );
    }

    function updateCarouselPadding() {
      if (window.innerWidth >= 1024) {
        container.style.paddingLeft = "0px";
        container.style.paddingRight = "0px";
        return;
      }
      const visibleCards = getVisibleCards();
      if (visibleCards.length === 0) return;

      const cardWidth = visibleCards[0].offsetWidth;
      const sidePadding = (container.clientWidth - cardWidth) / 2;

      container.style.paddingLeft = `${sidePadding}px`;
      container.style.paddingRight = `${sidePadding}px`;
    }

    function getActiveCardIndex() {
      const visibleCards = getVisibleCards();
      if (visibleCards.length === 0) return 0;

      const containerCenter = container.scrollLeft + container.clientWidth / 2;
      let closestIndex = 0;
      let minDistance = Infinity;

      visibleCards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(containerCenter - cardCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      return closestIndex;
    }

    function scrollToCard(index) {
      const visibleCards = getVisibleCards();
      if (!visibleCards[index]) return;

      const card = visibleCards[index];
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const targetScroll = cardCenter - container.clientWidth / 2;

      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }

    function renderDots() {
      if (!dotsContainer) return;
      const visibleCards = getVisibleCards();
      dotsContainer.innerHTML = "";

      if (window.innerWidth >= 1024 || visibleCards.length <= 1) return;

      visibleCards.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.className = `w-2.5 h-2.5 rounded-full transition-all duration-300 ${
          index === getActiveCardIndex()
            ? "bg-interactive-yellow w-6"
            : "bg-text-light/30"
        }`;
        dot.setAttribute("aria-label", `Ir a propuesta ${index + 1}`);
        dot.addEventListener("click", () => scrollToCard(index));
        dotsContainer.appendChild(dot);
      });
    }

    function updateActiveState() {
      const activeIndex = getActiveCardIndex();
      const visibleCards = getVisibleCards();

      if (prevBtn) prevBtn.disabled = activeIndex === 0;
      if (nextBtn) nextBtn.disabled = activeIndex === visibleCards.length - 1;

      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll("button");
        dots.forEach((dot, idx) => {
          if (idx === activeIndex) {
            dot.className =
              "w-6 h-2.5 rounded-full bg-interactive-yellow transition-all duration-300";
          } else {
            dot.className =
              "w-2.5 h-2.5 rounded-full bg-text-light/30 transition-all duration-300";
          }
        });
      }
    }

    if (prevBtn) {
      prevBtn.onclick = () => {
        const currentIndex = getActiveCardIndex();
        if (currentIndex > 0) scrollToCard(currentIndex - 1);
      };
    }

    if (nextBtn) {
      nextBtn.onclick = () => {
        const visibleCards = getVisibleCards();
        const currentIndex = getActiveCardIndex();
        if (currentIndex < visibleCards.length - 1)
          scrollToCard(currentIndex + 1);
      };
    }

    container.onscroll = () => {
      window.requestAnimationFrame(updateActiveState);
    };

    window.onresize = () => {
      updateCarouselPadding();
      renderDots();
      updateActiveState();
    };

    updateCarouselPadding();
    renderDots();
    updateActiveState();
  }

  function renderCards(data) {
    container.innerHTML = "";

    data.forEach((item) => {
      const card = document.createElement("div");

      // w-[82vw] asegura espacio amplio para textos en el centro sin apretar
      card.className =
        "proposal-card snap-center shrink-0 w-[82vw] sm:w-[380px] lg:w-auto h-auto bg-interactive-dark/80 border border-text-light/10 hover:border-interactive-purple/60 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_25px_rgba(117,69,149,0.25)] flex flex-col group";

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
        <div class="flex flex-col flex-1 justify-between">
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

          <div class="pt-4 border-t border-text-light/10 flex items-center justify-between gap-2 text-xs font-body text-interactive-yellow mt-auto">
            <span class="flex items-center gap-1 font-medium whitespace-nowrap">
              ⏱️ ${item.details.duration}
            </span>
            <span class="font-bold underline underline-offset-4 shrink-0 whitespace-nowrap group-hover:translate-x-1 transition-transform">
              Ver detalle &rarr;
            </span>
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        if (typeof window.openModal === "function") {
          window.openModal(item);
        }
      });
      container.appendChild(card);
    });

    initCarousel();
  }

  const filtersContainer = document.getElementById("filters-container");
  const scrollHint = document.getElementById("filters-scroll-hint");

  if (filtersContainer && scrollHint) {
    filtersContainer.addEventListener(
      "scroll",
      () => {
        if (filtersContainer.scrollLeft > 15) {
          scrollHint.classList.add("opacity-0");
        } else {
          scrollHint.classList.remove("opacity-0");
        }
      },
      { passive: true }
    );
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

    setTimeout(() => {
      initCarousel();
    }, 310);
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

  if (backToFiltersBtn && container) {
    function handleFloatingButtonVisibility() {
      const rect = container.getBoundingClientRect();
      const isInsideCardsArea = rect.top < 0 && rect.bottom > 300;

      if (isInsideCardsArea) {
        backToFiltersBtn.classList.remove("opacity-0", "pointer-events-none");
        backToFiltersBtn.classList.add("opacity-100", "pointer-events-auto");
      } else {
        backToFiltersBtn.classList.remove(
          "opacity-100",
          "pointer-events-auto"
        );
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
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  }
}