import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { SellersModule } from './sellers/sellers.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { LandsModule } from './lands/lands.module';
import { SalesModule } from './sales/sales.module';
import { FinancingsModule } from './financings/financings.module';
import { InstallmentsModule } from './installments/installments.module';
import { PaymentsModule } from './payments/payments.module';
import { PromissoryNotesModule } from './promissory-notes/promissory-notes.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ClientsModule,
    SellersModule,
    VehiclesModule,
    LandsModule,
    SalesModule,
    FinancingsModule,
    InstallmentsModule,
    PaymentsModule,
    PromissoryNotesModule,
    DashboardModule,
  ],
})
export class AppModule {}
