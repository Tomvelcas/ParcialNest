import {
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePonenteDto {
  @IsInt()
  cedula: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @IsEmail()
  email: string;

  @IsIn(['Interno', 'Invitado'])
  tipoPonente: 'Interno' | 'Invitado';

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  especialidad: string;
}
