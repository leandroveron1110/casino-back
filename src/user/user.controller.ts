import {
  Controller,
  Post,
  Body,
  UseGuards,
  Put,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto'; // Asumimos que tienes un DTO para actualizar un usuario
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { AdminSecretGuard } from 'src/auth/guards/admin-secret.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post('admin')
  @UseGuards(AdminSecretGuard)
  async createAdmin(@Body() createUserDto: CreateUserDto) {
    console.log("create admin")
    return this.userService.createAdmin(createUserDto);
  }

  // Ruta para crear un nuevo usuario
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log("create user")
    return this.userService.create(createUserDto);
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post("many")
  async createManyUsers(@Body() createUserDto: CreateUserDto[]) {
    console.log("create user may")
    return this.userService.createManyUsers(createUserDto);
  }



  // Ruta para obtener todos los usuarios (solo administradores pueden ver esto)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  // Ruta para obtener un usuario por nombre
  @Get(':name')
  async findOne(@Param('name') name: string) {
    return this.userService.findOneByName(name);
  }

  @Get('tournaments/:id')
  async getUserTournaments(@Param('id') id: string) {
    return this.userService.getUserWithTournamentRankings(Number(id));
  }

  // Ruta para actualizar un usuario
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  // Ruta para eliminar un usuario por ID
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
