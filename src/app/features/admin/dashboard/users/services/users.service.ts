import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserResponse } from '../../../../../shared/interfaces/IUserResponse';
import { IGetUsers } from '../interfaces/get-users-interface';
import { IParams } from '../interfaces/user-params.interface';

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
