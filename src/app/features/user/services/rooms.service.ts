import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../shared/interface/api-data-response/api-response.interface';
import { IRoomParams } from '../../../shared/interface/params/params.interface';
import { IRoom } from '../../../shared/interface/room/room.interface';
import { IApiRoomResponse } from '../interfaces/api-response-room.interface';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  constructor(private _HttpClient: HttpClient) { }
  getAllRooms(params: IRoomParams): Observable<IApiResponse> {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        httpParams = httpParams.set(
          key,
          value instanceof Date ? value.toISOString() : value.toString()
        );
      }
    });
    return this._HttpClient.get<IApiResponse>('portal/rooms/available', { params: httpParams });
  }
  getRoomDetails(id:string):Observable<IApiRoomResponse>{
    return this._HttpClient.get<IApiRoomResponse>('portal/rooms/' + id)
  }
}
