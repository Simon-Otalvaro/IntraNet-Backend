import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('empleados')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // 🔍 Obtener todos o filtrar por nombre
  @Get()
  findAll(@Query('nombre') nombre?: string) {
    if (nombre) {
      return this.employeeService.findByNombre(nombre);
    }
    return this.employeeService.findAll();
  }

  // 🔎 Obtener empleado por ID
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.employeeService.findOne(id);
  }

  // ➕ Crear empleado
  @Post()
  create(@Body() dto: CreateEmployeeDto) {
    return this.employeeService.create(dto);
  }

  // ✏️ Actualizar empleado
  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateEmployeeDto) {
    return this.employeeService.update(id, dto);
  }

  // 🗑️ Eliminar empleado
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.employeeService.remove(id);
  }
}
