import { Controller, Get, Param, UseGuards, Res } from '@nestjs/common';
import { PromissoryNotesService } from './promissory-notes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@ApiTags('promissory-notes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('promissory-notes')
export class PromissoryNotesController {
  constructor(private readonly promissoryNotesService: PromissoryNotesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los pagarés' })
  findAll() {
    return this.promissoryNotesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener pagaré por ID' })
  findOne(@Param('id') id: string) {
    return this.promissoryNotesService.findOne(+id);
  }

  @Get(':id/download')
  @ApiOperation({ summary: 'Descargar PDF del pagaré' })
  async download(@Param('id') id: string, @Res() res: Response) {
    const promissoryNote = await this.promissoryNotesService.findOne(+id);
    const filePath = promissoryNote.pdfPath;
    if (fs.existsSync(filePath)) {
      res.download(filePath, path.basename(filePath));
    } else {
      res.status(404).json({ message: 'Archivo PDF no encontrado' });
    }
  }
}
