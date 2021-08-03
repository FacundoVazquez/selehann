import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/features/users/application/user.services';
import { UserController } from 'src/features/users/infrastructure/adapters/user.controller';
import { RoleMapping } from '../../application/mapping/role.mapping';
import { RoleProfile } from '../../application/mapping/role.profile';
import { UserMapping } from '../../application/mapping/user.mapping';
import { UserProfile } from '../../application/mapping/user.profile';
import { User } from '../../domain/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserMapping, UserProfile, RoleMapping, RoleProfile, UserService],
  exports: [UserMapping, UserService, TypeOrmModule],
})
export class UsersModule {}
