import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IParams } from '../../../../../shared/interface/params/params.interface';
import { IApiResponse } from '../../../../../shared/interface/api-data-response/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _http: HttpClient) {}

  getUsers(params: IParams): Observable<IApiResponse> {
    return this._http.get<IApiResponse>('admin/users', {
      params: {
        page: params.page,
        size: params.size,
      },
    });
  }
  getCurrentUser(id: string): Observable<IApiResponse> {
    return this._http.get<IApiResponse>(`admin/users/${id}`);
  }
}
