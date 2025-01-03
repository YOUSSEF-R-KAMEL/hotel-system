import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../../../shared/interface/api-data-response/api-response.interface';
import { IParams } from '../../../../../shared/interface/params/params.interface';
import { IGetRooms } from '../interfaces/get-rooms-interface';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  constructor(private _http: HttpClient) {}
  getRooms(params: IParams): Observable<IGetRooms> {
    return this._http.get<IGetRooms>('admin/rooms', {
      params: {
        page: params.page,
        size: params.size,
      },
    });
  }
  addRoom(room: FormData): Observable<IApiResponse> {
    return this._http.post<IApiResponse>('admin/rooms', room);
  }
  updateRoom(id: string, room: FormData): Observable<IApiResponse> {
    return this._http.put<IApiResponse>('admin/rooms/' + id, room);
  }
  deleteRoom(id: string): Observable<IApiResponse> {
    return this._http.delete<IApiResponse>('admin/rooms/' + id);
  }
  getFacilities(): Observable<IApiResponse> {
    return this._http.get<IApiResponse>('admin/room-facilities');
  }
  getRoom(id: string): Observable<IApiResponse> {
    return this._http.get<IApiResponse>('admin/rooms/' + id);
  }
}
