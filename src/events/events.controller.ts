import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('eventos')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.eventsService.findOne(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads/events',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  create(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    const evento = {
      nombre: body.nombre,
      descripcion: body.descripcion,
      fechaHora: body.fechaHora,
      lugar: body.lugar,
      link: body.link,
      imagen: file ? file.filename : undefined, // ← cambiado null → undefined
    };
    return this.eventsService.create(evento);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads/events',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  update(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    const evento = {
      nombre: body.nombre,
      descripcion: body.descripcion,
      fechaHora: body.fechaHora,
      lugar: body.lugar,
      link: body.link,
      imagen: file ? file.filename : body.imagen || undefined, // ← también aquí
    };
    return this.eventsService.update(id, evento);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.eventsService.remove(id);
  }
}
