// src/tournaments/relations/tournament-prizes/tournament-prize.service.ts
import { Injectable } from '@nestjs/common';
import { CreateTournamentPrizeDto } from './dto/create-tournament-prize.dto';
import { UpdateTournamentPrizeDto } from './dto/update-tournament-prize.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TournamentPrizeService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateTournamentPrizeDto) {
    return this.prisma.tournamentPrize.create({
      data: {
        tournamentId: dto.tournamentId,
        prizeId: dto.prizeId,
        position: dto.position,
      },
    });
  }

  findByTournament(tournamentId: number) {
    return this.prisma.tournamentPrize.findMany({
      where: { tournamentId },
      include: { prize: true },
      orderBy: { position: 'asc' },
    });
  }

  update(id: number, dto: UpdateTournamentPrizeDto) {
    return this.prisma.tournamentPrize.update({
      where: { id },
      data: {
        position: dto.position,
        prizeId: dto.prizeId,
      },
    });
  }

  remove(id: number) {
    return this.prisma.tournamentPrize.delete({ where: { id } });
  }
}
