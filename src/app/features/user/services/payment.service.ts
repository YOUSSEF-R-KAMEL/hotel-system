import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient) { }
  
  payBooking(bookingId: string, token: string) {
    return this.http.post('portal/booking/' + bookingId + '/pay', { token });
  }
}
