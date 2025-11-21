import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asistente } from '../entities/asistente.entity';
import { Evento } from '../entities/evento.entity';
import { RegistrarAsistenteDto } from './dto/registrar-asistente.dto';

@Injectable()
export class AsistenteService {
  constructor(
    @InjectRepository(Asistente)
    private readonly asistenteRepo: Repository<Asistente>,
    @InjectRepository(Evento) private readonly eventoRepo: Repository<Evento>,
  ) {}

  async registrarAsistente(
    eventoId: number,
    data: RegistrarAsistenteDto,
  ): Promise<Asistente> {
    const evento = await this.eventoRepo.findOne({
      where: { id: eventoId },
      relations: ['auditorio', 'asistentes'],
    });
    if (!evento) {
      throw new NotFoundException(`Evento ${eventoId} no encontrado`);
    }
    if (!evento.auditorio) {
      throw new BadRequestException('El evento no tiene auditorio asignado');
    }

    const emailLower = data.email.toLowerCase();
    const emailDuplicado = evento.asistentes.some(
      (asistente) => asistente.email.toLowerCase() === emailLower,
    );
    if (emailDuplicado) {
      throw new BadRequestException(
        'Ya existe un asistente con ese email en el evento',
      );
    }

    if (evento.asistentes.length >= evento.auditorio.capacidad) {
      throw new BadRequestException(
        'No se puede superar la capacidad del auditorio del evento',
      );
    }

    const asistente = this.asistenteRepo.create({
      ...data,
      eventos: evento,
    });
    return this.asistenteRepo.save(asistente);
  }

  async findAsistentesByEvento(eventoId: number): Promise<Asistente[]> {
    const evento = await this.eventoRepo.findOne({ where: { id: eventoId } });
    if (!evento) {
      throw new NotFoundException(`Evento ${eventoId} no encontrado`);
    }
    const fullEvento = await this.eventoRepo.findOne({
      where: { id: eventoId },
      relations: ['asistentes'],
    });
    return fullEvento?.asistentes ?? [];
  }
}
