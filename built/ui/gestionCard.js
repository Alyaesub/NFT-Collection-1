function clearCards() {
    const cardsContainer = document.querySelector(".card-container");
    while (cardsContainer?.firstChild) {
        cardsContainer.removeChild(cardsContainer.firstChild);
    }
}
function cloneCard() {
    const cardContainer = document.querySelector(".main-card");
    const clone = cardContainer.cloneNode(true);
    document.querySelector(".card-container")?.appendChild(clone);
    return clone;
}
export { clearCards, cloneCard };
//# sourceMappingURL=gestionCard.js.map