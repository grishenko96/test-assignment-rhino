import DeleteButton from "../ControlPanel/DeleteButton.tsx";
import { useNoteCard } from "./useNoteCard.ts";
import type {Note} from "../../types/note.types.ts";

const NoteCard = ({ note }: { note: Note }) => {
    const { cardRef, textAreaRef, position, onMouseDown, onKeyUp, onFocus, onInput } =
        useNoteCard(note);
    const { colors, body } = note;

    return (
        <div
            ref={cardRef}
            className="card"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                backgroundColor: colors.colorBody,
            }}
        >
            <div
                onMouseDown={onMouseDown}
                className="card-header"
                style={{
                    backgroundColor: colors.colorHeader,
                }}
            >
                <DeleteButton noteId={note.id} />
            </div>
            <div className="card-body">
                <textarea
                    onKeyUp={onKeyUp}
                    onFocus={onFocus}
                    onInput={onInput}
                    ref={textAreaRef}
                    style={{ color: colors.colorText }}
                    defaultValue={body}
                ></textarea>
            </div>
        </div>
    );
};

export default NoteCard;
