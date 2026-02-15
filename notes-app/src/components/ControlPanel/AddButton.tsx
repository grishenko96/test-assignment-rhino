import { useContext, useRef } from "react";
import { NotesContext } from "../../context/NotesContext.ts";
import { notesApi } from "../../api/notes.ts";
import Plus from "../../icons/Plus.tsx";
import ColorOptions from "../../assets/colorOptions.json";
import type { ApiNote, CreateNoteDto } from "../../types/note.types.ts";
import { mapNoteWithColors, mapNotesWithColors } from "../../utils/colorMapping.ts";

const AddButton = () => {
    const ctx = useContext(NotesContext);
    if (!ctx) {
        throw new Error("NotesContext used outside NotesProvider");
    }
    const { setNotes } = ctx;
    const startingPos = useRef(20);

    const addNote = async () => {
        const payload: CreateNoteDto = {
            body: "",
            position: {
                x: startingPos.current,
                y: startingPos.current,
            },
            colorsTheme: ColorOptions[0].id,
        };

        startingPos.current += 20
        const response: ApiNote | undefined = await notesApi.createNote(payload);
        if (!response || !response.id) {
            const refreshed = await notesApi.getAllNotes();
            setNotes(mapNotesWithColors(refreshed));
            return;
        }

        setNotes((prevState) =>
            prevState
                ? [mapNoteWithColors(response), ...prevState]
                : [mapNoteWithColors(response)]
        );
    };

    return (
        <div id="add-btn" onClick={addNote}>
            <Plus />
        </div>
    );
};

export default AddButton;
