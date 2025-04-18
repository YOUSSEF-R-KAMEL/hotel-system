import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../../shared/interface/api-data-response/api-response.interface';
import { IRoomParams } from '../../../../shared/interface/params/params.interface';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  private _HttpClient = inject(HttpClient);
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
  getRoomDetails(id:string):Observable<IApiResponse>{
    return this._HttpClient.get<IApiResponse>('portal/rooms/' + id)
  }

  getRoomReviews(id: string): Observable<IApiResponse> {
    return this._HttpClient.get<IApiResponse>('portal/room-reviews/' + id );
  }
}
