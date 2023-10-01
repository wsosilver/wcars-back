import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CarrosService } from './carros.service';
import { CreateCarroDto } from './dto/create-carro.dto';
import { UpdateCarroDto } from './dto/update-carro.dto';
import { AuthGuard } from '../public/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from './config-multer/multer-config';

@Controller('carros')
export class CarrosController {
  constructor(private readonly carrosService: CarrosService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file', multerConfig))
  create(
    @Body() createCarroDto: CreateCarroDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.carrosService.create({
      nome: createCarroDto.nome,
      marca: createCarroDto.marca,
      modelo: createCarroDto.modelo,
      preco: +createCarroDto.preco,
      foto: file.filename,
    });
  }

  @Get()
  findAll(@Query() { page }) {
    return this.carrosService.findAll(+page);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file', multerConfig))
  update(
    @Param('id') id: string,
    @Body() updateCarroDto: UpdateCarroDto,

    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.carrosService.update(+id, {
      nome: updateCarroDto.nome,
      marca: updateCarroDto.marca,
      modelo: updateCarroDto.modelo,
      preco: +updateCarroDto.preco,
      foto: file?.filename || undefined,
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.carrosService.remove(+id);
  }
}
