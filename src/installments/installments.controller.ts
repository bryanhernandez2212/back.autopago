import { Controller, Get, Param, Patch, Body, UseGuards } from '@nestjs/common';
import { InstallmentsService } from './installments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

class UpdateInstallmentStatusDto {
  @ApiProperty({ enum: ['PENDIENTE', 'PAGADA', 'VENCIDA'] })
  @IsIn(['PENDIENTE', 'PAGADA', 'VENCIDA'])
  status: string;
}

@ApiTags('installments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('installments')
export class InstallmentsController {
  constructor(private readonly installmentsService: InstallmentsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las mensualidades' })
  findAll() {
    return this.installmentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener mensualidad por ID' })
  findOne(@Param('id') id: string) {
    return this.installmentsService.findOne(+id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Actualizar estado de mensualidad' })
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateInstallmentStatusDto,
  ) {
    return this.installmentsService.updateStatus(+id, updateStatusDto.status);
  }
}
