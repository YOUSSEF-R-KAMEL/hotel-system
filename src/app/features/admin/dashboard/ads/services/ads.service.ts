import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IParams } from '../../users/interfaces/user-params.interface';
import { IAdsResponse } from '../interfaces/IAdsResponse';
import { IUpdateResponse } from '../interfaces/IUpdateResponse.ts';

@Injectable({
  providedIn: 'root',
})
export class AdsService {
  constructor(private _HttpClient: HttpClient) {}
  onGetAllAds(params: IParams): Observable<IAdsResponse> {
    return this._HttpClient.get<IAdsResponse>('admin/ads', {
      params: { ...params },
    });
  }
  onAdsDetails(id: number): Observable<IAdsResponse> {
    return this._HttpClient.get<IAdsResponse>(`admin/ads/${id}`);
  }
  onUpdateAds(id: number, data: any): Observable<IUpdateResponse> {
    return this._HttpClient.put<IUpdateResponse>(`admin/ads/${id}`, { data });
  }

  onDeleteAds(id: number): Observable<any> {
    return this._HttpClient.delete<IUpdateResponse>(`admin/ads/${id}`);
  }
  onCreateAds(data: any): Observable<Ads> {
    return this._HttpClient.post<Ads>('admin/ads', {
      data,
    });
  }
}
