import { BadRequestException, Logger } from '@nestjs/common';
import { CategoriasService } from './../categorias/categorias.service';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { Desafio } from './interfaces/desafio.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { DesafioStatus } from './interfaces/desafio-status.enum';


@Injectable()
export class DesafiosService {
    constructor(
        @InjectModel('Desafio') private readonly desafioModel: Model<Desafio>,
        @InjectModel('Partida') private readonly partidaModel: Model<Partida>,
        private readonly jogadoresService: JogadoresService,
        private readonly categoriasService: CategoriasService
    ) {}

    private readonly logger = new Logger(DesafiosService.name)

    async criarDesafio(criarDesafioDto: CriarDesafioDto): Promise<Desafio> {
      const jogadores = await this.jogadoresService.consultarTodosJogadores()

      criarDesafioDto.jogadores.map(jogadorDto => {
          const jogadorFilter = jogadores.filter( jogador => jogador.id == jogadorDto.id)

          if (jogadorFilter.length == 0) {
              throw new BadRequestException(`0 id ${jogadorDto.id} não é um jogador`)
          }
      })

      const solicitanteEhJogadorDaPartida = criarDesafioDto.jogadores.filter(jogador => jogador.id == criarDesafioDto.solicitante)

      this.logger.log(`solicitanteEhJogadorDaPartida: ${solicitanteEhJogadorDaPartida}`)

      if (solicitanteEhJogadorDaPartida.length == 0) {
          throw new BadRequestException(`0 solicitante deve ser um jogador da partida!`)
      }

      const categoriaDoJogador = await this.categoriasService.consultarCategoriaDoJogador(criarDesafioDto.solicitante)

      if (!categoriaDoJogador) {
          throw new BadRequestException('O solicitante precisa estar registrado em uma categoria')
      }

      const desafioCriado = new this.desafioModel(criarDesafioDto)
      desafioCriado.categoria = categoriaDoJogador.categoria
      desafioCriado.dataHoraSolicitacao = new Date()
      this.logger.log(`desafioCriado.dataHoraSolicitacao: ${desafioCriado.dataHoraSolicitacao}`)

      desafioCriado.status = DesafioStatus.PENDENTE
      this.logger.log(`desafioCriado: ${JSON.stringify(desafioCriado)}`)
      return await desafioCriado.save()
    }

    async consultarTodosDesafios(): Promise<Array<Desafio>> {
        return await this.desafioModel.find()
        .populate("solicitante")
        .populate("jogadores")
        .populate("partida")
        .exec()
    }

    async consultarDesafiosDeUmJogador(_id: any): Promise<Array<Desafio>> {

       const jogadores = await this.jogadoresService.consultarTodosJogadores()

        const jogadorFilter = jogadores.filter( jogador => jogador._id == _id )

        if (jogadorFilter.length == 0) {
            throw new BadRequestException(`O id ${_id} não é um jogador!`)
        }

        return await this.desafioModel.find()
        .where('jogadores')
        .in(_id)
        .populate("solicitante")
        .populate("jogadores")
        .populate("partida")
        .exec()

    }
}
