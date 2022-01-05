import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { DesafiosService } from './desafios.service';
import { Body, Controller, Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common';
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

}
