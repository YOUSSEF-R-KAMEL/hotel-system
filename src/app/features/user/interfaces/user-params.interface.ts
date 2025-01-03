import { IParams } from '../../../shared/interface/params/params.interface';

export interface IUserParams extends IParams {
  startDate: string;
  endDate: string;
}
