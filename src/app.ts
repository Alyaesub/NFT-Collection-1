import type { nftType } from "./domain/types/types";
import  { nftsList } from "./data/nft";
import  { clearCards, cloneCard } from "././ui/gestionCard";

//layout de la generation de card
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

  // accessibilité + clic
  (currentCard as HTMLElement).tabIndex = 0;
  (currentCard as HTMLElement).setAttribute("role", "button");
  currentCard.setAttribute("data-id", String(data.id));

  //gere la route vers la page detailsNFT
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

//function quiigére la création de card en fonction du nombre de nft
function createCard(data: nftType) {
  const card = cloneCard();
  populateCard(card as Element, data);
}

//function de la saerchbar
function renderEmpty() {
  const root = document.querySelector(".card-container");
  if (!root) return;
  root.replaceChildren();
  const empty = document.createElement("div");
  empty.className = "empty";
  const p = document.createElement("p");
  p.textContent = "🫥 Aucun NFT ne correspond à ta recherche 🫥";
  const link = document.createElement("a");
  link.className = "btn small";
  link.href = "/";
  link.textContent = "Réinitialiser";
  // On assemble les éléments
  empty.append(p, link);
  root.append(empty);
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
    updateCount(0); 
    return;
  }
  init(filteredList);
}
//function qui gére le compteur des nft
function updateCount(n: number) {
  const el = document.getElementById("nft-count");
  if (el) el.textContent = String(n);
}
//function d'initialisation
export default function init(list = nftsList) {
  console.log(list);
  const input = document.querySelector(".input-search") as HTMLInputElement;
    if (input) {
    input.removeEventListener("input", handleChange);
    input.addEventListener("input", handleChange);
  }
  clearCards();
  list.forEach(createCard);
  //compteur sur la collection affichée
  updateCount(list.length);
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

