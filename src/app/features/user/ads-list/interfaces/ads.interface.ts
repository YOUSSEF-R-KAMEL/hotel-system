export interface IAds {
  _id: string,
  isActive: boolean,
  room: {
    _id: string,
    roomNumber:string,
    price: string,
    capacity: string,
    discount: string,
    facilities: string[],
    createdBy: string,
    images: [],
    createdAt: string,
    updatedAt: string
  },
  createdBy: {
    _id: string,
    userName: string
  },
  createdAt: string,
  updatedAt: string
}
