import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  private employees = [
    {
      id: 1,
      name: "Alberto",
      lastName: "Perez",
      phoneNumber: "1234565"
    },
    {
      id: 2,
      name: "Alberto",
      lastName: "Perez",
      phoneNumber: "1234565"
    }
]

  create(createEmployeeDto: CreateEmployeeDto) {
    this.employees.push(createEmployeeDto);
    return this.employees;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: number) {
    return this.employees.filter((employee) => employee.id === id)[0];
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
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

  remove(id: number) {
    this.employees = this.employees.filter((employee) => employee.id !== id);
    return this.employees; 
  }
}
