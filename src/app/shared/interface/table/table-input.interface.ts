
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

interface IData {
  data: any[];
  totalCount: number;
}
