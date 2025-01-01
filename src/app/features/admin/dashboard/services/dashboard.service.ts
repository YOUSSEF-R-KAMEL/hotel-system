import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IChangePassword } from '../Interfaces/ichange-password';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private _http:HttpClient) { }
  changePassword(data:IChangePassword){
    return this._http.post("admin/users//change-password", data)
  }
}
