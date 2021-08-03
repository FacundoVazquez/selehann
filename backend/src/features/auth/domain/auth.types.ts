import { Role } from 'src/features/_shared/domain/roles/role.enum';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshToken {
  username: string;
  role: Role;
  exp: number;
}
