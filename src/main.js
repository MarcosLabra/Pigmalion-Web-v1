import "./style.css";
import { initMenu } from "./modules/menu.js";
import { initAnimations } from "./modules/animations.js";
import { initModal } from "./modules/modal.js";
import { initCards } from "./modules/cards.js";
import { initHeroText } from "./modules/heroText.js";

document.addEventListener("DOMContentLoaded", () => {
  initHeroText();
  initMenu();
  initAnimations();
  initModal();
  initCards();
});
