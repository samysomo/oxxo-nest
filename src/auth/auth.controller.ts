import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res, BadRequestException, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response, response } from 'express';
import { TOKEN_NAME } from './constants/jwt.constants';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register/:id")
  registerEmployee(
    @Query("role") role : string,
    @Body() createUserDto : CreateUserDto, 
    @Param("id") id : string)
    {
      if(role === "Manager"){
        return this.authService.registerManager(id, createUserDto)
      } else if (role === "Employee") {
        return this.authService.registerEmployee(id, createUserDto)
      }
      throw new BadRequestException("Rol Invalido")
  }

  @Post("login")
  async login(@Body() loginUserDto : LoginUserDto, @Res({passthrough: true}) response: Response){
    const token = await this.authService.loginUser(loginUserDto)
    response.cookie(TOKEN_NAME, token, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "none"
    })
    return
  }
  @Patch("/:id")
  updateUser(@Param("id") id : string, @Body() updateUserDto: UpdateUserDto){
    return this.authService.updateUser(id, updateUserDto)
  }
}
