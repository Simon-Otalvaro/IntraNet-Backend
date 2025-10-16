import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  shortDesc: string;

  @IsString()
  @IsNotEmpty()
  contenido: string;

  @IsOptional()
  @IsString()
  imagen?: string;

  @IsNotEmpty()
  fechaPublicacion: Date;
}
