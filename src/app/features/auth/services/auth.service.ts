import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ILogin, LoginResponse } from '../interfaces/ILogin';
import { User } from '../../../shared/interface/user.interface';
import { IApiResponse } from '../../../shared/interface/api-data-response/api-response.interface';
import { HelperService } from '../../../shared/services/helpers/helper.service';
import { IUser } from '../../../shared/interface/user/IUserResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<IUser | undefined | null>(null);
  user$ = this.userSubject.asObservable();
  role: string | null = '';
  constructor(private http: HttpClient, private helperService: HelperService) {
    this.getProfile();
  }
  getProfile() {
    this.getRole();
  }
  getRole(): string | null {
    if (this.helperService.isPlatformBrowser()) {
      if (
        localStorage.getItem('role') !== null &&
        localStorage.getItem('token') !== null
      ) {
        this.role = localStorage.getItem('role');
      }
    }
    return this.role;
  }
  onLogin(data: ILogin): Observable<IApiResponse> {
    return this.http.post<IApiResponse>('admin/users/login', data).pipe(tap((res) => {
      if (res.data.user) {
        this.userSubject.next(res.data.user);
      }
    }));
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

}
