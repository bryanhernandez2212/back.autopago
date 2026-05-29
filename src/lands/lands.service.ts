import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLandDto } from './dto/create-land.dto';
import { UpdateLandDto } from './dto/update-land.dto';

@Injectable()
export class LandsService {
  constructor(private prisma: PrismaService) {}

  async create(createLandDto: CreateLandDto) {
    return this.prisma.land.create({ data: createLandDto });
  }

  async findAll() {
    return this.prisma.land.findMany({
      include: { sales: true },
    });
  }

  async findOne(id: number) {
    const land = await this.prisma.land.findUnique({
      where: { id },
      include: { sales: true },
    });
    if (!land) {
      throw new NotFoundException(`Terreno con ID ${id} no encontrado`);
    }
    return land;
  }

  async update(id: number, updateLandDto: UpdateLandDto) {
    return this.prisma.land.update({
      where: { id },
      data: updateLandDto,
    });
  }

  async remove(id: number) {
    return this.prisma.land.delete({ where: { id } });
  }
}
