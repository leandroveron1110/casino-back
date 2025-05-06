// src/app.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { TournamentsModule } from './tournaments/tournaments.module';
import { PrizeModule } from './prizes/prize.module';


@Module({
  imports: [AuthModule, UserModule, TournamentsModule, PrizeModule],
  providers: [PrismaService],
})
export class AppModule {}
