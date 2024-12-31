import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRoomParams } from '../interfaces/room-params.interface';
import { Observable } from 'rxjs';
import { IGetRooms } from '../interfaces/get-rooms-interface';
import { IRoom } from '../interfaces/room.interface';
import { IGetFacilities } from '../interfaces/get-facilities-interface';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  constructor(private _http:HttpClient) {}
  getRooms(params: IRoomParams): Observable<IGetRooms> {
    return this._http.get<IGetRooms>('admin/rooms', {
      params: {
        page: params.page,
        size: params.size
      }
    });
  }
  addNewRoom(data:IRoom){
    return this._http.post('admin/rooms', data)
  }
  getFacilities(){
    return this._http.get<IGetFacilities>('admin/room-facilities')
  }
}
