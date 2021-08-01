import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/features/users/application/service/user.service';
import { UserController } from 'src/features/users/infrastructure/adapters/controller/user.controller';
import { userSchema } from 'src/features/users/infrastructure/repository/mongodb/schemas/user.schema';
import { RoleMapping } from '../../application/mapping/role.mapping';
import { RoleProfile } from '../../application/mapping/role.profile';
import { UserMapping } from '../../application/mapping/user.mapping';
import { UserProfile } from '../../application/mapping/user.profile';
import { Role } from '../../domain/entity/role.entity';
import { User } from '../../domain/entity/user.entity';
import { roleSchema } from '../repository/mongodb/schemas/role.schema';
import { RoleRepositoryProvider } from '../repository/role.repository.provider';
import { UserRepositoryProvider } from '../repository/user.repository.provider';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: userSchema },
      { name: Role.name, schema: roleSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserMapping, UserProfile, RoleMapping, RoleProfile, UserService, UserRepositoryProvider, RoleRepositoryProvider],
  exports: [UserMapping, UserService, MongooseModule],
})
export class UsersModule {}
