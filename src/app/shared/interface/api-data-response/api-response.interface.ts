import { Ads } from '../../../features/admin/dashboard/ads/interfaces/IAdsResponse';
import { IBooking } from '../../../features/admin/dashboard/booking-facilities/interfaces/booking-facility.interface';
import { IFacility } from '../../../features/admin/dashboard/facilities/interfaces/facitlities.interface';
import { IRoom } from '../room /room.interface';
import { User } from '../user/IUserResponse';

export interface IApiResponse {
  success: boolean;
  message: string;
  data: IData;
}

export interface IData {
  users?: User[];
  facilities?: IFacility[];
  booking?: IBooking[];
  rooms?: IRoom[];
  room?: IRoom;
  ads?: Ads[];
  totalCount: number;
}
