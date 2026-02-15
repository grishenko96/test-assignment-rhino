import {useContext} from "react";
import { NotesContext } from "../../context/NotesContext.ts";
import Trash from "../../icons/Bin.tsx";
import { notesApi } from "../../api/notes.ts";
import type { Note } from "../../types/note.types.ts";

type DeleteButtonProps = {
    noteId: Note["id"];
};

const DeleteButton = ({ noteId }: DeleteButtonProps) => {
    const ctx = useContext(NotesContext);
    if (!ctx) {
        throw new Error("NotesContext used outside NotesProvider");
    }
    const { setNotes, showAlert } = ctx;

    const handleDelete = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    try{

        await notesApi.deleteNote(noteId);

        setNotes((prevState) =>
            prevState ? prevState.filter((note) => note.id !== noteId) : prevState
        );
    }catch(error){
        showAlert("Rhino Notes", "Delete failed. Please try again.");
        console.error('Delete failed:', error);
    }
    };
    return (
        <div onClick={handleDelete}>
            <Trash />
        </div>
    );
};

export default DeleteButton;
