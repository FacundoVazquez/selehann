import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/features/users/domain/entity/user.entity';
import { Password, Username } from 'src/features/users/domain/repository/user.repository';
import { UserDocument } from 'src/features/users/infrastructure/repository/mongodb/schemas/user.schema';
import { IAuthRepository } from '../../../domain/repository/auth.repository';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>, private readonly jwtService: JwtService) {}

  async validateUser(username: Username, password: Password): Promise<User> {
    const user = await this.userModel.findOne({ username });
    if (user?.verifyPassword(password)) return user;
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, role: user.role };
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }
}
