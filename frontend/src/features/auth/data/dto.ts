export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto extends LoginDto {
  repeatedPassword: string;
  role: string;
}

export interface FetchAccessTokenDto {
  refreshToken: string;
}

export interface SessionDto {
  accessToken: string;
  refreshToken: string;
}
