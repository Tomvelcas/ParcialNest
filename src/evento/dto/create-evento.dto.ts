import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  IsIn,
} from 'class-validator';

export class CreateEventoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsDateString()
  fecha: Date;

  @IsInt()
  @IsPositive()
  duracionHoras: number;

  @IsOptional()
  @IsIn(['Propuesto', 'Aprobado', 'Rechazado'])
  estado?: 'Propuesto' | 'Aprobado' | 'Rechazado';

  @IsInt()
  ponenteId: number;

  @IsInt()
  auditorioId: number;
}
