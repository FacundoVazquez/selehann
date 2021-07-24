import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto, DeleteManyUserDto, DeleteOneUserDto, FindManyUserDto, FindOneUserDto, UpdateUserDto, UsersService } from 'src/domain/dto/users';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  //@UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get(':username')
  find(@Param() dto: FindOneUserDto) {
    return this.usersService.find(dto);
  }

  @Get()
  async findMany(@Query() dto: FindManyUserDto) {
    return this.usersService.findMany(dto);
  }

  @Delete(':username')
  delete(@Param() dto: DeleteOneUserDto) {
    return this.usersService.delete(dto);
  }

  @Delete()
  deleteMany(@Query() dto: DeleteManyUserDto) {
    return this.usersService.deleteMany(dto);
  }

  @Put(':username')
  async update(@Param() findOneUserDto: FindOneUserDto, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(findOneUserDto, updateUserDto);
  }
}
