export interface IBookingApiResponse {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  booking: Booking;
}

export interface Booking {
  startDate: string;
  endDate: string;
  totalPrice: number;
  user: string;
  room: string;
  status: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
