export function initAnimations() {
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
  if (document.readyState === "complete" || document.readyState === "interactive") {
    initHeroFadeIn();
  }

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
        }
      );

      revealElements.forEach((el) => observer.observe(el));
    }
  }

  initScrollReveal();

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
}
