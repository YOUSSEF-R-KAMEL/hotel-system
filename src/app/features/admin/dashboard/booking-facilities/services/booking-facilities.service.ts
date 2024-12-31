import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../../../shared/interface/api-data-response/api-response.interface';
import { IParams } from '../../users/interfaces/user-params.interface';

@Injectable({
  providedIn: 'root'
})
export class BookingFacilitiesService {
  constructor(private _http: HttpClient) { }

  getBookingFacilities(params: IParams): Observable<IApiResponse> {
    return this._http.get<IApiResponse>('admin/booking', { params: { ...params } });
  }

}
