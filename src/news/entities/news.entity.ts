import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  shortDesc?: string;

  @Column({ type: 'text' })
  contenido: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imagen?: string;

  @Column({ type: 'datetime' })
  fechaPublicacion: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
