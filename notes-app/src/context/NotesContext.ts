import {createContext} from "react";
import type {Note} from "../types/note.types.ts";

export type NotesContextValue = {
    notes: Note[] | null
    setNotes: React.Dispatch<React.SetStateAction<Note[] | null>>
    selectedNote: Note | null
    setSelectedNote: React.Dispatch<React.SetStateAction<Note | null>>
    showAlert: (title: string, message: string) => void
}

export const NotesContext = createContext<NotesContextValue | undefined>(undefined);
