import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetFacilities } from '../interfaces/get-facilities-interface';
import { IGetRooms } from '../interfaces/get-rooms-interface';
import { IRoomParams } from '../interfaces/room-params.interface';
import { IRoom } from '../interfaces/room.interface';
import { IData } from '../../../../../shared/interface/api-data-response/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  constructor(private _http: HttpClient) { }
  getRooms(params: IRoomParams): Observable<IGetRooms> {
    return this._http.get<IGetRooms>('admin/rooms', {
      params: {
        page: params.page,
        size: params.size
      }
    });
  }
  addRoom(room: FormData) {
    return this._http.post('admin/rooms', room)
  }
  updateRoom(id: string, room: FormData) {
    return this._http.put('admin/rooms' + id, room)
  }
  deleteRoom(id: string) {
    return this._http.delete('admin/rooms' + id);
  }
  getFacilities() {
    return this._http.get<IGetFacilities>('admin/room-facilities')
  }
  getRoom(id: string) {
    return this._http.get<any>('admin/rooms/' + id)
  }
}
