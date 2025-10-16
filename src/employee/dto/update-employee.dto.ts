import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  cedula?: string;

  @IsOptional()
  @IsString()
  cargo?: string;

  @IsOptional()
  @IsString()
  area?: string;

  @IsOptional()
  @IsDateString()
  fecha_nacimiento?: string;
}
