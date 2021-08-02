import { Inject, Injectable } from '@nestjs/common';
import { IRoleRepository, IUserRepository } from '../../domain/repository/user.repository';
import { ROLE_REPOSITORY } from '../../infrastructure/repository/role.repository.provider';
import { USER_REPOSITORY } from '../../infrastructure/repository/user.repository.provider';
import { CreateUserDto, DeleteManyUserDto, DeleteOneUserDto, FindManyUserDto, FindOneUserDto, UpdateUserDto } from '../dto';
import { UserMapping } from '../mapping/user.mapping';

@Injectable()
export class UserService {
  constructor(
    private readonly userMapping: UserMapping,
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    @Inject(ROLE_REPOSITORY) private readonly roleRepository: IRoleRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const role = createUserDto.role;
    const partialUser = this.userMapping.getUserFromCreateUser(createUserDto, role);
    const user = await this.userRepository.create(partialUser);
    const userDto = this.userMapping.getUserDto(user);
    return userDto;
  }

  async findUser(findOneUserDto: FindOneUserDto) {
    const filter = this.userMapping.getUserFromFindOneUser(findOneUserDto);
    const user = await this.userRepository.findOne(filter);
    const userDto = this.userMapping.getUserDto(user);
    return userDto;
  }

  async findUsers(findManyUserDto: FindManyUserDto) {
    const filter = this.userMapping.getUserFromFindManyUser(findManyUserDto);
    const users = await this.userRepository.findMany(filter);
    const usersDto = users.map((u) => this.userMapping.getUserDto(u));
    return usersDto;
  }

  async updateUser(findOneUserDto: FindOneUserDto, updateUserDto: UpdateUserDto) {
    const id = findOneUserDto.id;
    const user = this.userMapping.getUserFromUpdateUser(updateUserDto);
    const userDocument = await this.userRepository.update(id, user);
    return this.userMapping.getUserDto(userDocument);
  }

  async deleteUser(deleteOneUserDto: DeleteOneUserDto) {
    const id = deleteOneUserDto.id;
    return this.userRepository.delete(id);
  }

  async deleteUsers(deleteManyUserDto: DeleteManyUserDto) {
    const user = this.userMapping.getUserFromDeleteManyUser(deleteManyUserDto);
    return this.userRepository.deleteMany(user);
  }
}
