import api from "./client.ts"
import type {ApiNote, CreateNoteDto, UpdateNoteDto} from "../types/note.types.ts";

const NOTES_PATH = "/notes"

export const notesApi = {

    async getAllNotes(): Promise<ApiNote[]> {
        const response = await api.get(NOTES_PATH)
        return response.data
    },
    async createNote(noteData: CreateNoteDto): Promise<ApiNote> {
        const response = await api.post(NOTES_PATH, noteData)
        return response.data
    },
    async updateNote(id: number, noteData: UpdateNoteDto) {
        await api.patch(`${NOTES_PATH}/${id}`, noteData)
    },
    async deleteNote(id: number) {
        await api.delete(`${NOTES_PATH}/${id}`)
    }
}

