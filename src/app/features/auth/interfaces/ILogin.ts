export interface ILogin {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  user: User;
  token: string;
}

export interface User {
  _id: string;
  userName: string;
  role: string;
}
