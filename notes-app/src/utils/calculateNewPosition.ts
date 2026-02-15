import type {NotePosition} from "../types/note.types.ts";

export const calculateNewPosition = (
    card: HTMLElement,
    mouseMove: NotePosition = { x: 0, y: 0 }
) => {
    const newX = card.offsetLeft - mouseMove.x;
    const newY = card.offsetTop - mouseMove.y;

    return {
        x: Math.max(0, newX),
        y: Math.max(0, newY),
    };
};