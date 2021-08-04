import { RequestState } from 'src/features/_shared/data/interfaces';
import { LoginDto, RegisterDto, SessionDto } from './dto';

export interface AuthState {
  data: DataState;
}
export interface DataState {
  login?: RequestState<LoginDto, SessionDto>;
  register?: RequestState<RegisterDto, SessionDto>;
  getAccessToken?: RequestState<RegisterDto, Pick<SessionDto, 'accessToken'>>;
  session: Session;
}

export interface Session {
  username: string;
  accessToken: string;
  refreshToken: string;
  authenticated: boolean;
}
