import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('✅ Conectado a la base de datos PostgreSQL');
    } catch (error) {
      console.warn('⚠️ No se pudo conectar a PostgreSQL. La API funcionará pero las operaciones de BD fallarán.');
      console.warn('💡 Configura tu BD en el archivo .env y ejecuta npx prisma migrate dev');
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
