// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service'; // Servicio de usuario para validación
import { JwtPayload } from './jwt-payload.interface'; // Crea una interfaz para el payload
import { LoginDto } from './dto/login.dto';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByName(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: LoginDto) {
    const userLogin = await this.validateUser(user.name, user.password);
    if (userLogin) {
      const { password, ...safeUser } = userLogin; // Excluye el campo password
  
      const payload: JwtPayload = { sub: user.name, rol: Role.CLIENT };
  
      return {
        ...safeUser,
        access_token: this.jwtService.sign(payload),
      };
    }
  }
  

  async loginAdmin(user: LoginDto) {
    const userLogin = await this.validateUser(user.name, user.password);
    if (userLogin) {
      const { password, ...safeUser } = userLogin; // Excluye el campo password
  
      const payload: JwtPayload = { sub: user.name, rol: Role.ADMIN };
  
      return {
        ...safeUser,
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
