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

  media.innerHTML = `
    <img src="${nft.img}" alt="${nft.title}" class="nft-detail__image" />
  `;

  info.innerHTML = `
    <h1 class="nft-detail__title">${nft.title}</h1>
    <p class="nft-detail__desc">${nft.description}</p>

    <div class="nft-detail__meta">
      <div><strong>Créateur :</strong> ${nft.creator}</div>
      <div><strong>Prix :</strong> ${nft.price}</div>
      <div><strong>Expire :</strong> ${nft.expire}</div>
      <div><strong>ID :</strong> #${nft.id}</div>
    </div>

    <div class="nft-detail__actions">
      <a class="btn" href="/">← Retour</a>
      <a class="btn primary" aria-disabled="true" tabindex="-1" style="opacity:.6;pointer-events:none;">
        Voir sur OpenSea
      </a>
    </div>
  `;
}

function notFound() {
  const container = document.querySelector(".detail-container") as HTMLElement | null;
  if (!container) return;
  container.innerHTML = `
    <div class="empty">
      <p>❌ NFT introuvable.</p>
      <a class="btn" href="/">Retour à la collection</a>
    </div>
  `;
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