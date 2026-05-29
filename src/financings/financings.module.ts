import { Module } from '@nestjs/common';
import { FinancingsService } from './financings.service';
import { FinancingsController } from './financings.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FinancingsController],
  providers: [FinancingsService],
  exports: [FinancingsService],
})
export class FinancingsModule {}
