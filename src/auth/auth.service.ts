import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { Employee } from 'src/employees/entities/employee.entity';
import { Manager } from 'src/managers/entities/manager.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository : Repository<User>,
    @InjectRepository(Employee)
    private employeeRepository : Repository<Employee>,
    @InjectRepository(Manager)
    private managerRepository : Repository<Manager>,
    private jwtService : JwtService
  ){}

  registerUser(createUserDto : CreateUserDto){
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5)
    return this.userRepository.save(createUserDto)
  }

  async loginUser(loginUserDto : LoginUserDto) {
    const user = await this.userRepository.findOne({
      where:{
        userEmail : loginUserDto.userEmail
      }
    })
    if(!user) throw new UnauthorizedException("Ese usuario no existe")
    const match = await bcrypt.compare(loginUserDto.userPassword, user.userPassword)
    if(!match) throw new UnauthorizedException("No estas autorizado")
    const token = this.jwtService.sign({
      userEmail: user.userEmail,
      userRoles: user.userRoles,
      userPassword: user.userPassword
    })
    return token
  }

  async updateUser(userEmail: string, updateUserDto : UpdateUserDto) {
    const updatedUserData = await this.userRepository.preload({
      userEmail,
      ... updateUserDto
    })
    this.userRepository.save(updatedUserData)
    return updatedUserData
  }

}
