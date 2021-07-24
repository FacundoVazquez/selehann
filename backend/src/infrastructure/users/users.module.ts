import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from 'src/app/users/users.controller';
import { User, UserSchema } from 'src/domain/schemas/users/user.schema';
import { UsersService } from 'src/domain/services/users/users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
