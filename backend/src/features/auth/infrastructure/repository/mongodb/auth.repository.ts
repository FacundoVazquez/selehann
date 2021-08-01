import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PasswordValidationFailedException } from 'src/features/auth/application/exceptions/auth.exceptions';
import { User } from 'src/features/users/domain/entity/user.entity';
import { Password, Username } from 'src/features/users/domain/repository/user.repository';
import { UserDocument } from 'src/features/users/infrastructure/repository/mongodb/schemas/user.schema';
import { IAuthRepository } from '../../../domain/repository/auth.repository';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async validateUser(username: Username, password: Password): Promise<User> {
    const user = await this.userModel.findOne({ username });
    console.log(user);
    console.log(password);
    if (user?.verifyPassword(password)) return user;

    throw new PasswordValidationFailedException();
  }
}
