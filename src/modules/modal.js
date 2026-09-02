export function initModal() {
  const modal = document.getElementById("modal-propuesta");
  const modalContent = document.getElementById("modal-content");
  const closeModalBtn = document.getElementById("close-modal");
  let previouslyFocusedElement = null;

  window.openModal = function (item) {
    if (!modal || !modalContent) return;

    previouslyFocusedElement = document.activeElement;

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
      `
      )
      .join("");

    modalContent.innerHTML = `
      <div>
        <div class="flex flex-wrap gap-2 mb-4">${badgesHTML}</div>
        <h3 class="font-heading text-2xl sm:text-3xl font-bold text-text-light mb-4" id="modal-title">
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
      ?.addEventListener("click", window.closeModalFunc);

    modal.classList.remove("hidden");
    setTimeout(() => {
      modal.classList.remove("opacity-0");
      // Mover el foco al modal (accesibilidad)
      closeModalBtn?.focus();
    }, 10);
    document.body.style.overflow = "hidden";
  };

  window.closeModalFunc = function () {
    if (!modal) return;
    modal.classList.add("opacity-0");
    setTimeout(() => {
      modal.classList.add("hidden");
      document.body.style.overflow = "";
      if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
      }
    }, 300);
  };

  closeModalBtn?.addEventListener("click", window.closeModalFunc);
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) window.closeModalFunc();
  });

  // Accesibilidad: Cerrar con Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      window.closeModalFunc();
    }
  });

  // Accesibilidad: Focus trap
  modal?.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      const focusableElements = modal.querySelectorAll('a[href], button, textarea, input, select');
      if (focusableElements.length === 0) return;
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  });
}
