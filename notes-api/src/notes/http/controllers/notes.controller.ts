import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { NotesService } from '../../application/services/note.service';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';

@Controller('/api/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}
  @Get()
  async getAllNotes() {
    return this.notesService.findAll();
  }
  @Post()
  async createNote(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateNote(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDTO: UpdateNoteDto,
  ) {
    await this.notesService.update(id, updateDTO);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteNote(@Param('id', ParseIntPipe) id: number) {
    await this.notesService.delete(id);
  }
}
