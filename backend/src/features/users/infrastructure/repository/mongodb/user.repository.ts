import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Id } from 'src/app/interfaces';
import { LoginDto } from 'src/features/auth/application/dto';
import { UserMapping } from 'src/features/users/application/mapping/user.mapping';
import { User } from 'src/features/users/domain/entity/user.entity';
import { IUserRepository } from 'src/features/users/domain/repository/user.repository';
import { UserDocument } from '../../database/schemas/user.schema';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>, private readonly userMapping: UserMapping) {}

  async create(entity: Partial<User>): Promise<User> {
    const submittedUser = new this.userModel(entity);
    console.log('*******************');
    const result = (await submittedUser.save())?.toJSON();
    console.log('*******************', result);
    const user = this.userMapping.getUser(result);
    return user;
  }

  async findOne(entity: Partial<User>): Promise<User> {
    console.log(entity);
    const result = (await this.userModel.findOne(entity))?.toJSON();
    const user = this.userMapping.getUser(result);
    return user;
  }

  async findMany(entity: Partial<User>): Promise<User[]> {
    console.log(entity);
    const users = (await this.userModel.find(entity))?.map((u) => this.userMapping.getUser(u.toJSON()));
    return users;
  }

  async update(id: Id, entity: Partial<User>): Promise<User> {
    const result = (await this.userModel.findOneAndUpdate({ id }, entity, { returnOriginal: false }))?.toJSON();
    const user = this.userMapping.getUser(result);
    return user;
  }

  async delete(id: Id): Promise<boolean> {
    const result = await this.userModel.deleteOne({ id });
    return result.ok === 1;
  }

  async deleteMany(entity: Partial<User>): Promise<boolean> {
    const result = await this.userModel.deleteMany(entity);
    return result.ok === 1;
  }

  async validateUser(loginDto: LoginDto): Promise<boolean> {
    const { username, password } = loginDto;
    const result = (await this.userModel.findOne({ username })).validatePassword(password);
    return result;
  }
}
