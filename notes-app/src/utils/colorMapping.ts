import colorOptions from "../assets/colorOptions.json";
import type {ApiNote, Note, NoteColors} from "../types/note.types.ts";

const colorById = new Map<string, NoteColors>(
    colorOptions.map((color) => [color.id, color])
);

const defaultColor = colorOptions[0] as NoteColors;

export function mapNoteWithColors(note: ApiNote): Note {
    const resolvedColor =
        note.colorsTheme ? colorById.get(note.colorsTheme) : undefined;

    return {
        ...note,
        colors: resolvedColor ?? defaultColor,
    };
}

export function mapNotesWithColors(notes: ApiNote[]): Note[] {
    return notes.map(mapNoteWithColors);
}
