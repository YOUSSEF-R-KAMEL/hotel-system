export interface  IFacility{
  _id: string;
  createdAt: string;
  createdBy: {
    _id:string,
    userName:string
  };
  name: string;
  updatedAt: string;
}


