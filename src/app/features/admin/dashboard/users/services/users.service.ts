import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserParams } from '../interfaces/user-params.interface';
import { Observable } from 'rxjs';
import { IGetUsers } from '../interfaces/get-users-interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http: HttpClient) { }

  getUsers(params: IUserParams): Observable<IGetUsers> {
    return this._http.get<IGetUsers>('admin/users', {
      params: {
        page: params.page,
        size: params.size
      }
    });
  }
}
