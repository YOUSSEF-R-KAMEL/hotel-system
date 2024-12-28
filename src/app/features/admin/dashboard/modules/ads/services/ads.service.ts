import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAdsResponse } from '../interfaces/IAdsResponse';
import { IUpdateResponse } from '../interfaces/IUpdateResponse.ts';

@Injectable({
  providedIn: 'root',
})
export class AdsService {
  constructor(private _HttpClient: HttpClient) {}
  onGetAllAds(): Observable<IAdsResponse> {
    return this._HttpClient.get<IAdsResponse>('admin/ads');
  }

  onUpdateAds(id: number, data: any): Observable<IUpdateResponse> {
    return this._HttpClient.put<IUpdateResponse>(`admin/ads/${id}`, { data });
  }

  onDeleteAds(id: number): Observable<any> {
    return this._HttpClient.delete<IUpdateResponse>(`admin/ads/${id}`);
  }
}
