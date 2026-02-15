 export type NotePosition = {
    x: number
    y: number
}

export type ApiNote = {
    id: number
    body: string
    colorsTheme: string
    position: NotePosition
}
export type NoteColors = {
    id: string,
    colorHeader: string,
    colorBody: string,
    colorText: string,
 }
 export type Note = ApiNote & {
     colors: NoteColors;
 };


export type CreateNoteDto = Omit<ApiNote, 'id'>

export type UpdateNoteDto = Partial<Omit<ApiNote, 'id'>>
