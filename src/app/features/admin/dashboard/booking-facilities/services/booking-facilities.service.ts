import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../../../shared/interface/api-data-response/api-response.interface';
import { IParams } from '../../../../../shared/interface/params/params.interface';

@Injectable({
  providedIn: 'root',
})
export class BookingFacilitiesService {
  private _http = inject(HttpClient);
  getBookingFacilities(params: IParams): Observable<IApiResponse> {
    return this._http.get<IApiResponse>('admin/booking', {
      params: { ...params },
    });
  }
}
