import { InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IUser, User } from '../../domain/entity/user.entity';
import { CreateUserDto, DeleteManyUserDto, DeleteOneUserDto, FindManyUserDto, FindOneUserDto, UpdateUserDto, UserDto } from '../dto';

@Injectable()
export class UserMapping {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  getUser(user: IUser): User {
    return plainToClass(User, user);
  }

  getUserDto(user: User): UserDto {
    return this.mapper.map(user, UserDto, User);
  }

  getUserFromCreateUser(dto: CreateUserDto): Partial<User> {
    return this.mapper.map(dto, User, CreateUserDto);
  }

  getUserFindOneUser(dto: FindOneUserDto): Partial<User> {
    return this.mapper.map(dto, User, FindOneUserDto);
  }

  getUserFindManyUser(dto: FindManyUserDto): Partial<User> {
    return this.mapper.map(dto, User, FindManyUserDto);
  }

  getUserDeleteOneUser(dto: DeleteOneUserDto): Partial<User> {
    return this.mapper.map(dto, User, DeleteOneUserDto);
  }

  getUserDeleteManyUser(dto: DeleteManyUserDto): Partial<User> {
    return this.mapper.map(dto, User, DeleteManyUserDto);
  }

  getUserUpdateUser(dto: UpdateUserDto): Partial<User> {
    return this.mapper.map(dto, User, UpdateUserDto);
  }
}
