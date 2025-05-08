import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTournamentDto } from './dto/response/create-tournament.dto';
import { JoinTournamentDto } from './dto/response/join-tournament.dto';
import { AssignPrizeDto } from './dto/response/assign-prize.dto';
import { UpdatePointsDto } from './dto/response/update-points.dto';
import { TournamentWithPrizesDto } from './dto/response/tournament-with-prizes.dto';
import { TournamentMapperService } from './dto/mapper/tournament-mapper.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class TournamentsService {
  constructor(
    private readonly prisma: PrismaService,
    private tournamentMapperService: TournamentMapperService,
  ) {}

  createTournament(dto: CreateTournamentDto) {
    return this.prisma.tournament.create({
      data: {
        name: dto.name,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
      },
    });
  }

  async getTournaments() {
    return this.prisma.tournament.findMany();
  }

  joinTournament(tournamentId: number, dto: JoinTournamentDto) {
    return this.prisma.tournamentUser.create({
      data: {
        userId: dto.userId,
        tournamentId,
      },
    });
  }

  assignPrize(tournamentId: number, dto: AssignPrizeDto) {
    return this.prisma.tournamentPrize.create({
      data: {
        tournamentId,
        prizeId: dto.prizeId,
        position: dto.position,
      },
    });
  }

  updatePoints(tournamentId: number, userId: number, dto: UpdatePointsDto) {
    return this.prisma.tournamentUser.updateMany({
      where: { tournamentId, userId },
      data: { points: dto.points },
    });
  }

  getTournamentRanking(tournamentId: number) {
    return this.prisma.tournamentUser.findMany({
      where: { tournamentId },
      include: { user: true },
      orderBy: { points: 'desc' },
    });
  }

  async getTournamentPrizes(
    tournamentId: number,
  ): Promise<TournamentWithPrizesDto> {
    const tournament = await this.prisma.tournament.findUnique({
      where: { id: tournamentId },
      include: {
        prizes: {
          orderBy: {
            position: 'asc',
          },
          include: {
            prize: true,
          },
        },
      },
    });

    if (!tournament) {
      throw new NotFoundException(
        `Tournament with ID ${tournamentId} not found`,
      );
    }

    return this.tournamentMapperService.mapToTournamentWithPrizesDto(
      tournament,
      tournament.prizes,
    );
  }

  async getTournamentParticipants(tournamentId: number) {
    const participants = await this.prisma.tournamentUser.findMany({
      where: { tournamentId },
      include: {
        user: true,
      },
      orderBy: {
        points: 'desc',
      },
    });

    return participants.map((participant) => ({
      id: participant.user.id,
      name: participant.user.name,
      points: participant.points,
    }));
  }

  async getTournamentUsersAndPrizes(tournamentId: number) {
    const tournament = await this.prisma.tournament.findUnique({
      where: { id: tournamentId },
      include: {
        participants: {
          orderBy: {
            points: 'desc',
          },
          include: {
            user: true,
          },
        },
        prizes: {
          orderBy: {
            position: 'asc',
          },
          include: {
            prize: true,
          },
        },
      },
    });

    if (!tournament) {
      throw new NotFoundException(
        `Tournament with ID ${tournamentId} not found`,
      );
    }

    return {
      ...tournament,
      participants: tournament.participants.map((p) => ({
        id: p.user.id,
        name: p.user.name.replace(/[_\d]+$/, ''),
        points: p.points,
      })),
      prizes: tournament.prizes.map((p) => ({
        position: p.position,
        prize: {
          id: p.prize.id,
          name: p.prize.name,
          value: p.prize.value,
          type: p.prize.type,
          customValue: p.prize.customValue,
        },
      })),
    };
  }

  async getAllTournamet() {
    const tournaments = await this.prisma.tournament.findMany();

    return tournaments.map(t=>{
      t.name = t.name.split("_")[0]
      return t;
    })
  }

  async updatePointsAndDeposits(
    data: { name: string; depositTotal: number; points: number }[],
    tournamentId: number,
  ) {
    for (const entry of data) {
      const { name, depositTotal, points } = entry;

      // Buscar usuario por nombre
      let user = await this.prisma.user.findUnique({ where: { name } });

      // Si no existe, crearlo
      if (!user) {
        const hashedPassword = await bcrypt.hash(name, 10);
        user = await this.prisma.user.create({
          data: {
            name,
            password: hashedPassword,
            role: 'CLIENT', // Asegurate de que 'CLIENT' sea un rol válido en tu sistema
          },
        });
      }

      // Actualizar el total de depósitos
      await this.prisma.user.update({
        where: { id: user.id },
        data: { depositTotal },
      });

      // Crear o actualizar participación en el torneo
      await this.prisma.tournamentUser.upsert({
        where: {
          userId_tournamentId: {
            userId: user.id,
            tournamentId,
          },
        },
        update: { points },
        create: {
          userId: user.id,
          tournamentId,
          points,
        },
      });
    }

    return { message: 'Actualización completa' };
  }


  async updateTournament(id: number, dto: CreateTournamentDto) {
    return this.prisma.tournament.update({
      where: { id },
      data: {
        name: dto.name,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
      },
    });
  }
  
}
