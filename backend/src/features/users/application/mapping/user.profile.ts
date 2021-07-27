import { ignore, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entity/user.entity';
import { CreateUserDto, DeleteManyUserDto, DeleteOneUserDto, FindManyUserDto, FindOneUserDto, UpdateUserDto, UserDto } from '../dto';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper.createMap(UserDto, User).forMember((d) => d.password, ignore());

      mapper.createMap(User, UserDto);
      /* 
        .beforeMap((s, d) => {
          console.log('Mapped Init', s, d);
        })
        .afterMap((s, d) => {
          console.log('Mapped OK', s, d);
        }); */

      mapper.createMap(CreateUserDto, User).forMember((d) => d.id, ignore());

      mapper
        .createMap(FindOneUserDto, User)
        .forMember((d) => d.username, ignore())
        .forMember((d) => d.password, ignore())
        .forMember((d) => d.role, ignore());

      mapper
        .createMap(FindManyUserDto, User)
        .forMember((d) => d.id, ignore())
        .forMember((d) => d.username, ignore())
        .forMember((d) => d.password, ignore());

      mapper.createMap(UpdateUserDto, User).forMember((d) => d.id, ignore());

      mapper
        .createMap(DeleteOneUserDto, User)
        .forMember((d) => d.username, ignore())
        .forMember((d) => d.password, ignore())
        .forMember((d) => d.role, ignore());

      mapper
        .createMap(DeleteManyUserDto, User)
        .forMember((d) => d.id, ignore())
        .forMember((d) => d.username, ignore())
        .forMember((d) => d.password, ignore());
    };
  }

  getUser(user: UserDto): User {
    return this.mapper.map(user, User, UserDto);
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
