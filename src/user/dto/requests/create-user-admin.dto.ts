import { Role } from '@prisma/client';
import { IsString, MinLength } from 'class-validator';

export class CreateUserAdmin {
  @IsString()
  @MinLength(4)
  name: string;

  @IsString()
  @MinLength(6)
  password: string;

  role: Role;

  constructor() {
    this.role = Role.ADMIN;
  }
}
