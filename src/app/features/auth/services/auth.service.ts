import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal, Signal } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ILogin } from '../interfaces/ILogin';
import { IApiResponse } from '../../../shared/interface/api-data-response/api-response.interface';
import { IUser } from '../../../shared/interface/user/IUserResponse';
import { HelperService } from './../../../shared/services/helpers/helper.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSignal = signal<IUser | null>(null);
  private roleSignal = computed(() => this.userSignal()?.role || null);

  constructor(private http: HttpClient, private helperService: HelperService, private _helperService:HelperService) {
    this.loadUserFromLocalStorage();
  }

  get user(): Signal<IUser | null> {
    return this.userSignal.asReadonly();
  }

  get role(): Signal<string | null> {
    return this.roleSignal;
  }

  get currentLang(): string | null {
    if(this._helperService.isPlatformBrowser()){
      return localStorage.getItem('lang');
    }
    return null
  }

  updateUser(user: IUser | null): void {
    this.userSignal.set(user);
  }

  private loadUserFromLocalStorage(): void {
    if (this.helperService.isPlatformBrowser()) {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      const userName = localStorage.getItem('userName');
      if (token && role && userName) {
        this.userSignal.set({
          _id: localStorage.getItem('userId') || '',
          userName,
          role,
        } as IUser);
      }
    }
  }
  onLogin(data: ILogin): Observable<IApiResponse> {
    return this.http.post<IApiResponse>('admin/users/login', data)
    // .pipe(tap((res) => {
    //   this.userSignal.set(res.data.user as IUser);
    // }));
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
    this.userSignal.set(null);
  }

  isLoggedIn(): boolean {
    return !!this.userSignal();
  }
  getAdmin(id: string): Observable<IApiResponse> {
    return this.http.get<IApiResponse>('admin/users/' + id);
  }
  getUser(id: string): Observable<IApiResponse> {
    return this.http.get<IApiResponse>('portal/users/' + id);
  }

}
