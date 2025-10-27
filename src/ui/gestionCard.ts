import { getCardContainer, getTemplateCard } from "../utils/domCache";
import { removeElementListeners } from "../utils/eventManager";


function clearCards(): void {
  const container = getCardContainer();
  if (!container) return;


  const cards = container.querySelectorAll(".main-card");
  cards.forEach((card) => removeElementListeners(card));

  
  container.replaceChildren();
}


function cloneCard(): Element | null {
  const template = getTemplateCard();
  const container = getCardContainer();

  if (!template || !container) return null;

  const clone = template.cloneNode(true) as Element;
  container.appendChild(clone);
  return clone;
}

export { clearCards, cloneCard };