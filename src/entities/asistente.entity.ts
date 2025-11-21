import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Evento } from './evento.entity';

@Entity()
export class Asistente {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 50 })
  codigoEstudiante: string;

  @Column({ length: 150 })
  email: string;

  @ManyToOne(() => Evento, (evento) => evento.asistentes, { nullable: false })
  eventos: Evento;
}
