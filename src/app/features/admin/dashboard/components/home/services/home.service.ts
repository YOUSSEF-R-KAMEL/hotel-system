import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Charts } from '../interfaces/charts';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private _HttpClient = inject(HttpClient);
  getChartData(): Observable<Charts> {
    return this._HttpClient.get<Charts>('admin/dashboard');
  }
}
