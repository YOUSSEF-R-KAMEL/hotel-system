export interface IUpdateResponse {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  ads: Ads;
}

export interface Ads {
  _id: string;
  isActive: boolean;
  room: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
