import { Injectable } from '@nestjs/common';
import { CreateCarroDto } from './dto/create-carro.dto';
import { UpdateCarroDto } from './dto/update-carro.dto';
import { PrismaService } from 'src/prisma.service';
import { readFileSync } from 'fs';
@Injectable()
export class CarrosService {
  constructor(private prisma: PrismaService) {}

  async create(createCarroDto: CreateCarroDto) {
    await this.prisma.carros.create({
      data: {
        nome: createCarroDto.nome,
        marca: createCarroDto.marca,
        modelo: createCarroDto.modelo,
        preco: createCarroDto.preco,
        foto: createCarroDto.foto,
      },
    });
    return { success: true, message: 'Carro criado com sucesso.' };
  }

  async findAll(page: number) {
    const carros = await this.prisma.carros.findMany({
      skip: page ? (page - 1) * 10 : undefined,
      take: page ? 10 : undefined,
      where: { deleted_at: null },
      orderBy: { preco: 'desc' },
    });

    const carrosFormatados = carros.map((carro) => {
      const imgBase64 = readFileSync(
        `src/modulos/carros/imgs/${carro.foto}`,
        'base64',
      );
      return {
        ...carro,
        img: imgBase64,
      };
    });

    const countItens = await this.prisma.carros.count({
      where: { deleted_at: null },
    });
    const lastPage = Math.ceil(countItens / 2);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;
    const message: string = page > lastPage ? 'Pagina inexistente' : '';
    return {
      data: carrosFormatados,
      message: message,
      count: lastPage,
      currentPage: page,
      nextPage: nextPage,
      prevPage: prevPage,
      lastPage: lastPage,
    };
  }

  async update(id: number, updateCarroDto: UpdateCarroDto) {
    await this.prisma.carros.update({
      where: { id: id },
      data: {
        nome: updateCarroDto.nome,
        marca: updateCarroDto.marca,
        modelo: updateCarroDto.modelo,
        preco: +updateCarroDto.preco,
        foto: updateCarroDto.foto,
        updated_at: new Date(),
      },
    });
    return { success: true, message: 'Registro atualizado com sucesso.' };
  }

  async remove(id: number) {
    await this.prisma.carros.update({
      where: { id: id },
      data: {
        deleted_at: new Date(),
      },
    });
    return { success: true, message: 'Registro excluido com sucesso.' };
  }
}
