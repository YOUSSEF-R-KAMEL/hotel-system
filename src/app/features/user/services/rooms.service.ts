import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../shared/interface/api-data-response/api-response.interface';
import { IParams } from '../../../shared/interface/params/params.interface';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  constructor(private _HttpClient: HttpClient) {}
  getAllRooms(params: IParams): Observable<IApiResponse> {
    return this._HttpClient.get<IApiResponse>('portal/rooms/available', {params: {...params}});
  }
}
