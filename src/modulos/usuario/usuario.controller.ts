import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { AuthGuard } from '../public/auth/auth.guard';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() user: CreateUsuarioDto) {
    return this.usuarioService.create(user);
  }
}
