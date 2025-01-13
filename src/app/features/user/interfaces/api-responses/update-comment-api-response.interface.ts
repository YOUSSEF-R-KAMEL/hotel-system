export interface IUpdateCommentApiResponse {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  comment: Comment;
}

export interface Comment {
  _id: string;
  room: string;
  user: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}
