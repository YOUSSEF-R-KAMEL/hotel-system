export interface Charts {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  rooms: number;
  facilities: number;
  bookings: Bookings;
  ads: number;
  users: Users;
}

export interface Bookings {
  pending: number;
  completed: number;
}

export interface Users {
  user: number;
  admin: number;
}

export interface ICard {
  name: string;
  number: number;
}
