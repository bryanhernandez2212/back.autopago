import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PromissoryNotesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.promissoryNote.findMany({
      include: { installment: { include: { financing: true } } },
    });
  }

  async findOne(id: number) {
    const promissoryNote = await this.prisma.promissoryNote.findUnique({
      where: { id },
      include: { installment: { include: { financing: true } } },
    });
    if (!promissoryNote) {
      throw new NotFoundException(`Pagaré con ID ${id} no encontrado`);
    }
    return promissoryNote;
  }
}
