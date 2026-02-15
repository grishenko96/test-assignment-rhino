import { Injectable, NotFoundException } from '@nestjs/common';
import { NotesRepository } from '../../infrastructure/repositories/notes.repository';
import { Note } from '../../types/note.types';
import { NoteMapper } from '../../infrastructure/mappers/note.mapper';
import { CreateNoteDto } from '../../http/dto/create-note.dto';
import { UpdateNoteDto } from '../../http/dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private readonly notesRepository: NotesRepository) {}

  async findAll(): Promise<Note[]> {
    const notes = await this.notesRepository.findAll();
    return NoteMapper.toNotes(notes);
  }

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const entity = await this.notesRepository.create(
      NoteMapper.fromCreateDto(createNoteDto),
    );
    return NoteMapper.toNote(entity);
  }

  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<void> {
    const updated = await this.notesRepository.update(
      id,
      NoteMapper.fromUpdateDto(updateNoteDto),
    );

    if (!updated) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }
  }

  async delete(id: number): Promise<void> {
    const result = await this.notesRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }
  }
}
