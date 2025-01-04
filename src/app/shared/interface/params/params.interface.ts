export interface IParams {
  page: number;
  size: number;
}

export interface IRoomParams {
  page: number;
  size: number;
  startDate: Date | null;
  endDate: Date | null;
  capacity: number;
}
