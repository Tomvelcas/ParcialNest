import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Evento } from './evento.entity';

@Entity()
export class Auditorio {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'int' })
  capacidad: number;

  @Column({ length: 150 })
  ubicacion: string;

  @OneToMany(() => Evento, (evento) => evento.auditorio)
  eventos: Evento[];
}
