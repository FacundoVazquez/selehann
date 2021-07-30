import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/features/users/application/service/user.service';
import { CreateUserDto, DeleteManyUserDto, DeleteOneUserDto, FindManyUserDto, FindOneUserDto, UpdateUserDto, UserDto } from '../../../application/dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  //@UseGuards(JwtAuthGuard)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  async findOne(@Param() findOneUserDto: FindOneUserDto): Promise<UserDto> {
    return this.userService.findUser(findOneUserDto);
  }

  @Get()
  async findMany(@Query() findManyUserDto: FindManyUserDto): Promise<UserDto[]> {
    return this.userService.findUsers(findManyUserDto);
  }

  @Put(':id')
  async update(@Param() findOneUserDto: FindOneUserDto, @Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
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
