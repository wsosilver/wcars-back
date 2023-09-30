import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(id);
  }
}
