import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IParams } from '../../../../../shared/interface/params.interface';
import { IFacilitiesResponse } from '../interfaces/facitlities.interface';

@Injectable({
  providedIn: 'root',
})
export class FacilitiesService {
  constructor(private _http: HttpClient) {}
  getFacilities(params: IParams): Observable<IFacilitiesResponse> {
    return this._http.get<IFacilitiesResponse>('admin/room-facilities', {
      params: {
        ...params,
      },
    });
  }

  addFacility(name: string) {
    return this._http.post('admin/room-facilities', { name });
  }

  updateFacility(id: string, name: string) {
    return this._http.put('admin/room-facilities/' + id, { name });
  }

  deleteFacility(id: string) {
    return this._http.delete(`admin/room-facilities/${id}`);
  }
}
