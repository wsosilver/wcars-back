import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
// import { CreateUsuarioDto } from './dto/create-usuario.dto';
// import { UpdateUsuarioDto } from './dto/update-usuario.dto';
// import { carros, Prisma } from '@prisma/client';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async findOne(login: string): Promise<any> {
    const usuario = await this.prisma.usuario.findFirst({
      where: { login: login  },
    });
    return usuario;
  }
}
