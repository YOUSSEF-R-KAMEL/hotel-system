import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(
    private http: HttpClient,
    private helperService: HelperService,
    private _helperService: HelperService
  ) {
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
        const user: User = {
          _id: localStorage.getItem('userId') || '',
          userName,
          role,
        };
        this.updateUser(user);
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
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    this.updateUser(null);
  }

  isLoggedIn(): boolean {
    return !!this.userSubject.getValue();
  }
  getAdmin(id: string): Observable<IApiResponse> {
    return this.http.get<IApiResponse>('admin/users/' + id);
  }
  getUser(id: string): Observable<IApiResponse> {
    return this.http.get<IApiResponse>('portal/users/' + id);
  }
}
