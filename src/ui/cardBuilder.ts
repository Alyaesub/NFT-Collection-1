

import type { nftType } from "../domain/types/types";
import { addEventListener } from "../utils/eventManager";


export function setCardData(card: Element, data: nftType): void {
  const img = card.querySelector(".main-image") as HTMLImageElement;
  if (img) {
    img.src = data.img;
    img.alt = data.title;
  }

  const title = card.querySelector(".title") as HTMLHeadingElement;
  if (title) {
    title.textContent = data.title;
  }

  const description = card.querySelector(".description") as HTMLParagraphElement;
  if (description) {
    description.textContent = data.description;
  }

  const eth = card.querySelector(".eth") as HTMLSpanElement;
  if (eth) {
    eth.textContent = data.price;
  }

  const expire = card.querySelector(".expire") as HTMLSpanElement;
  if (expire) {
    expire.textContent = data.expire;
  }

  const creator = card.querySelector(".creator-name") as HTMLSpanElement;
  if (creator) {
    creator.textContent = data.creator;
  }

  const avatar = card.querySelector(".avatar") as HTMLImageElement;
  if (avatar) {
    avatar.src = data.avatar;
    avatar.alt = data.creator;
  }
}


export function setCardAccessibility(card: Element, data: nftType): void {
  (card as HTMLElement).tabIndex = 0;
  (card as HTMLElement).setAttribute("role", "button");
  (card as HTMLElement).setAttribute("data-id", String(data.id));
  (card as HTMLElement).setAttribute("aria-label", `View details for ${data.title}`);
}


function navigateToDetails(nftId: number, cardElement?: Element): void {

  if (cardElement) {
    cardElement.classList.add("loading");
  }
  setTimeout(() => {
    window.location.href = `details.html?id=${nftId}`;
  }, 300);
}


export function setCardListeners(card: Element, data: nftType): void {
  const handleClick: EventListener = () => navigateToDetails(data.id, card);

  const handleKeydown: EventListener = (evt: Event) => {
    const e = evt as KeyboardEvent;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigateToDetails(data.id, card);
    }
  };

  addEventListener(card, "click", handleClick);
  addEventListener(card, "keydown", handleKeydown);
}


export function populateCard(card: Element, data: nftType): void {
  setCardData(card, data);
  setCardAccessibility(card, data);
  setCardListeners(card, data);
}
