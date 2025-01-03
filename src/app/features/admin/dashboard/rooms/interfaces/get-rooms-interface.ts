import { IRoom } from '../../../../../shared/interface/room /room.interface';

export interface IGetRooms {
  success: boolean;
  message: string;
  data: IRoomWithCount;
}

export interface IRoomWithCount {
  rooms: IRoom[];
  totalCount: number;
}
