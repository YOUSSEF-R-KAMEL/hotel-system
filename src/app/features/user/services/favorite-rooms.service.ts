import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../shared/interface/api-data-response/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class FavoriteRoomsService {
  constructor(private _HttpClient: HttpClient) {}
  getAllFavRooms(): Observable<IApiResponse> {
    return this._HttpClient.get<IApiResponse>('portal/favorite-rooms');
  }
}
