import { MapInterceptor } from '@automapper/nestjs';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { UserService } from 'src/features/users/application/service/user.service';
import { User } from 'src/features/users/domain/entity/user.entity';
import { CreateUserDto, DeleteManyUserDto, DeleteOneUserDto, FindManyUserDto, FindOneUserDto, UpdateUserDto, UserDto } from '../../../application/dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(MapInterceptor(UserDto, User))
  //@UseGuards(JwtAuthGuard)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  @UseInterceptors(MapInterceptor(UserDto, User))
  async findOne(@Param() findOneUserDto: FindOneUserDto) {
    return this.userService.findUser(findOneUserDto);
  }

  @Get()
  @UseInterceptors(MapInterceptor(UserDto, User, { isArray: true }))
  async findMany(@Query() findManyUserDto: FindManyUserDto) {
    return this.userService.findUsers(findManyUserDto);
  }

  @Put(':id')
  @UseInterceptors(MapInterceptor(UserDto, User))
  async update(@Param() findOneUserDto: FindOneUserDto, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(findOneUserDto, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param() deleteOneUserDto: DeleteOneUserDto) {
    return this.userService.deleteUser(deleteOneUserDto);
  }

  @Delete()
  async deleteMany(@Query() deleteManyUserDto: DeleteManyUserDto) {
    return this.userService.deleteUsers(deleteManyUserDto);
  }
}
