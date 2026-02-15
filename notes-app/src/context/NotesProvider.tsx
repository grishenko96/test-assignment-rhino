import {useEffect, useState} from "react";
import type {ApiNote, Note} from "../types/note.types.ts";
import {notesApi} from "../api/notes.ts";
import Spinner from "../icons/Spinner.tsx";
import {NotesContext} from "./NotesContext.ts";
import {mapNotesWithColors} from "../utils/colorMapping.ts";
import AlertModal from "../components/AlertModal/AlertModal.tsx";

type NotesProviderProps = {
    children: React.ReactNode
}

const NotesProvider = ({ children }: NotesProviderProps) => {
    const [selectedNote, setSelectedNote] = useState<Note | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [notes, setNotes] = useState<Note[] | null>(null)
    const [alertState, setAlertState] = useState({
        open: false,
        title: "",
        message: "",
    });


    useEffect(() => {
        const init = async () => {
            try {
                const responseData: ApiNote[] = await notesApi.getAllNotes()
                setNotes(mapNotesWithColors(responseData))
            } catch (error) {
                console.error("Failed to fetch notes:", error)
            } finally {
                setLoading(false)
            }
        }
        init()
    }, [])

    const showAlert = (title: string, message: string) => {
        setAlertState({ open: true, title, message });
    };

    const closeAlert = () => {
        setAlertState((prev) => ({ ...prev, open: false }));
    };

    const contextData = {notes, setNotes, selectedNote, setSelectedNote, showAlert}

    return (
        <NotesContext.Provider value={contextData}>
            {loading ? (
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                }}
                >
                    <Spinner size="100" />
                </div>
            ) : (
                children
            )}
            <AlertModal
                open={alertState.open}
                title={alertState.title}
                message={alertState.message}
                onClose={closeAlert}
            />

        </NotesContext.Provider>
    );
};

export default NotesProvider;
