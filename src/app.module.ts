import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017/smartranking'
    ),
    JogadoresModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
