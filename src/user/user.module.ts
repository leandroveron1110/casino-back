// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Importa el módulo, no el servicio
import { UserMapper } from './dto/mappers/user.mapper';

@Module({
  imports: [PrismaModule], // 👈 acá IMPORTAS PrismaModule
  providers: [UserService, UserMapper],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
