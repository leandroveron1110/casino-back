// src/users/dto/user.dto.ts
import { IsString, IsNumber, IsEnum } from 'class-validator';
import { Role } from '@prisma/client';

export class UserDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsEnum(Role)
  role: Role;

  @IsNumber()
  depositTotal: number;
}
