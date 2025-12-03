export interface AuthUser {
  userId: number;
  name: string;
  email: string;
  password: string;
  token: string;
}

export interface ConnectedUser {
  userId: number;
  name: string;
  token: string;
}
