import { IRoom } from '../../../shared/interface/room/room.interface';
export interface IApiRoomResponse {
  success: boolean;
  message: string;
  data: {
    room: IRoom;
  };
}

