import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/domain/dto/users/create-user.dto';
import { DeleteManyUserDto } from 'src/domain/dto/users/deleteMany-user.dto';
import { DeleteOneUserDto } from 'src/domain/dto/users/deleteOne-user.dto';
import { FindManyUserDto } from 'src/domain/dto/users/findMany-user.dto';
import { FindOneUserDto } from 'src/domain/dto/users/findOne-user.dto';
import { UpdateUserDto } from 'src/domain/dto/users/update-user.dto';
import { User, UserDocument } from 'src/domain/schemas/users/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = new this.userModel(dto);
    return user.save();
  }

  async find(dto: FindOneUserDto): Promise<User> {
    return this.userModel.findOne({ ...dto });
  }

  async findMany(dto: FindManyUserDto): Promise<User[]> {
    return this.userModel.find({ ...dto });
  }

  async delete(dto: DeleteOneUserDto) {
    return this.userModel.deleteOne({ ...dto });
  }

  async deleteMany(dto: DeleteManyUserDto) {
    return this.userModel.deleteMany({ ...dto });
  }

  async update(findOneUserDto: FindOneUserDto, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findOneAndUpdate({ ...findOneUserDto }, updateUserDto, { returnOriginal: false });
  }
}
