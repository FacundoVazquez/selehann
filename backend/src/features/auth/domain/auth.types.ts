import { Role } from 'src/features/_shared/domain/roles/role.enum';

export interface RefreshToken {
  username: string;
  role: Role;
  exp: number;
}
