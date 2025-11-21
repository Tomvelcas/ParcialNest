import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auditorio } from '../entities/auditorio.entity';
import { CreateAuditorioDto } from './dto/create-auditorio.dto';

@Injectable()
export class AuditorioService {
  constructor(
    @InjectRepository(Auditorio)
    private readonly auditorioRepo: Repository<Auditorio>,
  ) {}

  async crearAuditorio(data: CreateAuditorioDto): Promise<Auditorio> {
    if (data.capacidad <= 0) {
      throw new BadRequestException('La capacidad debe ser mayor a cero');
    }
    const auditorio = this.auditorioRepo.create(data);
    return this.auditorioRepo.save(auditorio);
  }

  async findAuditorioById(id: number): Promise<Auditorio> {
    const auditorio = await this.auditorioRepo.findOne({ where: { id } });
    if (!auditorio) {
      throw new NotFoundException(`Auditorio ${id} no encontrado`);
    }
    return auditorio;
  }
}
