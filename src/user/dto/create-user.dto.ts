// src/user/dto/create-user.dto.ts
import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  name: string;

  @IsString()
  @MinLength(6)
  password: string;
}

