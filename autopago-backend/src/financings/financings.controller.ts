import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FinancingsService } from './financings.service';
import { CreateFinancingDto } from './dto/create-financing.dto';
import { UpdateFinancingDto } from './dto/update-financing.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('financings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('financings')
export class FinancingsController {
  constructor(private readonly financingsService: FinancingsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nuevo financiamiento' })
  create(@Body() createFinancingDto: CreateFinancingDto) {
    return this.financingsService.create(createFinancingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los financiamientos' })
  findAll() {
    return this.financingsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener financiamiento por ID' })
  findOne(@Param('id') id: string) {
    return this.financingsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar financiamiento' })
  update(@Param('id') id: string, @Body() updateFinancingDto: UpdateFinancingDto) {
    return this.financingsService.update(+id, updateFinancingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar financiamiento' })
  remove(@Param('id') id: string) {
    return this.financingsService.remove(+id);
  }
}
