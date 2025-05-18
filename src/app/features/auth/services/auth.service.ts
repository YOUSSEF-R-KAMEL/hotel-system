import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { IApiResponse } from '../../../shared/interface/api-data-response/api-response.interface';
import { ILogin, User } from '../interfaces/ILogin';
import { HelperService } from './../../../shared/services/helpers/helper.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  private roleSubject = new BehaviorSubject<string | null>(null);
  private tokenExpirationTimer: any;
  private http = inject(HttpClient);
  private helperService = inject(HelperService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  constructor() {
    this.loadUserFromLocalStorage();
  }

  get user$() {
    return this.userSubject.asObservable();
  }

  get role() {
    return this.roleSubject.asObservable();
  }

  getRole() {
    return this.roleSubject.getValue();
  }

  updateUser(user: User | null): void {
    this.userSubject.next(user);
    this.roleSubject.next(user?.role || null);
  }

  private loadUserFromLocalStorage(): void {
    if (this.helperService.isPlatformBrowser()) {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      const userName = localStorage.getItem('userName');
      if (token && role && userName) {
        // Verify token validity before loading user
        if (!this.isTokenExpired()) {
          const user: User = {
            _id: localStorage.getItem('userId') || '',
            userName,
            role,
          };
          this.updateUser(user);
          this.setAutoLogout();
        } else {
          this.onLogout();
        }
      }
    }
  }

  onLogin(data: ILogin): Observable<IApiResponse> {
    return this.http.post<IApiResponse>('admin/users/login', data);
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
    if (this.helperService.isPlatformBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
    }
    this.updateUser(null);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.userSubject.getValue() && !this.isTokenExpired();
  }

  getAdmin(id: string): Observable<IApiResponse> {
    return this.http.get<IApiResponse>('admin/users/' + id);
  }

  getUser(id: string): Observable<IApiResponse> {
    return this.http.get<IApiResponse>('portal/users/' + id);
  }

  private parseJwt(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  isTokenExpired(): boolean {
    if (!this.helperService.isPlatformBrowser()) {
      return true;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      return true;
    }

    try {
      const decodedToken = this.parseJwt(token);
      if (!decodedToken) {
        return true;
      }

      const expirationDate = new Date(decodedToken.exp * 1000);
      const isExpired = new Date() > expirationDate;

      if (isExpired) {
        this.onLogout();
        return true;
      }

      return false;
    } catch {
      return true;
    }
  }

  checkAuthenticationStatus(): boolean {
    if (!this.helperService.isPlatformBrowser()) {
      return false;
    }

    const token = localStorage.getItem('token');
    if (!token || this.isTokenExpired()) {
      this.onLogout();
      this.router.navigate(['/auth']);
      this.toastr.error('Your session has expired. Please log in again.');
      return false;
    }
    return true;
  }

  private setAutoLogout() {
    if (!this.helperService.isPlatformBrowser()) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    const decodedToken = this.parseJwt(token);
    if (!decodedToken) {
      return;
    }

    const expirationDate = new Date(decodedToken.exp * 1000);
    const timeUntilExpiration = expirationDate.getTime() - new Date().getTime();

    // If token is already expired
    if (timeUntilExpiration <= 0) {
      this.onLogout();
      return;
    }

    // Set timer to auto logout when token expires
    this.tokenExpirationTimer = setTimeout(() => {
      this.onLogout();
      this.router.navigate(['/auth']);
      this.toastr.error('Your session has expired. Please log in again.');
    }, timeUntilExpiration);
  }
}
