import { InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { User } from '../../domain/entities/user.entity';
import { CreateUserDto, DeleteManyUserDto, DeleteOneUserDto, FindManyUserDto, FindOneUserDto, UpdateUserDto, UserDto } from '../dto';

@Injectable()
export class UserMapping {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  getUser(user: User): User {
    return plainToClass(User, user);
  }

  getUserDto(user: User): UserDto {
    return this.mapper.map(user, UserDto, User);
  }

  getUserFromCreateUser(dto: CreateUserDto): Partial<User> {
    return this.mapper.map(dto, User, CreateUserDto);
  }

  getUserFromFindOneUser(dto: FindOneUserDto): Partial<User> {
    return this.mapper.map(dto, User, FindOneUserDto);
  }

  getUserFromFindManyUser(dto: FindManyUserDto): Partial<User> {
    return this.mapper.map(dto, User, FindManyUserDto);
  }

  getUserFromDeleteOneUser(dto: DeleteOneUserDto): Partial<User> {
    return this.mapper.map(dto, User, DeleteOneUserDto);
  }

  getUserFromDeleteManyUser(dto: DeleteManyUserDto): Partial<User> {
    return this.mapper.map(dto, User, DeleteManyUserDto);
  }

  getUserFromUpdateUser(dto: UpdateUserDto): Partial<User> {
    return this.mapper.map(dto, User, UpdateUserDto);
  }
}
