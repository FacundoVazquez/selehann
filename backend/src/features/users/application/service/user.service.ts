import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repository/user.repository';
import { CreateUserDto, DeleteManyUserDto, DeleteOneUserDto, FindManyUserDto, FindOneUserDto, UpdateUserDto } from '../dto';
import { UserMapping } from '../mapping/user.mapping';

@Injectable({})
export class UserService {
  constructor(private readonly userMapping: UserMapping, @Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository) {}

  createUser(createUserDto: CreateUserDto) {
    const user = this.userMapping.getUserFromCreateUser(createUserDto);
    return this.userRepository.create(user);
  }

  findUser(findOneUserDto: FindOneUserDto) {
    const user = this.userMapping.getUserFindOneUser(findOneUserDto);
    return this.userRepository.findOne(user);
  }

  findUsers(findManyUserDto: FindManyUserDto) {
    const user = this.userMapping.getUserFindManyUser(findManyUserDto);
    return this.userRepository.findMany(user);
  }

  updateUser(findOneUserDto: FindOneUserDto, updateUserDto: UpdateUserDto) {
    const id = findOneUserDto.id;
    const user = this.userMapping.getUserUpdateUser(updateUserDto);
    return this.userRepository.update(id, user);
  }

  deleteUser(deleteOneUserDto: DeleteOneUserDto) {
    const id = deleteOneUserDto.id;
    return this.userRepository.delete(id);
  }

  deleteUsers(deleteManyUserDto: DeleteManyUserDto) {
    const user = this.userMapping.getUserDeleteManyUser(deleteManyUserDto);
    return this.userRepository.deleteMany(user);
  }
}
