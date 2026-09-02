export function initMenu() {
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");
  const links = document.querySelectorAll(".mobile-link");

  function toggleMenu() {
    const isExpanded = btn?.getAttribute("aria-expanded") === "true";
    btn?.setAttribute("aria-expanded", !isExpanded);
    btn?.classList.toggle("is-active");
    menu?.classList.toggle("mobile-menu-closed");
    menu?.classList.toggle("mobile-menu-open");
  }

  btn?.addEventListener("click", toggleMenu);

  links.forEach((link) => {
    link.addEventListener("click", () => {
      btn?.setAttribute("aria-expanded", "false");
      btn?.classList.remove("is-active");
      menu?.classList.add("mobile-menu-closed");
      menu?.classList.remove("mobile-menu-open");
    });
  });

  const header = document.getElementById("main-header");
  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!header) return;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          header.classList.add(
            "bg-interactive-dark/90",
            "backdrop-blur-md",
            "shadow-lg",
            "border-b",
            "border-text-light/10"
          );
          header.classList.remove("bg-transparent");
        } else {
          header.classList.remove(
            "bg-interactive-dark/90",
            "backdrop-blur-md",
            "shadow-lg",
            "border-b",
            "border-text-light/10"
          );
          header.classList.add("bg-transparent");
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}
