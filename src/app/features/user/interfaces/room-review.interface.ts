export interface ICreateRoomReview {
  roomId: string;
  rating: number;
  review: string;
}

export interface IGetRoomReview {
  _id: string;
  room: {
    _id: string;
    roomNumber: string
  };
  user: {
    _id: string;
    userName: string;
    profileImage: string
  };
  rating: number;
  review: string;
  createdAt: string;
  updatedAt: string;
}
