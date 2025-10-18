import type { nftType } from "./domain/types/types";
import  { nftsList } from "./data/nft.js";
import  { clearCards, cloneCard } from "././ui/gestionCard.js";

function populateCard(currentCard: Element, data: nftType) {
  const img = currentCard.querySelector(".main-image") as HTMLImageElement;
  img.src = data.img;

  const title = currentCard.querySelector(".title") as HTMLHeadingElement;
  title.textContent = data.title;

  const description = currentCard.querySelector(
    ".description"
  ) as HTMLParagraphElement;
  description.textContent = data.description;

  const eth = currentCard.querySelector(".eth") as HTMLSpanElement;
  eth.textContent = data.price;

  const expire = currentCard.querySelector(".expire") as HTMLSpanElement;
  expire.textContent = data.expire;

  const creator = currentCard.querySelector(".creator-name") as HTMLSpanElement;
  creator.textContent = data.creator;

  const avatar = currentCard.querySelector(".avatar") as HTMLImageElement;
  avatar.src = data.avatar;
}

function createCard(data: nftType) {
  const card = cloneCard();
  populateCard(card as Element, data);
}

function handleChange(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  const filteredList = nftsList.filter((nft) => {
    return (
      nft.title.toLowerCase()?.includes(value.toLowerCase()) ||
      nft.description.toLowerCase().includes(value.toLowerCase()) ||
      nft.creator.toLowerCase().includes(value.toLowerCase())
    );
  });
  init(filteredList);
}

export default function init(list = nftsList) {
  console.log(list);
  const input = document.querySelector(".input-search") as HTMLInputElement;
    if (input) {
    input.removeEventListener("input", handleChange);
    input.addEventListener("input", handleChange);
  }
  clearCards();
  list.forEach(createCard);
}
export {
  populateCard,
  createCard
}

