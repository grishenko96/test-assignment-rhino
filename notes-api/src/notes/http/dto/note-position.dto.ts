import { IsNumber } from 'class-validator';

export class NotePositionDto {
  @IsNumber()
  x: number;
  @IsNumber()
  y: number;
}
