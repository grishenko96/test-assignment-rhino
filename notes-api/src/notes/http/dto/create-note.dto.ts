import { IsString, MaxLength, IsEnum, ValidateNested } from 'class-validator';
import { NotePositionDto } from './note-position.dto';
import { Type } from 'class-transformer';
import { NoteColorTheme } from '../../types/note-color.enum';

export class CreateNoteDto {
  @IsString()
  @MaxLength(1000)
  body: string;
  @IsEnum(NoteColorTheme)
  colorsTheme: NoteColorTheme;
  @ValidateNested()
  @Type(() => NotePositionDto)
  position: NotePositionDto;
}
