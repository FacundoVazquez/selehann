import { ignore, mapFrom, mapWithArguments } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
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

      mapper.createMap(CreateUserDto, User).forMember((d) => d.id, ignore());

      mapper
        .createMap(FindOneUserDto, User)
        .forMember((d) => d.password, ignore())
        .forMember((d) => d.roleId, ignore());

      mapper
        .createMap(FindManyUserDto, User)
        .forMember(
          (d) => d.roleId,
          mapFrom((s) => s.role),
        )
        .forMember((d) => d.id, ignore())
        .forMember((d) => d.username, ignore())
        .forMember((d) => d.password, ignore());

      mapper.createMap(UpdateUserDto, User).forMember((d) => d.id, ignore());

      mapper
        .createMap(DeleteOneUserDto, User)
        .forMember((d) => d.username, ignore())
        .forMember((d) => d.password, ignore())
        .forMember((d) => d.roleId, ignore());

      mapper
        .createMap(DeleteManyUserDto, User)
        .forMember((d) => d.id, ignore())
        .forMember((d) => d.username, ignore())
        .forMember((d) => d.password, ignore());
    };
  }
}
