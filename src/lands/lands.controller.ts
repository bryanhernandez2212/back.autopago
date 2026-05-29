import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LandsService } from './lands.service';
import { CreateLandDto } from './dto/create-land.dto';
import { UpdateLandDto } from './dto/update-land.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('lands')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('lands')
export class LandsController {
  constructor(private readonly landsService: LandsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nuevo terreno' })
  create(@Body() createLandDto: CreateLandDto) {
    return this.landsService.create(createLandDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los terrenos' })
  findAll() {
    return this.landsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener terreno por ID' })
  findOne(@Param('id') id: string) {
    return this.landsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar terreno' })
  update(@Param('id') id: string, @Body() updateLandDto: UpdateLandDto) {
    return this.landsService.update(+id, updateLandDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar terreno' })
  remove(@Param('id') id: string) {
    return this.landsService.remove(+id);
  }
}
