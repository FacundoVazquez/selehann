export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshToken {
  username: string;
  role: string;
  exp: number;
}
