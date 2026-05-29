import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InstallmentsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.installment.findMany({
      include: { financing: true, payment: true, promissoryNote: true },
    });
  }

  async findOne(id: number) {
    const installment = await this.prisma.installment.findUnique({
      where: { id },
      include: { financing: true, payment: true, promissoryNote: true },
    });
    if (!installment) {
      throw new NotFoundException(`Mensualidad con ID ${id} no encontrada`);
    }
    return installment;
  }

  async updateStatus(id: number, status: string) {
    return this.prisma.installment.update({
      where: { id },
      data: { status },
    });
  }

  async checkOverdueInstallments() {
    const now = new Date();
    await this.prisma.installment.updateMany({
      where: {
        dueDate: { lt: now },
        status: 'PENDIENTE',
      },
      data: { status: 'VENCIDA' },
    });
  }
}
