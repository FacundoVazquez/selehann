import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from 'src/app/config/configuration/configuration';
import { User } from 'src/features/users/domain/entities/user.entity';
import { UsersModule } from 'src/features/users/infrastructure/di/user.module';
import { AuthService } from '../../application/auth.services';
import { AuthController } from '../adapters/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: configuration.jwt.secret,
      signOptions: { expiresIn: configuration.jwt.accessToken.duration },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
