import { IsString, IsNotEmpty, IsOptional, IsDateString, IsUrl } from 'class-validator';

export class CreateEventDto {
  @IsString() @IsNotEmpty()
  nombre: string;

  @IsString() @IsNotEmpty()
  descripcion: string;

  @IsDateString()
  fechaHora: string; 
  @IsOptional() @IsString()
  lugar?: string;

  @IsOptional() @IsUrl()
  link?: string;

  @IsOptional() @IsString()
  imagen?: string; 
}
