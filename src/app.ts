import type { nftType } from "./domain/types/types";
import  { nftsList } from "./data/nft";
import  { clearCards, cloneCard } from "././ui/gestionCard";

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

  // ✅ accessibilité + clic
  (currentCard as HTMLElement).tabIndex = 0;
  (currentCard as HTMLElement).setAttribute("role", "button");
  currentCard.setAttribute("data-id", String(data.id));

  const goDetails = () => {
    window.location.href = `details.html?id=${data.id}`;
  };
  (currentCard as HTMLElement).addEventListener("click", goDetails);
  (currentCard as HTMLElement).addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goDetails();
    }
  });
}

function createCard(data: nftType) {
  const card = cloneCard();
  populateCard(card as Element, data);
}

function renderEmpty() {
  const root = document.querySelector(".card-container");
  if (!root) return;
  root.innerHTML = `
    <div class="empty">
      <span class="empty__emoji">🫥</span>
      <p>Aucun NFT ne correspond à ta recherche.</p>
      <a href="/" class="btn small">Réinitialiser</a>
    </div>
  `;
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
  if (filteredList.length === 0) {
    clearCards();
    renderEmpty();
    return;
  }
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

function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = String(new Date().getFullYear());
}
setYear();
export {
  populateCard,
  createCard,
  setYear
}

