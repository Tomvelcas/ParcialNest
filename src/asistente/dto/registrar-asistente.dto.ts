import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RegistrarAsistenteDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  codigoEstudiante: string;

  @IsEmail()
  @MaxLength(150)
  email: string;
}
