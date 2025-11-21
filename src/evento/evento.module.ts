import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evento } from '../entities/evento.entity';
import { Ponente } from '../entities/ponente.entity';
import { Auditorio } from '../entities/auditorio.entity';
import { Asistente } from '../entities/asistente.entity';
import { EventoService } from './evento.service';
import { EventoController } from './evento.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Evento, Ponente, Auditorio, Asistente])],
  providers: [EventoService],
  exports: [TypeOrmModule, EventoService],
  controllers: [EventoController],
})
export class EventoModule {}
