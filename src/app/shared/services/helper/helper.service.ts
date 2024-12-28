import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserResponse } from '../../interfaces/IUserResponse';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private _HttpClient: HttpClient) {}
  onGetUser(id: string): Observable<IUserResponse> {
    return this._HttpClient.get<IUserResponse>(`admin/users/${id}`);
  }
}
