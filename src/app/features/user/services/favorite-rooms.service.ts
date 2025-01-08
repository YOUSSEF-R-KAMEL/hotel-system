import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../shared/interface/api-data-response/api-response.interface';
import { IAddFavoriteRoom } from '../interfaces/add-to-fav.interface';

@Injectable({
  providedIn: 'root',
})
export class FavoriteRoomsService {
  constructor(private _HttpClient: HttpClient) {}
  getAllFavRooms(): Observable<IApiResponse> {
    return this._HttpClient.get<IApiResponse>('portal/favorite-rooms');
  }
  addRoomToFavorite(roomId: string): Observable<IAddFavoriteRoom> {
    return this._HttpClient.post<IAddFavoriteRoom>('portal/favorite-rooms', {
      roomId,
    });
  }
  deleteFavRoom(roomId: string): Observable<IAddFavoriteRoom> {
    return this._HttpClient.delete<IAddFavoriteRoom>(
      `portal/favorite-rooms/${roomId}`
    );
  }
}
