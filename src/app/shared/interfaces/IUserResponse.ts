export interface IUserResponse {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  user: User;
}

export interface User {
  _id: string;
  userName: string;
  email: string;
  phoneNumber: number;
  country: string;
  role: string;
  profileImage: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}
