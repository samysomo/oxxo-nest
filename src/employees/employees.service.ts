import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { v4 as uuid} from 'uuid';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository : Repository<Employee>
  ){}

  create(createEmployeeDto: CreateEmployeeDto) {
    const employee = this.employeeRepository.save(createEmployeeDto);
    return employee;
  }

  findAll() {
    return this.employeeRepository.find();
  }

  findOne(id: string) {
    const employee = this.employeeRepository.findOneBy({
      employeeId: id
    })
    if(!employee) throw new NotFoundException(); 
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const updatedEmployee = await this.employeeRepository.preload({
      employeeId: id,
      ...updateEmployeeDto
    })
    if(!updatedEmployee) throw new NotFoundException(); 
    this.employeeRepository.save(updatedEmployee)
    return updatedEmployee
  }

  remove(id: string) {
    this.employeeRepository.delete({
      employeeId: id
    }) 
    return {
      message: `Successfully deleted employee with id: ${id}`
    }
  }
}
