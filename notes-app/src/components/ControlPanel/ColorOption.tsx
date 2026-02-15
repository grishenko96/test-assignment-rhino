import { useContext } from "react";
import { NotesContext } from "../../context/NotesContext.ts";
import { notesApi } from "../../api/notes.ts";
import type {Note, NoteColors} from "../../types/note.types.ts";

const ColorOption = ({ color }: {color : NoteColors}) => {
    const ctx = useContext(NotesContext);
    if (!ctx) {
        throw new Error("NotesContext used outside NotesProvider");
    }
    const { selectedNote, notes, setNotes, showAlert } = ctx;

    const changeColor = () => {
        if (!selectedNote || !notes) {
            showAlert("Rhino Notes", "You should select a note before changing colors");
            return;
        }

        const currentNoteIndex = notes.findIndex(
            (note) => note.id === selectedNote.id
        );
        if (currentNoteIndex === -1) {
            showAlert("Rhino Notes", "Please, selected note was not found");
            return;
        }

        const updatedNote: Note = {
            ...notes[currentNoteIndex],
            colors: color,
        };

        const newNotes = [...notes];
        newNotes[currentNoteIndex] = updatedNote;
        setNotes(newNotes);

        void notesApi.updateNote(selectedNote.id, { colorsTheme: color.id });
    };

    return (
        <div
            onClick={changeColor}
            className="color"
            style={{ backgroundColor: color.colorHeader }}
        ></div>
    );
};

export default ColorOption;
