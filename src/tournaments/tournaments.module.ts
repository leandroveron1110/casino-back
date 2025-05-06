import { Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TournamentUserModule } from '../relations/tournament-user/tournament-user.module';
import { TournamentPrizeModule } from '../relations/tournament-prizes/tournament-prize.module';
import { TournamentMapperService } from './dto/mapper/tournament-mapper.service';

@Module({
  imports: [PrismaModule, TournamentUserModule, TournamentPrizeModule],
  controllers: [TournamentsController],
  providers: [TournamentsService, TournamentMapperService],
})
export class TournamentsModule {}
