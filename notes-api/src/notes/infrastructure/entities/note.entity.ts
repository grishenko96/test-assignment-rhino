import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { NotePosition } from '../../types/note.types';
import { NoteColorTheme } from '../../types/note-color.enum';

@Entity('notes')
export class NoteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 1000,
  })
  body: string;

  @Column({ name: 'colors_theme', type: 'enum', enum: NoteColorTheme })
  colorsTheme: NoteColorTheme;

  @Column('jsonb')
  position: NotePosition;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
