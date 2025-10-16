import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly repo: Repository<Event>,
  ) {}

  async create(dto: CreateEventDto) {
    const ent = this.repo.create({
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      fechaHora: new Date(dto.fechaHora),
      lugar: dto.lugar,
      link: dto.link,
      imagen: dto.imagen ? dto.imagen : undefined, 
    });
    return await this.repo.save(ent);
  }

  async findAll() {
    const eventos = await this.repo.find({ order: { fechaHora: 'ASC' } });
    return eventos.map((e) => ({
      ...e,
      fechaHora: e.fechaHora.toISOString(),
    }));
  }

  async findOne(id: number) {
    const evento = await this.repo.findOne({ where: { id } });
    if (!evento) throw new NotFoundException('Evento no encontrado');
    return evento;
  }

  async findByDate(fecha: string) {
    const date = new Date(fecha);
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);

    return this.repo
      .createQueryBuilder('event')
      .where('event.fechaHora >= :date AND event.fechaHora < :nextDay', {
        date,
        nextDay,
      })
      .orderBy('event.fechaHora', 'ASC')
      .getMany();
  }

  async update(id: number, dto: UpdateEventDto) {
    const evento = await this.repo.findOne({ where: { id } });
    if (!evento) throw new NotFoundException('Evento no encontrado');

    const dataToUpdate: Partial<Event> = {
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      lugar: dto.lugar,
      link: dto.link,
      ...(dto.fechaHora ? { fechaHora: new Date(dto.fechaHora) } : {}),
    };

    if (dto.imagen) {
      dataToUpdate.imagen = dto.imagen;
    }

    await this.repo.update(id, dataToUpdate);
    return this.findOne(id);
  }

  async remove(id: number) {
    const evento = await this.repo.findOne({ where: { id } });
    if (!evento) throw new NotFoundException('Evento no encontrado');
    return this.repo.remove(evento);
  }
}
