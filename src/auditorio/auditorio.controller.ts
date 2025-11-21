import {
  Body,
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuditorioService } from './auditorio.service';
import { CreateAuditorioDto } from './dto/create-auditorio.dto';

@Controller('auditorio')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class AuditorioController {
  constructor(private readonly auditorioService: AuditorioService) {}

  @Post()
  async crearAuditorio(@Body() dto: CreateAuditorioDto) {
    return this.auditorioService.crearAuditorio(dto);
  }

  @Get(':id')
  async obtenerAuditorio(@Param('id') id: string) {
    const auditorioId = this.parseId(id);
    return this.auditorioService.findAuditorioById(auditorioId);
  }

  private parseId(value: string): number {
    const id = Number(value);
    if (Number.isNaN(id)) {
      throw new BadRequestException('El id debe ser numérico');
    }
    return id;
  }
}
