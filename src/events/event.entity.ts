import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'datetime' })
  fechaHora: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lugar: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  link: string;
  
  @Column({ type: 'varchar', length: 255, nullable: true })
  imagen: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  creado: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  actualizado: Date;
}
