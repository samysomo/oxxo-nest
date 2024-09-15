import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { v4 as uuid} from 'uuid';

@Injectable()
export class EmployeesService {
  private employees = [
    {
      id: uuid(),
      name: "Alberto",
      lastName: "Perez",
      phoneNumber: "1234565"
    },
    {
      id: uuid(),
      name: "Alberto",
      lastName: "Perez",
      phoneNumber: "1234565"
    }
]

  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = uuid();
    this.employees.push(createEmployeeDto);
    return this.employees;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: string) {
    const employee = this.employees.filter((employee) => employee.id === id)[0];
    if(employee) throw new NotFoundException(); 
    return employee;
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    let updatedEmployee = this.findOne(id)
    updatedEmployee = {
      ...updatedEmployee,
      ...updateEmployeeDto,
      
    }
    
    this.employees = this.employees.map((employee) => {
      if (employee.id === id){
        employee = updatedEmployee
      }
      return employee
    });
    return updatedEmployee
  }

  remove(id: string) {
    this.findOne(id);
    this.employees = this.employees.filter((employee) => employee.id !== id);
    return this.employees; 
  }
}
