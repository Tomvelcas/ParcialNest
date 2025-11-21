import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ponente } from '../entities/ponente.entity';
import { Evento } from '../entities/evento.entity';
import { CreatePonenteDto } from './dto/create-ponente.dto';

@Injectable()
export class PonenteService {
  constructor(
    @InjectRepository(Ponente)
    private readonly ponenteRepo: Repository<Ponente>,
    @InjectRepository(Evento) private readonly eventoRepo: Repository<Evento>,
  ) {}

  async crearPonente(data: CreatePonenteDto): Promise<Ponente> {
    this.validarEmail(data.tipoPonente, data.email);
    const ponente = this.ponenteRepo.create(data);
    return this.ponenteRepo.save(ponente);
  }

  async findPonenteById(id: number): Promise<Ponente> {
    const ponente = await this.ponenteRepo.findOne({ where: { id } });
    if (!ponente) {
      throw new NotFoundException(`Ponente ${id} no encontrado`);
    }
    return ponente;
  }

  async eliminarPonente(id: number): Promise<void> {
    const ponente = await this.findPonenteById(id);
    const eventosAsociados = await this.eventoRepo.count({
      where: { ponente: { id: ponente.id } },
    });
    if (eventosAsociados > 0) {
      throw new BadRequestException(
        'No se puede eliminar un ponente con eventos asociados',
      );
    }
    await this.ponenteRepo.delete(ponente.id);
  }

  private validarEmail(
    tipoPonente: Ponente['tipoPonente'],
    email: string,
  ): void {
    const correo = email?.trim().toLowerCase();
    if (!correo) {
      throw new BadRequestException('El correo no puede estar vacío');
    }

    if (tipoPonente === 'Interno' && !correo.endsWith('.edu')) {
      throw new BadRequestException(
        'El correo de un ponente Interno debe terminar en .edu',
      );
    }

    if (tipoPonente === 'Invitado') {
      const partes = correo.split('@');
      const usuario = partes[0];
      const dominio = partes[1];
      const dominioValido = Boolean(dominio) && dominio.includes('.');
      if (!usuario || !dominioValido) {
        throw new BadRequestException(
          'El correo de un ponente Invitado debe incluir "@" y un dominio',
        );
      }
    }
  }
}
