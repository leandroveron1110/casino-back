// src/tournaments/relations/tournament-users/tournament-user.service.ts
import { Injectable } from '@nestjs/common';

import { CreateTournamentUserDto } from './dto/create-tournament-user.dto';
import { UpdateTournamentUserDto } from './dto/update-tournament-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TournamentUserService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateTournamentUserDto) {
    return this.prisma.tournamentUser.create({
      data: {
        tournamentId: dto.tournamentId,
        userId: dto.userId,
        points: dto.points ?? 0,
      },
    });
  }

  findByTournament(tournamentId: number) {
    return this.prisma.tournamentUser.findMany({
      where: { tournamentId },
      include: { user: true },
      orderBy: { points: 'desc' },
    });
  }

  findByUser(userId: number) {
    return this.prisma.tournamentUser.findMany({
      where: { userId },
      include: { tournament: true },
    });
  }

  updatePoints(id: number, points: number) {
    return this.prisma.tournamentUser.update({
      where: { id },
      data: { points },
    });
  }

  async actualizarPuntosMasivamente(tournamentId: number, usuarios: UpdateTournamentUserDto[]) {
    // 1. Obtener todos los usuarios en una sola consulta
    const nombres = usuarios.map(u => u.user);

    const users = await this.prisma.user.findMany({
      where: { name: { in: nombres } },
      select: { id: true, name: true },
    });

    const nameToId = new Map(users.map(u => [u.name, u.id]));

    // 2. Preparar todas las actualizaciones que sí tienen userId
    const actualizaciones = usuarios
      .map(({ user, points }) => {
        const userId = nameToId.get(user);
        if (!userId) return null; // Usuario no encontrado
        return this.prisma.tournamentUser.updateMany({
          where: { userId, tournamentId },
          data: { points: points },
        });
      })
      .filter(Boolean); // Quita los null

    return Promise.all(actualizaciones);
  }

  remove(id: number) {
    return this.prisma.tournamentUser.delete({ where: { id } });
  }

  // Extra: obtener ranking completo
  getRanking(tournamentId: number) {
    return this.findByTournament(tournamentId);
  }
}
