import { InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Role } from 'src/features/_shared/domain/roles/role.enum';
// import { Role } from '../../domain/entity/role.entity';
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

  getUserFromCreateUser(dto: CreateUserDto, role: Role): Partial<User> {
    return this.mapper.map(dto, User, CreateUserDto, { extraArguments: { role } });
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
