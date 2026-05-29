import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const totalSales = await this.prisma.sale.count();
    const totalRevenue = await this.prisma.sale.aggregate({
      _sum: { totalAmount: true },
    });
    const totalPaid = await this.prisma.payment.aggregate({
      _sum: { amount: true },
    });
    const totalClients = await this.prisma.client.count();
    const totalVehicles = await this.prisma.vehicle.count({
      where: { available: true },
    });
    const totalLands = await this.prisma.land.count({
      where: { available: true },
    });
    const pendingInstallments = await this.prisma.installment.count({
      where: { status: 'PENDIENTE' },
    });
    const overdueInstallments = await this.prisma.installment.count({
      where: { status: 'VENCIDA' },
    });

    const overdueClients = await this.prisma.client.findMany({
      where: {
        sales: {
          some: {
            financing: {
              installments: {
                some: { status: 'VENCIDA' },
              },
            },
          },
        },
      },
      include: {
        sales: {
          include: {
            financing: {
              include: { installments: true },
            },
          },
        },
      },
    });

    return {
      totalSales,
      totalRevenue: Number(totalRevenue._sum.totalAmount) || 0,
      totalPaid: Number(totalPaid._sum.amount) || 0,
      pendingDebt: (Number(totalRevenue._sum.totalAmount) || 0) - (Number(totalPaid._sum.amount) || 0),
      totalClients,
      availableVehicles: totalVehicles,
      availableLands: totalLands,
      pendingInstallments,
      overdueInstallments,
      overdueClients,
    };
  }
}
