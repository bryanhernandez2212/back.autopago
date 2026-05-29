import { Module } from '@nestjs/common';
import { PromissoryNotesService } from './promissory-notes.service';
import { PromissoryNotesController } from './promissory-notes.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PromissoryNotesController],
  providers: [PromissoryNotesService],
  exports: [PromissoryNotesService],
})
export class PromissoryNotesModule {}
