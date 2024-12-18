import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiAuth()
@ApiTags("Managers")
@Controller('managers')
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @Auth()
  @Post()
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managersService.create(createManagerDto);
  }

  @Auth()
  @Get()
  findAll() {
    return this.managersService.findAll();
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({version: "4"})) id: string) {
    return this.managersService.findOne(id);
  }

  @Auth(ROLES.MANAGER)
  @Get('/email/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.managersService.findOneByEmail(email);
  }

  @Auth(ROLES.MANAGER)
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({version: "4"})) id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managersService.update(id, updateManagerDto);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({version: "4"})) id: string) {
    return this.managersService.remove(id);
  }
}
