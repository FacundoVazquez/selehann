import { User } from 'src/features/users/domain/entity/user.entity';
import { Password, Username } from 'src/features/users/domain/repository/user.repository';

export interface IAuthRepository {
  validateUser(username: Username, password: Password): Promise<User>;
}
