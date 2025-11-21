import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Evento } from './evento.entity';

@Entity()
export class Ponente {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'int', unique: true })
  cedula: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 150 })
  email: string;

  @Column({ type: 'enum', enum: ['Interno', 'Invitado'] })
  tipoPonente: 'Interno' | 'Invitado';

  @Column({ length: 100 })
  especialidad: string;

  @OneToMany(() => Evento, (evento) => evento.ponente)
  eventos: Evento[];
}
