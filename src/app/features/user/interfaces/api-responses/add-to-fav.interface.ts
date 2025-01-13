export interface IAddFavoriteRoom {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  favoriteRoom: FavoriteRoom;
}
export interface FavoriteRoom {
  _id: string;
  rooms: string[];
  user: string;
  createdAt: string;
  updatedAt: string;
}
