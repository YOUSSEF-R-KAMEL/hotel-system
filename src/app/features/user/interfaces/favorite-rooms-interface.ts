import { IRoom } from '../../../shared/interface/room/room.interface';

export interface IFavoriteRooms {
  _id: string;
  rooms: IRoom[];
  user: User;
  createdAt: string;
  updatedAt: string;
}
export interface User {
  _id: string;
  userName: string;
}
