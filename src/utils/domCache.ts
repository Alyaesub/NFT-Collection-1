

interface DOMElements {
  input: HTMLInputElement | null;
  container: HTMLElement | null;
  nftCount: HTMLElement | null;
  template: Element | null;
}

let cachedElements: DOMElements | null = null;


export function getDOMElements(): DOMElements {
  if (cachedElements) {
    return cachedElements;
  }

  cachedElements = {
    input: document.querySelector(".input-search") as HTMLInputElement,
    container: document.querySelector(".card-container") as HTMLElement,
    nftCount: document.getElementById("nft-count") as HTMLElement,
    template: document.querySelector(".main-card") as Element,
  };

  return cachedElements;
}


export function invalidateCache(): void {
  cachedElements = null;
}


export function getCardContainer(): HTMLElement | null {
  return getDOMElements().container;
}


export function getTemplateCard(): Element | null {
  return getDOMElements().template;
}


export function getSearchInput(): HTMLInputElement | null {
  return getDOMElements().input;
}


export function getNFTCountElement(): HTMLElement | null {
  return getDOMElements().nftCount;
}
