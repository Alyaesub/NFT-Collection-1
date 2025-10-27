import type { nftType } from "./domain/types/types";
import { nftsList } from "./data/nft";


function getIdFromQuery(): number | null {
  const params = new URLSearchParams(window.location.search);
  const idStr = params.get("id");

  if (!idStr) return null;

  const id = Number(idStr);
  return Number.isFinite(id) ? id : null;
}


function render(nft: nftType): void {
  const img = document.getElementById("nft-img") as HTMLImageElement;
  if (img) {
    img.src = nft.img;
    img.alt = nft.title;
  }

  const title = document.getElementById("nft-title");
  if (title) title.textContent = nft.title;

  const description = document.getElementById("nft-description");
  if (description) description.textContent = nft.description;

  const creator = document.getElementById("nft-creator");
  if (creator) creator.textContent = nft.creator;

  const price = document.getElementById("nft-price");
  if (price) price.textContent = nft.price;

  const expire = document.getElementById("nft-expire");
  if (expire) expire.textContent = nft.expire;

  const id = document.getElementById("nft-id");
  if (id) id.textContent = String(nft.id);
}


function notFound(): void {
  const container = document.querySelector(
    ".detail-container"
  ) as HTMLElement | null;
  if (!container) return;

  container.replaceChildren();

  const empty = document.createElement("div");
  empty.className = "empty";

  const p = document.createElement("p");
  p.textContent = "❌ NFT introuvable.";

  const link = document.createElement("a");
  link.className = "btn";
  link.href = "/";
  link.textContent = "Retour à la collection";

  empty.append(p, link);
  container.append(empty);
}


function setYear(): void {
  const el = document.getElementById("year");
  if (el) {
    el.textContent = String(new Date().getFullYear());
  }
}


function initDetails(): void {
  const id = getIdFromQuery();

  if (!id) {
    return notFound();
  }

  const nft = nftsList.find((n) => n.id === id);

  if (!nft) {
    return notFound();
  }

  render(nft);
}


initDetails();
setYear();


export { getIdFromQuery, render, notFound, setYear };