import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteEntity } from '../entities/note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotesRepository {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly repository: Repository<NoteEntity>,
  ) {}

  async findAll(): Promise<NoteEntity[]> {
    return this.repository.find({
      order: { updatedAt: 'DESC' },
    });
  }

  async create(note: Pick<NoteEntity, 'body' | 'colorsTheme' | 'position'>) {
    const entity = this.repository.create(note);
    return this.repository.save(entity);
  }

  async update(
    id: number,
    update: Partial<Pick<NoteEntity, 'body' | 'colorsTheme' | 'position'>>,
  ): Promise<NoteEntity | null> {
    const entity = await this.repository.preload({ id, ...update });
    if (!entity) {
      return null;
    }
    return this.repository.save(entity);
  }

  async delete(id: number) {
    return this.repository.softDelete({ id });
  }
}
