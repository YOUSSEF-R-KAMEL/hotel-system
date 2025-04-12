import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IChangePassword } from '../Interfaces/ichange-password';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private _http = inject(HttpClient);

  changePassword(data: IChangePassword) {
    return this._http.post('admin/users/change-password', data);
  }
}
