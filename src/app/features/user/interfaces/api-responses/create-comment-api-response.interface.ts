export interface ICreateCommentApiResponse {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  roomComment: RoomComment;
}

export interface RoomComment {
  room: string;
  user: string;
  comment: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
