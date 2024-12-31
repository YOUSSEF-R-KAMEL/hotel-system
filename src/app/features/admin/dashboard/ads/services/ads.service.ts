import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IParams } from '../../users/interfaces/user-params.interface';
import { Ads, IAdsResponse } from '../interfaces/IAdsResponse';
import { IUpdateAd } from '../interfaces/IUpdateAd';
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
  onAdsDetails(data: Ads): Observable<IAdsResponse> {
    return this._HttpClient.get<IAdsResponse>(`admin/ads/${data._id}`);
  }
  onUpdateAds(id: string, data: IUpdateAd): Observable<IUpdateResponse> {
    return this._HttpClient.put<IUpdateResponse>(`admin/ads/${id}`, data);
  }

  onDeleteAds(data: Ads): Observable<any> {
    return this._HttpClient.delete<IUpdateResponse>(`admin/ads/${data._id}`);
  }
  onCreateAds(data: Ads): Observable<Ads> {
    return this._HttpClient.post<Ads>('admin/ads',data);
  }
}
