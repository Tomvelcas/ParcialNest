import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evento } from '../entities/evento.entity';
import { Ponente } from '../entities/ponente.entity';
import { Auditorio } from '../entities/auditorio.entity';
import { CreateEventoDto } from './dto/create-evento.dto';

@Injectable()
export class EventoService {
  constructor(
    @InjectRepository(Evento) private readonly eventoRepo: Repository<Evento>,
    @InjectRepository(Ponente)
    private readonly ponenteRepo: Repository<Ponente>,
    @InjectRepository(Auditorio)
    private readonly auditorioRepo: Repository<Auditorio>,
  ) {}

  async crearEvento(data: CreateEventoDto): Promise<Evento> {
    if (data.duracionHoras <= 0) {
      throw new BadRequestException('La duración debe ser positiva');
    }

    const ponente = await this.ponenteRepo.findOne({
      where: { id: data.ponenteId },
    });
    if (!ponente) {
      throw new NotFoundException(`Ponente ${data.ponenteId} no encontrado`);
    }
    if (
      ponente.tipoPonente === 'Invitado' &&
      data.descripcion.trim().length < 50
    ) {
      throw new BadRequestException(
        'Descripción mínima de 50 caracteres para ponente Invitado',
      );
    }

    const auditorio = await this.auditorioRepo.findOne({
      where: { id: data.auditorioId },
    });
    if (!auditorio) {
      throw new NotFoundException(
        `Auditorio ${data.auditorioId} no encontrado`,
      );
    }

    const evento = this.eventoRepo.create({
      titulo: data.titulo,
      descripcion: data.descripcion,
      fecha: data.fecha,
      duracionHoras: data.duracionHoras,
      estado: data.estado ?? 'Propuesto',
      ponente,
      auditorio,
    });
    return this.eventoRepo.save(evento);
  }

  async aprobarEvento(id: number): Promise<Evento> {
    const evento = await this.eventoRepo.findOne({
      where: { id },
      relations: ['auditorio'],
    });
    if (!evento) {
      throw new NotFoundException(`Evento ${id} no encontrado`);
    }
    if (!evento.auditorio) {
      throw new BadRequestException(
        'Solo puede aprobarse un evento con auditorio asignado',
      );
    }
    evento.estado = 'Aprobado';
    return this.eventoRepo.save(evento);
  }

  async eliminarEvento(id: number): Promise<void> {
    const evento = await this.eventoRepo.findOne({ where: { id } });
    if (!evento) {
      throw new NotFoundException(`Evento ${id} no encontrado`);
    }
    if (evento.estado === 'Aprobado') {
      throw new BadRequestException('No se puede eliminar un evento aprobado');
    }
    await this.eventoRepo.delete(evento.id);
  }

  async findEventoById(id: number): Promise<Evento> {
    const evento = await this.eventoRepo.findOne({ where: { id } });
    if (!evento) {
      throw new NotFoundException(`Evento ${id} no encontrado`);
    }
    return evento;
  }
}
