import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin, LoginResponse } from '../interfaces/ILogin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  onLogin(data: ILogin): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('admin/users/login', data);
  }
  register(data: FormData) {
    return this.http.post('Users/Register', data);
  }
}
