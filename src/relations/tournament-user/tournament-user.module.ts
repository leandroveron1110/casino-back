// src/tournaments/relations/tournament-users/tournament-user.module.ts
import { Module } from '@nestjs/common';
import { TournamentUserService } from './tournament-user.service';
import { TournamentUserController } from './tournament-user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  imports: [PrismaModule],
  controllers: [TournamentUserController],
  providers: [TournamentUserService],
  exports: [TournamentUserService],
})
export class TournamentUserModule {}
