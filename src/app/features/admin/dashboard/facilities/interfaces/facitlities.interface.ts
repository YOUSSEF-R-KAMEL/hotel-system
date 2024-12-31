export interface IFacility {
  _id: string;
  name: string ;
  createdBy: IFaciltityUser
  createdAt: string;
  updatedAt:string;
}

interface IFaciltityUser {
  _id: string;
  userName: string;
}
export interface IFacilityDataWithCount {
  facilities: IFacility[];
  totalCount: number;
}

export interface IFacilitiesResponse {
  message: string;
  success: boolean;
  data: IFacilityDataWithCount;
}
