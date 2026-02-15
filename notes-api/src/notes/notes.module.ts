import { Module } from '@nestjs/common';
import { NotesController } from './http/controllers/notes.controller';
import { NotesService } from './application/services/note.service';
import { NotesRepository } from './infrastructure/repositories/notes.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from './infrastructure/entities/note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NoteEntity])],
  controllers: [NotesController],
  providers: [NotesService, NotesRepository],
})
export class NotesModule {}
