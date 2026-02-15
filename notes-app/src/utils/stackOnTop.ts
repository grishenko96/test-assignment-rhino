export const stackOnTop = (selectedCard: HTMLElement) => {
    const baseZIndex = 999;
    selectedCard.style.zIndex = String(baseZIndex);

    Array.from(document.getElementsByClassName("card")).forEach((card) => {
        if (card instanceof HTMLElement && card !== selectedCard) {
            card.style.zIndex = String(baseZIndex - 1);
        }
    });
};
