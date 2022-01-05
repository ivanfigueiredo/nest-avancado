import { CriarJogadorDto } from './dtos/criar-jogador.dto'
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { Jogador } from './interfaces/jogador.interface'
import {  InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'


@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];

  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>
  ) {}

  private readonly logger  = new Logger(JogadoresService.name)

  async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { email } = criarJogadorDto
    const jogadorEncontrado = await this.jogadorModel.findOne({ email })
    if (jogadorEncontrado) {
      throw new BadRequestException(`Jogador com e-mail ${email} já cadastrado`)
    }
    const jogadorCriado = new this.jogadorModel(criarJogadorDto)
    return await jogadorCriado.save()
  }

  async atualizarJogador(_id: string, criarJogadorDto: CriarJogadorDto): Promise<void> {
    const jogadorEncontrado = await this.jogadorModel.findById({ _id }).exec()
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`)
    }
    await this.jogadorModel.findOneAndUpdate({ _id }, 
      { $set: criarJogadorDto}).exec()
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec()
  }

  async consultarJogadorPeloId(_id: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec()
    if (!jogadorEncontrado) {
        throw new NotFoundException(`Jogador com id ${_id} não encontrado`)
    }
    return jogadorEncontrado
  }

  async deletarJogadorPeloId(_id: string): Promise<any> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec()
    if (!jogadorEncontrado) {
        throw new NotFoundException(`Jogador com id ${_id} não encontrado`)
    }
    return await this.jogadorModel.deleteOne({ _id }).exec()
  }
}
