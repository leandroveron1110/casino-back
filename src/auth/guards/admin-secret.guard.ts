import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminSecretGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const adminSecret = request.headers['x-admin-secret'];
    console.log("secret admin",adminSecret)

    // Verificar si la clave secreta es la correcta
    return adminSecret === process.env.ADMIN_SECRET_KEY;
  }
}
