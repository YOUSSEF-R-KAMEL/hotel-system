import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../shared/interface/api-data-response/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient) { }

  payBooking(bookingId: string, token: string): Observable<IApiResponse> {
    return this.http.post<IApiResponse>('portal/booking/' + bookingId + '/pay', { token });
  }

  getBookingDetails(bookingId: string): Observable<IApiResponse> {
    return this.http.get<IApiResponse>('portal/booking/' + bookingId);
  }
}
