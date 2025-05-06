import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // El servicio Prisma para interactuar con la base de datos
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';
import { UserMapper } from './dto/mappers/user.mapper';
import { UserDto } from './dto/requests/user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private userMapper: UserMapper,
  ) {}

  // Crear un nuevo usuario
  async create(createUserDto: CreateUserDto) {
    // Verificar si ya existe un usuario con ese nombre
    const existingUser = await this.prisma.user.findUnique({
      where: { name: createUserDto.name },
    });
    if (existingUser) {
      throw new BadRequestException('El usuario ya existe');
    }

    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(createUserDto.name, 10);

    return this.prisma.user.create({
      data: {
        name: createUserDto.name,
        password: hashedPassword,
      },
    });
  }

  async createManyUsers(createUserDtos: CreateUserDto[]) {
    // 1. Obtener los nombres a crear
    const names = createUserDtos.map((dto) => dto.name);

    // 2. Buscar cuáles ya existen
    const existingUsers = await this.prisma.user.findMany({
      where: {
        name: { in: names },
      },
      select: { name: true },
    });

    const existingNames = new Set(existingUsers.map((user) => user.name));

    // 3. Filtrar los que no existen
    const usersToCreate = createUserDtos.filter(
      (dto) => !existingNames.has(dto.name),
    );

    // 4. Hashear contraseñas (usando el nombre como contraseña)
    const data = await Promise.all(
      usersToCreate.map(async (dto) => ({
        name: dto.name,
        password: await bcrypt.hash(dto.name, 10),
      })),
    );

    // 5. Crear usuarios en batch
    if (data.length > 0) {
      await this.prisma.user.createMany({ data });
    }

    // 6. Devolver resumen
    return {
      created: data.map((u) => u.name),
      skipped: Array.from(existingNames),
    };
  }

  // Crear un nuevo usuario
  async createAdmin(createUserDto: CreateUserDto) {
    // Verificar si ya existe un usuario con ese nombre
    const existingUser = await this.prisma.user.findUnique({
      where: { name: createUserDto.name },
    });
    if (existingUser) {
      throw new BadRequestException('El usuario ya existe');
    }

    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.prisma.user.create({
      data: {
        name: createUserDto.name,
        password: hashedPassword,
        role: Role.ADMIN,
      },
    });
  }

  // Buscar un usuario por su nombre
  async findOneByName(name: string) {
    const user = await this.prisma.user.findUnique({
      where: { name },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  async getUserWithTournamentRankings(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        tournamentData: {
          include: {
            tournament: {
              include: {
                participants: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user) throw new Error('Usuario no encontrado');

    // Mapear torneos con ranking
    const tournamentsWithRanking = user.tournamentData.map((tournamentUser) => {
      const { tournament, points } = tournamentUser;
      const sorted = [...tournament.participants].sort((a, b) => b.points - a.points);
      const position = sorted.findIndex((p) => p.userId === userId) + 1;

      return {
        tournamentId: tournament.id,
        tournamentName: tournament.name,
        startDate: tournament.startDate,
        endDate: tournament.endDate,
        userPoints: points,
        userRanking: position,
        totalParticipants: sorted.length,
      };
    });

    return {
      userId: user.id,
      userName: user.name,
      totalDeposits: user.depositTotal,
      tournaments: tournamentsWithRanking,
    };
  }

  // Buscar todos los usuarios
  async findAll(): Promise<UserDto[]> {
    const users = await this.prisma.user.findMany({
      where: {
        role: 'CLIENT',
      },
    });
    return this.userMapper.toDtoMany(users);
  }

  // Actualizar un usuario
  async update(name: string, user: Partial<CreateUserDto>) {
    try {
      // Verificar si el usuario existe
      const existingUser = await this.prisma.user.findUnique({
        where: { name },
      });

      if (!existingUser) {
        throw new NotFoundException('Usuario no encontrado');
      }

      // Si la contraseña fue proporcionada, la hasheamos antes de actualizar
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }

      const updatedUser = await this.prisma.user.update({
        where: { name },
        data: user,
      });

      return updatedUser;
    } catch (error) {
      throw new BadRequestException(
        'Error al actualizar el usuario: ' + error.message,
      );
    }
  }

  // Eliminar un usuario por ID
  async remove(id: number) {
    try {
      const user = await this.prisma.user.delete({
        where: { id },
      });
      return user;
    } catch (error) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }
}
