export interface IAdsResponse {
  success: boolean;
  message: string;
  data: IAdsData;
}

export interface IAdsData {
  ads: Ads[];
  totalCount: number;
}

export interface Ads {
  _id: string;
  isActive: boolean;
  room: Room;
  createdBy: CreatedBy;
  createdAt: string;
  updatedAt: string;
}

export interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: string[];
  createdBy: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreatedBy {
  _id: string;
  userName: string;
}
