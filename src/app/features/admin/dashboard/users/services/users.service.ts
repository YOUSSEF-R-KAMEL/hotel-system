import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserResponse } from '../../../../../shared/interface/IUserResponse';
import { IParams } from '../../../../../shared/interface/params.interface';
import { IGetUsers } from '../interfaces/get-users-interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _http: HttpClient) {}

  getUsers(params: IParams): Observable<IGetUsers> {
    return this._http.get<IGetUsers>('admin/users', {
      params: {
        page: params.page,
        size: params.size,
      },
    });
  }
  getCurrentUser(id: string): Observable<IUserResponse> {
    return this._http.get<IUserResponse>(`admin/users/${id}`);
  }
}
