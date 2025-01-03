import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
import { ILogin, LoginResponse } from '../interfaces/ILogin';
import { IUserResponse } from '../../../shared/interfaces/IUserResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<IUserResponse | null>(null);
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

  getAdmin(id: string): Observable<IUserResponse> {
    return this.http.get<IUserResponse>('admin/users/' + id);
  }

  getUser(id: string): Observable<IUserResponse> {
    return this.http.get<IUserResponse>('portal/users/' + id).pipe(
      tap((res) => {
        this.userSubject.next(res);
      }),
      shareReplay(1)
    );}
}
