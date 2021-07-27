import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/features/users/application/service/user.service';
import { UserController } from 'src/features/users/infrastructure/adapters/controller/user.controller';
import { userSchema } from 'src/features/users/infrastructure/database/schemas/user.schema';
import { UserMapping } from '../../application/mapping/user.mapping';
import { UserProfile } from '../../application/mapping/user.profile';
import { User } from '../../domain/entity/userModel';
import { UserRepositoryProvider } from '../repository/user.repository.provider';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: userSchema }])],
  controllers: [UserController],
  providers: [UserMapping, UserProfile, UserService, UserRepositoryProvider],
})
export class UsersModule {}
