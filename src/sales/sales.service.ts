import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  async create(createSaleDto: CreateSaleDto, userId: number) {
    return this.prisma.sale.create({
      data: {
        ...createSaleDto,
        userId,
      },
      include: {
        client: true,
        seller: true,
        vehicle: true,
        land: true,
        user: true,
        financing: true,
        payments: true,
      },
    });
  }

  async findAll() {
    return this.prisma.sale.findMany({
      include: {
        client: true,
        seller: true,
        vehicle: true,
        land: true,
        user: true,
        financing: true,
        payments: true,
      },
    });
  }

  async findOne(id: number) {
    const sale = await this.prisma.sale.findUnique({
      where: { id },
      include: {
        client: true,
        seller: true,
        vehicle: true,
        land: true,
        user: true,
        financing: true,
        payments: true,
      },
    });
    if (!sale) {
      throw new NotFoundException(`Venta con ID ${id} no encontrada`);
    }
    return sale;
  }

  async update(id: number, updateSaleDto: UpdateSaleDto) {
    return this.prisma.sale.update({
      where: { id },
      data: updateSaleDto,
    });
  }

  async remove(id: number) {
    return this.prisma.sale.delete({ where: { id } });
  }
}
