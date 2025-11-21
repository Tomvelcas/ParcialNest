import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Ponente } from './ponente.entity';
import { Auditorio } from './auditorio.entity';
import { Asistente } from './asistente.entity';

@Entity()
export class Evento {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ length: 150 })
  titulo: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'timestamp' })
  fecha: Date;

  @Column({ type: 'int' })
  duracionHoras: number;

  @Column({
    type: 'enum',
    enum: ['Propuesto', 'Aprobado', 'Rechazado'],
  })
  estado: 'Propuesto' | 'Aprobado' | 'Rechazado';

  @ManyToOne(() => Ponente, (ponente) => ponente.eventos, {
    nullable: false,
  })
  ponente: Ponente;

  @ManyToOne(() => Auditorio, (auditorio) => auditorio.eventos, {
    nullable: false,
  })
  auditorio: Auditorio;

  @OneToMany(() => Asistente, (asistente) => asistente.eventos)
  asistentes: Asistente[];
}
