import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ponente } from '../entities/ponente.entity';
import { Evento } from '../entities/evento.entity';
import { PonenteService } from './ponente.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ponente, Evento])],
  providers: [PonenteService],
  exports: [TypeOrmModule, PonenteService],
})
export class PonenteModule {}
