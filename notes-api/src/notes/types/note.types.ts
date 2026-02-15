export type NotePosition = {
  x: number;
  y: number;
};

export type Note = {
  id: number;
  body: string;
  colorsTheme: string;
  position: NotePosition;
};
