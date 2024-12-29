import { Ads } from './IAdsResponse';

export interface IUpdateResponse {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  ads: Ads;
}
