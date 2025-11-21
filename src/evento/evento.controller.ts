import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  BadRequestException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EventoService } from './evento.service';
import { CreateEventoDto } from './dto/create-evento.dto';

@Controller('evento')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @Post()
  async crearEvento(@Body() dto: CreateEventoDto) {
    return this.eventoService.crearEvento(dto);
  }

  @Patch(':id/aprobar')
  async aprobarEvento(@Param('id') id: string) {
    const eventoId = this.parseId(id);
    return this.eventoService.aprobarEvento(eventoId);
  }

  @Delete(':id')
  @HttpCode(204)
  async eliminarEvento(@Param('id') id: string) {
    const eventoId = this.parseId(id);
    await this.eventoService.eliminarEvento(eventoId);
  }

  @Get(':id')
  async obtenerEvento(@Param('id') id: string) {
    const eventoId = this.parseId(id);
    return this.eventoService.findEventoById(eventoId);
  }

  private parseId(value: string): number {
    const id = Number(value);
    if (Number.isNaN(id)) {
      throw new BadRequestException('El id debe ser numérico');
    }
    return id;
  }
}
