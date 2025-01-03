import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
import { ILogin, LoginResponse } from '../interfaces/ILogin';
import { User } from '../../../shared/interface/user.interface';
import { IApiResponse } from '../../../shared/interface/api-data-response/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | undefined | null>(null);
  user$ = this.userSubject.asObservable();
  role: string | null = '';
  constructor(private http: HttpClient, private _Router: Router) {
    this.getProfile();
  }
  getProfile() {
    this.getRole();
  }
  getRole(): string | null {
    if (
      localStorage.getItem('role') !== null &&
      localStorage.getItem('token') !== null
    ) {
      this.role = localStorage.getItem('role');
    }
    return this.role;
  }
  onLogin(data: ILogin): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('admin/users/login', data);
  }
  onRegister(data: FormData) {
    return this.http.post('portal/users', data);
  }
  onReqResPassword(data: FormData) {
    return this.http.post('portal/users/forgot-password', data);
  }

  onResPassword(data: FormData) {
    return this.http.post('portal/users/reset-password', data);
  }
  onLogout(): void {
    localStorage.clear();
    this.userSubject.next(null);
  }

  getAdmin(id: string): Observable<IApiResponse> {
    return this.http.get<IApiResponse>('admin/users/' + id);
  }

  getUser(id: string): Observable<IApiResponse> {
    return this.http.get<IApiResponse>('portal/users/' + id).pipe(
      tap((res) => {
        this.userSubject.next(res.data.user);
      }),
      shareReplay(1)
    );}
}
