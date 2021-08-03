import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User } from '../domain/entities/user.entity';
import { CreateUserException } from '../domain/user.exceptions';
import { CreateUserDto, DeleteManyUserDto, DeleteOneUserDto, FindManyUserDto, FindOneUserDto, UpdateUserDto } from './dto';
import { UserMapping } from './mapping/user.mapping';

@Injectable()
export class UserService {
  constructor(private readonly manager: EntityManager, private readonly userMapping: UserMapping) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = this.manager.create(User, { ...createUserDto });

    try {
      await this.manager.save(User, user);
    } catch (err) {
      throw new CreateUserException(err);
    }
    const userDto = this.userMapping.getUserDto(user);
    console.log(createUserDto, user, userDto);
    return userDto;
  }

  async findUser(findOneUserDto: FindOneUserDto) {
    //const filter = this.userMapping.getUserFromFindOneUser(findOneUserDto);
    const user = await this.manager.findOne(User, { ...findOneUserDto });

    const userDto = this.userMapping.getUserDto(user);
    return userDto;
  }

  async findUsers(findManyUserDto: FindManyUserDto) {
    // const filter = this.userMapping.getUserFromFindManyUser(findManyUserDto);
    const { role: roleId } = findManyUserDto;
    const users = await this.manager.find(User, { roleId });

    const usersDto = users.map((u) => this.userMapping.getUserDto(u));
    return usersDto;
  }

  async updateUser(findOneUserDto: FindOneUserDto, updateUserDto: UpdateUserDto) {
    // const user = this.userMapping.getUserFromUpdateUser(updateUserDto);
    const id = findOneUserDto.id;

    const user = this.manager.create(User, { id, ...updateUserDto });
    const userDocument = await this.manager.save(user);

    return this.userMapping.getUserDto(userDocument);
  }

  async deleteUser(deleteOneUserDto: DeleteOneUserDto) {
    const id = deleteOneUserDto.id;
    return this.manager.delete(User, { id });
  }

  async deleteUsers(deleteManyUserDto: DeleteManyUserDto) {
    //const user = this.userMapping.getUserFromDeleteManyUser(deleteManyUserDto);
    const { role: roleId } = deleteManyUserDto;
    return this.manager.delete(User, { roleId });
  }
}
