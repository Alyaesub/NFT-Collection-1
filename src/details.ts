import type { nftType } from "./domain/types/types";
import { nftsList } from "./data/nft";
import { setYear } from "./app";

function getIdFromQuery(): number | null {
  const p = new URLSearchParams(window.location.search);
  const idStr = p.get("id");
  if (!idStr) return null;
  const n = Number(idStr);
  return Number.isFinite(n) ? n : null;
}

function render(nft: nftType) {
  const media = document.querySelector(".detail-container .media") as HTMLElement | null;
  const info = document.querySelector(".detail-container .info") as HTMLElement | null;
  if (!media || !info) return;

//injection des donné dans le html
  (document.getElementById("nft-img") as HTMLImageElement).src = nft.img;
  document.getElementById("nft-title")!.textContent = nft.title;
  document.getElementById("nft-description")!.textContent = nft.description;
  document.getElementById("nft-creator")!.textContent = nft.creator;
  document.getElementById("nft-price")!.textContent = nft.price;
  document.getElementById("nft-expire")!.textContent = nft.expire;
  document.getElementById("nft-id")!.textContent = String(nft.id);
}

function notFound() {
  const container = document.querySelector(".detail-container") as HTMLElement | null;
  if (!container) return;
  // On vide le contenu précédent de manière safe
  container.replaceChildren();
  // Création du bloc "empty"
  const empty = document.createElement("div");
  empty.className = "empty";
  const p = document.createElement("p");
  p.textContent = "❌ NFT introuvable.";
  const link = document.createElement("a");
  link.className = "btn";
  link.href = "/";
  link.textContent = "Retour à la collection";
  // On assemble les éléments
  empty.append(p, link);
  container.append(empty);
}


function initDetails() {
  const id = getIdFromQuery();
  if (!id) return notFound();
  const nft = nftsList.find(n => n.id === id);
  if (!nft) return notFound();
  render(nft);
}
initDetails();

//imort de setyear de app.ts
setYear()