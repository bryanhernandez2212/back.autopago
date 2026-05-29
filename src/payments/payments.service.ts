import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async create(createPaymentDto: CreatePaymentDto, userId: number) {
    const payment = await this.prisma.payment.create({
      data: {
        ...createPaymentDto,
        userId,
      },
      include: {
        sale: true,
        installment: true,
        user: true,
      },
    });

    if (createPaymentDto.installmentId) {
      await this.prisma.installment.update({
        where: { id: createPaymentDto.installmentId },
        data: { status: 'PAGADA' },
      });

      const promissoryNote = await this.prisma.promissoryNote.findUnique({
        where: { installmentId: createPaymentDto.installmentId },
      });
      if (promissoryNote) {
        await this.prisma.promissoryNote.update({
          where: { id: promissoryNote.id },
          data: { status: 'PAGADO' },
        });
      }
    }

    return payment;
  }

  async findAll() {
    return this.prisma.payment.findMany({
      include: {
        sale: true,
        installment: true,
        user: true,
      },
    });
  }

  async findOne(id: number) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: {
        sale: true,
        installment: true,
        user: true,
      },
    });
    if (!payment) {
      throw new NotFoundException(`Pago con ID ${id} no encontrado`);
    }
    return payment;
  }
}
