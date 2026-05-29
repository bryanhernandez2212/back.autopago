import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('sellers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nuevo vendedor' })
  create(@Body() createSellerDto: CreateSellerDto) {
    return this.sellersService.create(createSellerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los vendedores' })
  findAll() {
    return this.sellersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener vendedor por ID' })
  findOne(@Param('id') id: string) {
    return this.sellersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar vendedor' })
  update(@Param('id') id: string, @Body() updateSellerDto: UpdateSellerDto) {
    return this.sellersService.update(+id, updateSellerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar vendedor' })
  remove(@Param('id') id: string) {
    return this.sellersService.remove(+id);
  }
}
