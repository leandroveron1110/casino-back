import { Role } from "@prisma/client";

// src/auth/jwt-payload.interface.ts
export interface JwtPayload {
  sub: string;  // Puede ser el ID del usuario
  rol: Role;
  }
  