import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './entities/news.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  async findAll(): Promise<News[]> {
    return this.newsRepository.find({
      order: { fechaPublicacion: 'DESC' },
    });
  }

  async findOne(id: number): Promise<News> {
    const noticia = await this.newsRepository.findOne({ where: { id } });
    if (!noticia) throw new NotFoundException('Noticia no encontrada');
    return noticia;
  }

  async create(data: CreateNewsDto): Promise<News> {
  const nueva = this.newsRepository.create({
    titulo: data.titulo,
    shortDesc: data.shortDesc,
    contenido: data.contenido,
    imagen: data.imagen || undefined,
    fechaPublicacion: data.fechaPublicacion,
  });
  return await this.newsRepository.save(nueva);
}

async update(id: number, data: UpdateNewsDto): Promise<News> {
  const noticia = await this.findOne(id);
  Object.assign(noticia, {
    titulo: data.titulo ?? noticia.titulo,
    shortDesc: data.shortDesc ?? noticia.shortDesc,
    contenido: data.contenido ?? noticia.contenido,
    imagen: data.imagen ?? noticia.imagen,
    fechaPublicacion: data.fechaPublicacion ?? noticia.fechaPublicacion,
  });
  return await this.newsRepository.save(noticia);
}

  async remove(id: number): Promise<void> {
    const noticia = await this.findOne(id);
    await this.newsRepository.remove(noticia);
  }
}
