import { Ads } from '../../../features/admin/dashboard/ads/interfaces/IAdsResponse';
import { IBooking } from '../../../features/admin/dashboard/booking-facilities/interfaces/booking-facility.interface';
import { IFacility } from '../../../features/admin/dashboard/facilities/interfaces/facitlities.interface';
import { IFavoriteRooms } from '../../../features/user/interfaces/favorite-rooms-interface';
import { IGetRoomReview } from '../../../features/user/interfaces/room-review.interface';
import { IRoom } from '../room/room.interface';
import { IUser } from '../user/IUserResponse';

export interface IApiResponse {
  success: boolean;
  message: string;
  data: IData;
}

export interface IData {
  users?: IUser[];
  facilities?: IFacility[];
  bookings?: IBooking[];
  booking?: IBooking;
  rooms?: IRoom[];
  user?: IUser;
  room?: IRoom;
  ads?: Ads[];
  favoriteRooms?: IFavoriteRooms[];
  totalCount: number;
  token?: string;
  roomReviews?: IGetRoomReview[];
}
