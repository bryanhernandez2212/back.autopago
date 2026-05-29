import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFinancingDto } from './dto/create-financing.dto';
import { UpdateFinancingDto } from './dto/update-financing.dto';
import PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FinancingsService {
  constructor(private prisma: PrismaService) {}

  async create(createFinancingDto: CreateFinancingDto) {
    const remainingBalance = createFinancingDto.totalAmount - createFinancingDto.downPayment;
    const numberOfPayments = Math.ceil(remainingBalance / createFinancingDto.monthlyPayment);
    
    const financing = await this.prisma.financing.create({
      data: {
        saleId: createFinancingDto.saleId,
        downPayment: createFinancingDto.downPayment,
        monthlyPayment: createFinancingDto.monthlyPayment,
        remainingBalance,
        numberOfPayments,
        firstPaymentDate: new Date(createFinancingDto.firstPaymentDate),
      },
    });

    const installments = [];
    for (let i = 1; i <= numberOfPayments; i++) {
      const dueDate = new Date(createFinancingDto.firstPaymentDate);
      dueDate.setMonth(dueDate.getMonth() + (i - 1));
      
      let amount = createFinancingDto.monthlyPayment;
      if (i === numberOfPayments) {
        amount = remainingBalance - (numberOfPayments - 1) * createFinancingDto.monthlyPayment;
      }
      
      const installment = await this.prisma.installment.create({
        data: {
          financingId: financing.id,
          installmentNumber: i,
          amount,
          dueDate,
          status: 'PENDIENTE',
        },
      });
      
      const promissoryNotePdfPath = await this.generatePromissoryNotePdf(
        installment,
        createFinancingDto.saleId,
        i,
      );
      
      await this.prisma.promissoryNote.create({
        data: {
          installmentId: installment.id,
          noteNumber: `PN-${financing.id}-${i}`,
          amount,
          dueDate,
          status: 'PENDIENTE',
          pdfPath: promissoryNotePdfPath,
        },
      });
      
      installments.push(installment);
    }

    return this.prisma.financing.findUnique({
      where: { id: financing.id },
      include: {
        sale: {
          include: { client: true, seller: true, vehicle: true, land: true },
        },
        installments: { include: { payment: true, promissoryNote: true } },
      },
    });
  }

  async findAll() {
    return this.prisma.financing.findMany({
      include: {
        sale: { include: { client: true, seller: true } },
        installments: { include: { payment: true, promissoryNote: true } },
      },
    });
  }

  async findOne(id: number) {
    const financing = await this.prisma.financing.findUnique({
      where: { id },
      include: {
        sale: { include: { client: true, seller: true, vehicle: true, land: true } },
        installments: { include: { payment: true, promissoryNote: true } },
      },
    });
    if (!financing) {
      throw new NotFoundException(`Financiamiento con ID ${id} no encontrado`);
    }
    return financing;
  }

  async update(id: number, updateFinancingDto: UpdateFinancingDto) {
    return this.prisma.financing.update({
      where: { id },
      data: updateFinancingDto,
    });
  }

  async remove(id: number) {
    return this.prisma.financing.delete({ where: { id } });
  }

  private async generatePromissoryNotePdf(installment: any, saleId: number, installmentNumber: number): Promise<string> {
    const uploadsDir = path.join(process.cwd(), 'uploads', 'promissory-notes');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const fileName = `promissory-note-${saleId}-${installmentNumber}-${Date.now()}.pdf`;
    const filePath = path.join(uploadsDir, fileName);

    const sale = await this.prisma.sale.findUnique({
      where: { id: saleId },
      include: { client: true, seller: true, vehicle: true, land: true },
    });

    const doc = new PDFDocument({ margin: 50 });
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    doc.fontSize(20).text('PAGARÉ', { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(12).text(`Número de Pagaré: PN-${saleId}-${installmentNumber}`, { align: 'left' });
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-MX')}`);
    doc.text(`Ciudad: [Ciudad]`);
    doc.moveDown();

    doc.text(`Por este pagaré, me obligo incondicionalmente a pagar a la orden de:`);
    doc.moveDown();
    doc.fontSize(14).text(sale?.seller?.name || 'Vendedor', { align: 'center' });
    doc.fontSize(12).moveDown();

    doc.text(`La cantidad de: $${installment.amount.toFixed(2)}`);
    doc.text(`Monto en letras: [MONTO EN LETRAS]`);
    doc.moveDown();

    doc.text(`Esta cantidad será pagada el día: ${installment.dueDate.toLocaleDateString('es-MX')}`);
    doc.moveDown();

    if (sale?.vehicle) {
      doc.text(`Vehículo: ${sale.vehicle.brand} ${sale.vehicle.model} ${sale.vehicle.year}`);
      doc.text(`VIN: ${sale.vehicle.vin || 'N/A'}`);
    }
    if (sale?.land) {
      doc.text(`Terreno: ${sale.land.location}`);
      doc.text(`Medidas: ${sale.land.measurements || 'N/A'}`);
    }
    doc.moveDown();

    doc.text('Acepto y firmo:', { align: 'right' });
    doc.moveDown(2);
    doc.text('_________________________', { align: 'right' });
    doc.text(sale?.client?.name || 'Cliente', { align: 'right' });

    doc.end();

    return new Promise((resolve, reject) => {
      writeStream.on('finish', () => resolve(filePath));
      writeStream.on('error', reject);
    });
  }
}
