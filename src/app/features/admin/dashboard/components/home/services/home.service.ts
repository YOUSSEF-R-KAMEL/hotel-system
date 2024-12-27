import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Charts } from '../interfaces/charts';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private _HttpClient: HttpClient) {}

  getChartData(): Observable<Charts> {
    return this._HttpClient.get<Charts>('admin/dashboard');
  }
}
