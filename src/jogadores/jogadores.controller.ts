import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto'
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service'

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}    
    
  @Post()
  async criarAtualizarJogador(
    @Body() criarJogador: CriarJogadorDto) {
      await this.jogadoresService.criarAtualizarJogador(criarJogador)
    }
  @Get()
  async consultarJogadores(
    @Query('email') email: string
  ): Promise<Jogador[] | Jogador> {
    if (email) {
        return await this.jogadoresService.consultarJogadoresPeloEmail(email)
    }
    return this.jogadoresService.consultarTodosJogadores()
  }

  @Delete()
  async deletarJogador(
    @Query('email') email: string
  ): Promise<void> {
    await this.jogadoresService.deletarJogadorPeloEmail(email)
  }
}
