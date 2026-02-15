import {useContext} from 'react';
import {NotesContext} from "../context/NotesContext.ts";
import NoteCard from "../components/NoteCard/NoteCard.tsx";
import type {Note} from "../types/note.types.ts";
import ControlPanel from "../components/ControlPanel/ControlPanel.tsx";

const NotesPage = () => {

    const { notes } = useContext(NotesContext) as {notes: Note[] | null};
    return (
        <div>
            {notes
                ?.filter((note): note is Note => Boolean(note && note.id))
                .map((note) => (
                    <NoteCard note={note} key={note.id} />
                ))}
            <ControlPanel />
        </div>
    );
};

export default NotesPage;
