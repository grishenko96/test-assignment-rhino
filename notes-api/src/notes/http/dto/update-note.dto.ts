import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { NotePositionDto } from './note-position.dto';
import { Type } from 'class-transformer';
import { NoteColorTheme } from '../../types/note-color.enum';

export class UpdateNoteDto {
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  body?: string;
  @IsOptional()
  @IsEnum(NoteColorTheme)
  colorsTheme?: NoteColorTheme;
  @IsOptional()
  @ValidateNested()
  @Type(() => NotePositionDto)
  position?: NotePositionDto;
}
