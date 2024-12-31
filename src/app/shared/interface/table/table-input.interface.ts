import { IData } from "../api-data-response/api-response.interface";

export interface ITableAction {
  type: 'icon' | 'button';
  color?: string;
  label?: string;
  icon?: string;
  callback: (row: any) => void;
}

export interface ITableInput {
  data: IData;
  actions: ITableAction[];
}


