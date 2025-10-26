import type { nftType } from "./domain/types/types";
import { nftsList } from "./data/nft";
import { clearCards, cloneCard } from "./ui/gestionCard";
import { populateCard } from "./ui/cardBuilder";
import {
  debounce,
  filterNFTs,
  getSearchInput,
  getNFTCountElement,
  getCardContainer,
} from "./utils/index";

/**
 * Create and populate a single NFT card
 */
function createCard(data: nftType): void {
  const card = cloneCard();
  if (card) {
    populateCard(card, data);
  }
}

/**
 * Render empty state when no NFTs match search
 */
function renderEmpty(): void {
  const root = getCardContainer();
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

  empty.append(p, link);
  root.append(empty);
}

/**
 * Update the NFT counter display
 */
function updateCount(count: number): void {
  const el = getNFTCountElement();
  if (el) {
    el.textContent = String(count);
  }
}

/**
 * Handle search input with debouncing
 * Filters NFTs by search query
 */
function handleSearch(event: Event): void {
  const input = event.target as HTMLInputElement;
  const query = input.value.trim();

  // Filter using advanced filter function
  const filteredList = query
    ? filterNFTs(nftsList, { search: query })
    : nftsList;

  // If no results, show empty state
  if (filteredList.length === 0) {
    clearCards();
    renderEmpty();
    updateCount(0);
    return;
  }

  // Otherwise, render filtered list
  init(filteredList);
}


const debouncedSearch = debounce(handleSearch, 300);


function attachSearchListener(): void {
  const input = getSearchInput();
  if (!input) return;

  input.removeEventListener("input", debouncedSearch);
  input.addEventListener("input", debouncedSearch);
}


function setYear(): void {
  const el = document.getElementById("year");
  if (el) {
    el.textContent = String(new Date().getFullYear());
  }
}


export default function init(list: nftType[] = nftsList): void {
  clearCards();

  list.forEach(createCard);

  attachSearchListener();

  
  updateCount(list.length);
}


setYear();


export { populateCard, createCard, setYear, updateCount, renderEmpty };

