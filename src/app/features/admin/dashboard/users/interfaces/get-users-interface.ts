import { IUser } from "./user.interface";

export interface IGetUsers {
  success: boolean;
  message: string;
  data: IUserWithCount;
}

export interface IUserWithCount {
  users: IUser[];
  totalCount: number;
}
