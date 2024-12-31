import { IFacility } from "./facilities.interface";

export interface IGetFacilities {
  success: boolean;
  message: string;
  data: IFacilitiesWithCount;
}

export interface IFacilitiesWithCount {
  facilities: IFacility[];
  totalCount: number;
}
