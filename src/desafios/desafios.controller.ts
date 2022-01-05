import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { DesafiosService } from './desafios.service';
import { Body, Controller, Get, Logger, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Desafio } from './interfaces/desafio.interface';

@Controller('api/v1/desafios')
export class DesafiosController {

    constructor(
        private readonly desafioService: DesafiosService
    ) {}

    private readonly logger = new Logger(DesafiosController.name)

    @Post()
    @UsePipes(ValidationPipe)
    async criarDesafio(
        @Body() criarDesafioDto: CriarDesafioDto
    ): Promise<Desafio> {
        this.logger.log(`criarDesafios: ${JSON.stringify(criarDesafioDto)}`)
        return await this.desafioService.criarDesafio(criarDesafioDto)
    }

    @Get()
    async consultarDesafios(
        @Query('idJogador') _id: string): Promise<Array<Desafio>> {
        return _id ? await this.desafioService.consultarDesafiosDeUmJogador(_id) 
        : await this.desafioService.consultarTodosDesafios()
    }


}
