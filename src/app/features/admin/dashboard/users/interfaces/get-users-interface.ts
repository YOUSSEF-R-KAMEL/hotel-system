import { User } from '../../../../../shared/interface/user/IUserResponse';

export interface IGetUsers {
  success: boolean;
  message: string;
  data: IUserWithCount;
}

export interface IUserWithCount {
  users: User[];
  totalCount: number;
}
