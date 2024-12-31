export interface IBooking {
  _id: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  user: IUser;
  room: IRoom;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface IRoom {
  _id: string;
  roomNumber: string;
}
interface IUser {
  _id: string;
  userName: string;
}
