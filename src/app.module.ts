import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './modulos/usuario/usuario.module';
import { AuthModule } from './modulos/public/auth/auth.module';
import { CarrosModule } from './modulos/carros/carros.module';

@Module({
  imports: [UsuarioModule, AuthModule, CarrosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
