import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CategoriasService } from './categorias.service';
import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Controller('api/v1/categorias')
export class CategoriasController {
    constructor(
        private readonly categoriaService: CategoriasService
    ){}

    @Post()
    @UsePipes(ValidationPipe)
    async criarCategoria(
        @Body() criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
        return await this.categoriaService.criarCategoria(criarCategoriaDto)
    }

    @Get()
    async consultarCategoria(): Promise<Array<Categoria>> {
      return await this.categoriaService.consultarTodasCategorias()
    }

    @Get('/:categoria')
    async consultarCategoriaPeloId (
        @Param('categoria') categoria: string 
    ): Promise<Categoria> {
        if (categoria) {
            return await this.categoriaService.consultarCategoriaPeloId(categoria)
        }
    }

    @Put('/:categoria')
    async atualizarCategoria (
      @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
      @Param('categoria') categoria: string
    ): Promise<void> {

        await this.categoriaService.atualizarCategoria(categoria, atualizarCategoriaDto)
    }
}
