// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';  // Asegúrate de importar el módulo de usuario

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secretKey', // Cambia esta clave por una más segura
      signOptions: { expiresIn: '30d' }, // El token expirará en 1 hora
    }),
    UserModule, // Para acceder al servicio de usuarios
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
