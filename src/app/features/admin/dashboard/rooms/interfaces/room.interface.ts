export interface IRoom {
  _id: string;
  capacity: string;
  createdAt: string;
  createdBy: string
  discount: string;
  facilities: [
    {
      _id:string,
      name:string
    }
  ];
  images: string[];
  price: string;
  roomNumber: string;
  updatedAt: string;
}


