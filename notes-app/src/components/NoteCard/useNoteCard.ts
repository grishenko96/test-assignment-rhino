import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { NotesContext } from "../../context/NotesContext.ts";
import { adjustTextareaHeight } from "../../utils/adjustTextareaHeight.ts";
import { stackOnTop } from "../../utils/stackOnTop.ts";
import { calculateNewPosition } from "../../utils/calculateNewPosition.ts";
import type { Note, NotePosition, UpdateNoteDto } from "../../types/note.types.ts";
import { notesApi } from "../../api/notes.ts";

type UseNoteCardResult = {
    cardRef: React.RefObject<HTMLDivElement | null>;
    textAreaRef: React.RefObject<HTMLTextAreaElement | null>;
    position: NotePosition;
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
    onKeyUp: () => void;
    onFocus: () => void;
    onInput: () => void;
};

const TEXT_SAVE_DELAY_MS = 2000;

export const useNoteCard = (note: Note): UseNoteCardResult => {
    const ctx = useContext(NotesContext);
    if (!ctx) {
        throw new Error("NotesContext used outside NotesProvider");
    }
    const { setSelectedNote } = ctx;

    const cardRef = useRef<HTMLDivElement | null>(null);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const mouseStartPos = useRef<NotePosition>({ x: 0, y: 0 });
    const keyUpTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [position, setPosition] = useState<NotePosition>(
        note.position ?? { x: 0, y: 0 },
    );

    useEffect(() => {
        adjustTextareaHeight(textAreaRef);
        if (cardRef.current) {
            stackOnTop(cardRef.current);
        }
    }, []);

    const persistNotePatch = useCallback(async (patch: UpdateNoteDto) => {
        try {
            await notesApi.updateNote(note.id, patch);
        } catch (error) {
            console.error(error);
        }
    }, [note.id]);

    const onMouseMove = useCallback((e: MouseEvent) => {
        const mouseMoveDir = {
            x: mouseStartPos.current.x - e.clientX,
            y: mouseStartPos.current.y - e.clientY,
        };

        mouseStartPos.current = { x: e.clientX, y: e.clientY };

        if (cardRef.current) {
            const newPosition = calculateNewPosition(cardRef.current, mouseMoveDir);
            setPosition(newPosition);
        }
    }, []);

    const onMouseUp = useCallback(() => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);

        if (cardRef.current) {
            const newPosition = calculateNewPosition(cardRef.current);
            setPosition(newPosition);
            void persistNotePatch({ position: newPosition });
        }
    }, [onMouseMove, persistNotePatch]);

    const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target instanceof HTMLElement && e.target.className === "card-header") {
            mouseStartPos.current = { x: e.clientX, y: e.clientY };

            if (cardRef.current) {
                stackOnTop(cardRef.current);
            }

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
            setSelectedNote(note);
        }
    }, [note, onMouseMove, onMouseUp, setSelectedNote]);

    const onKeyUp = useCallback(() => {
        if (keyUpTimer.current) {
            clearTimeout(keyUpTimer.current);
        }

        keyUpTimer.current = setTimeout(() => {
            if (textAreaRef.current) {
                void persistNotePatch({ body: textAreaRef.current.value });
            }
        }, TEXT_SAVE_DELAY_MS);
    }, [persistNotePatch]);

    const onFocus = useCallback(() => {
        if (cardRef.current) {
            stackOnTop(cardRef.current);
        }
        setSelectedNote(note);
    }, [note, setSelectedNote]);

    const onInput = useCallback(() => {
        adjustTextareaHeight(textAreaRef);
    }, []);

    useEffect(() => {
        return () => {
            if (keyUpTimer.current) {
                clearTimeout(keyUpTimer.current);
            }
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };
    }, [onMouseMove, onMouseUp]);

    return {
        cardRef,
        textAreaRef,
        position,
        onMouseDown,
        onKeyUp,
        onFocus,
        onInput,
    };
};
