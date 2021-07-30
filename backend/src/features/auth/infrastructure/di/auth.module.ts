import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { configuration } from 'src/app/config/configuration/configuration';
import { UsersModule } from 'src/features/users/infrastructure/di/user.module';
import { AuthService } from '../../application/service/auth.service';
import { AuthController } from '../adapters/controller/auth.controller';
import { AuthRepositoryProvider } from '../repository/auth.repository.provider';
import { LocalStrategy } from '../strategies/basic.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: configuration.jwt.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthRepositoryProvider],
})
export class AuthModule {}
