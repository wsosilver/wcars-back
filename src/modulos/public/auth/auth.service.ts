import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from 'src/modulos/usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async signIn(login: string, pass: string): Promise<any> {
    const user = await this.usuarioService.findOne(login);
    if (user?.senha !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
