import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { PasswordHelper } from '../../shared/helpers/password.helper';
@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async findOne(login: string): Promise<any> {
    const usuario = await this.prisma.usuario.findFirst({
      where: { login: login },
    });
    return usuario;
  }
  
  async create(usuario: CreateUsuarioDto): Promise<any> {
    await this.prisma.usuario.create({data: {
      nome: usuario.nome,
      login: usuario.login,
      senha: PasswordHelper.create(usuario.senha),
      sobrenome: usuario.sobrenome
      },
    });
    return { success: true, message: 'Usuário criado com sucesso.' };

  }
}
