import { IRoom } from "./room.interface";

export interface IGetFacilities {
  success: boolean;
  message: string;
  data: IFacilitiesWithCount;
}

export interface IFacilitiesWithCount {
  facilities: IRoom[];
  totalCount: number;
}
