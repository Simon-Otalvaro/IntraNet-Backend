import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.newsService.findOne(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads/news',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  create(@Body() body: CreateNewsDto, @UploadedFile() file?: Express.Multer.File) {
    return this.newsService.create({
      ...body,
      imagen: file ? file.filename : undefined,
    });
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads/news',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  update(
    @Param('id') id: number,
    @Body() body: UpdateNewsDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.newsService.update(id, {
      ...body,
      imagen: file?.filename || body.imagen,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const noticia = await this.newsService.findOne(id);
    if (!noticia) throw new NotFoundException('Noticia no encontrada');
    await this.newsService.remove(id);
    return { message: 'Noticia eliminada correctamente' };
  }
}
