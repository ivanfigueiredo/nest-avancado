import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DesafiosController } from './desafios.controller';
import { DesafiosService } from './desafios.service';
import { DesafioSchema } from './interfaces/desafios.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Desafio', schema: DesafioSchema}])],
  controllers: [DesafiosController],
  providers: [DesafiosService],
  exports: [DesafiosService]
})
export class DesafiosModule {}
