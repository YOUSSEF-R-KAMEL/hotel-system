import { Ads } from "../../../features/admin/dashboard/ads/interfaces/IAdsResponse";
import { IBooking } from "../../../features/admin/dashboard/booking-facilities/interfaces/booking-facility.interface";
import { IFacility } from "../../../features/admin/dashboard/facilities/interfaces/facitlities.interface";
import { IRoom } from "../../../features/admin/dashboard/rooms/interfaces/room.interface";
import { IUser } from "../../../features/admin/dashboard/users/interfaces/user.interface";

export interface IApiResponse {
  success: boolean;
  message: string;
  data: IData;
}

export interface IData {
  users?: IUser[];
  facilities?: IFacility[];
  booking?: IBooking[];
  rooms?: IRoom[];
  room?: IRoom
  ads?: Ads[];
  totalCount: number;
}
