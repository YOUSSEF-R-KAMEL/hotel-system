export interface ICommentApiResponse {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  roomComments: RoomComment[];
  totalCount: number;
}

export interface RoomComment {
  _id: string;
  room: Room;
  user: User;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface Room {
  _id: string;
  roomNumber: string;
}

export interface User {
  _id: string;
  userName: string;
  profileImage: string;
}
