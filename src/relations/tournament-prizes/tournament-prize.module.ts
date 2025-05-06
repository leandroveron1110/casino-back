// src/tournaments/relations/tournament-prizes/tournament-prize.module.ts
import { Module } from '@nestjs/common';
import { TournamentPrizeService } from './tournament-prize.service';
import { TournamentPrizeController } from './tournament-prize.controller';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  imports: [PrismaModule],
  controllers: [TournamentPrizeController],
  providers: [TournamentPrizeService],
  exports: [TournamentPrizeService],
})
export class TournamentPrizeModule {}
