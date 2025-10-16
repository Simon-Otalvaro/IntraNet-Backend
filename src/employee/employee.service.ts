import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  // 📋 Obtener todos los empleados
  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  // 🔍 Buscar empleados por nombre
  async findByNombre(nombre: string): Promise<Employee[]> {
    return this.employeeRepository.find({
      where: { nombre: Like(`%${nombre}%`) },
    });
  }

  // 🔎 Obtener empleado por ID
  async findOne(id: number): Promise<Employee> {
    const empleado = await this.employeeRepository.findOne({ where: { id } });
    if (!empleado) throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
    return empleado;
  }

  // ➕ Crear empleado
  async create(dto: CreateEmployeeDto): Promise<Employee> {
    const nuevo = this.employeeRepository.create({
      ...dto,
      fecha_nacimiento: new Date(dto.fecha_nacimiento),
    });
    return await this.employeeRepository.save(nuevo);
  }

  // ✏️ Actualizar empleado
  async update(id: number, dto: UpdateEmployeeDto): Promise<Employee> {
    const empleado = await this.findOne(id);
    Object.assign(empleado, dto);
    return await this.employeeRepository.save(empleado);
  }

  // 🗑️ Eliminar empleado
  async remove(id: number): Promise<void> {
    const empleado = await this.findOne(id);
    await this.employeeRepository.remove(empleado);
  }
}
