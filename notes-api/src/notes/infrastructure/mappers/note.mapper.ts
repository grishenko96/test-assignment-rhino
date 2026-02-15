import { NoteEntity } from '../entities/note.entity';
import type { Note } from '../../types/note.types';
import { CreateNoteDto } from '../../http/dto/create-note.dto';
import { UpdateNoteDto } from '../../http/dto/update-note.dto';

export class NoteMapper {
  static toNote(entity: NoteEntity): Note {
    return {
      id: entity.id,
      body: entity.body,
      colorsTheme: entity.colorsTheme,
      position: entity.position,
    };
  }

  static toNotes(entities: NoteEntity[]): Note[] {
    return entities.map((entity) => this.toNote(entity));
  }

  static fromCreateDto(
    dto: CreateNoteDto,
  ): Pick<NoteEntity, 'body' | 'colorsTheme' | 'position'> {
    return {
      body: dto.body,
      colorsTheme: dto.colorsTheme,
      position: dto.position,
    };
  }

  static fromUpdateDto(
    dto: UpdateNoteDto,
  ): Partial<Pick<NoteEntity, 'body' | 'colorsTheme' | 'position'>> {
    const update: Partial<
      Pick<NoteEntity, 'body' | 'colorsTheme' | 'position'>
    > = {};

    if (dto.body !== undefined) {
      update.body = dto.body;
    }
    if (dto.colorsTheme !== undefined) {
      update.colorsTheme = dto.colorsTheme;
    }
    if (dto.position !== undefined) {
      update.position = dto.position;
    }

    return update;
  }
}
