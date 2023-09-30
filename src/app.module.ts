import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './modulos/usuario/usuario.module';
import { AuthModule } from './modulos/public/auth/auth.module';

@Module({
  imports: [UsuarioModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
