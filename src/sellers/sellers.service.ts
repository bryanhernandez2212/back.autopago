import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';

@Injectable()
export class SellersService {
  constructor(private prisma: PrismaService) {}

  async create(createSellerDto: CreateSellerDto) {
    return this.prisma.seller.create({ data: createSellerDto });
  }

  async findAll() {
    return this.prisma.seller.findMany({
      include: { sales: true },
    });
  }

  async findOne(id: number) {
    const seller = await this.prisma.seller.findUnique({
      where: { id },
      include: { sales: true },
    });
    if (!seller) {
      throw new NotFoundException(`Vendedor con ID ${id} no encontrado`);
    }
    return seller;
  }

  async update(id: number, updateSellerDto: UpdateSellerDto) {
    return this.prisma.seller.update({
      where: { id },
      data: updateSellerDto,
    });
  }

  async remove(id: number) {
    return this.prisma.seller.delete({ where: { id } });
  }
}
