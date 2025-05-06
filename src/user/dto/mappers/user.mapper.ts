// src/users/mappers/user.mapper.ts
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserDto } from '../requests/user.dto';

@Injectable()
export class UserMapper {
  toDto(user: User): UserDto {
    return {
      id: user.id,
      name: user.name,
      role: user.role,
      depositTotal: user.depositTotal,
    };
  }

  toDtoMany(users: User[]): UserDto[] {
    return users.map(user => this.toDto(user));
  }
}
