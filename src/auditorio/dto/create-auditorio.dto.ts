import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAuditorioDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @IsInt()
  @IsPositive()
  capacidad: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  ubicacion: string;
}
