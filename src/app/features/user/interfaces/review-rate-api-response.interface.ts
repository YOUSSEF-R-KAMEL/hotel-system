export interface IReviewRateApiResponse {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  roomReviews: RoomReview[];
  totalCount: number;
}

export interface RoomReview {
  _id: string;
  room: Room;
  user: User;
  rating: number;
  review: string;
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
