import { IParams } from '../../../shared/interface/params/params.interface';

export interface IUserParams extends IParams {
  startDate?: Date;
  endDate?: Date;
}
