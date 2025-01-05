interface ICreatedBy {
  _id: string;
  userName: string;
}

interface IFacility {
  _id: string;
  name: string;
}

export interface IRoom {
  _id: string;
  capacity: number;
  createdAt: string;
  createdBy: ICreatedBy;
  discount: number;
  facilities: IFacility[];
  images: string[];
  price: number;
  roomNumber: string;
  updatedAt: string;
  isBooked?: boolean;
}
