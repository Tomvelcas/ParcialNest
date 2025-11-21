import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asistente } from '../entities/asistente.entity';
import { Evento } from '../entities/evento.entity';
import { AsistenteService } from './asistente.service';

@Module({
  imports: [TypeOrmModule.forFeature([Asistente, Evento])],
  providers: [AsistenteService],
  exports: [TypeOrmModule, AsistenteService],
})
export class AsistenteModule {}
