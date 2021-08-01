import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { configuration } from 'src/app/config/configuration/configuration';
import { UsersModule } from 'src/features/users/infrastructure/di/user.module';
import { UserRepositoryProvider } from 'src/features/users/infrastructure/repository/user.repository.provider';
import { AuthService } from '../../application/service/auth.service';
import { ACCESS_TOKEN_DURATION } from '../../domain/auth.constants';
import { AuthController } from '../adapters/controller/auth.controller';
import { AuthRepositoryProvider } from '../repository/auth.repository.provider';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: configuration.jwt.secret,
      signOptions: { expiresIn: ACCESS_TOKEN_DURATION },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, /* LocalStrategy, JwtStrategy,  */ AuthRepositoryProvider, UserRepositoryProvider],
})
export class AuthModule {}
