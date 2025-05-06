// src/prizes/prize.module.ts
import { Module } from '@nestjs/common';
import { PrizeService } from './prize.service';
import { PrizeController } from './prize.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PrizeController],
  providers: [PrizeService],
  exports: [PrizeService],
})
export class PrizeModule {}
