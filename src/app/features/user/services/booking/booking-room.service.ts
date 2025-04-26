import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBookingApiResponse } from '../../interfaces/api-responses/api-response-booking.interface';
import { ICreateBooking } from '../../interfaces/create-booking.interface';

@Injectable({
  providedIn: 'root',
})
export class BookingRoomService {
  private _HttpClient = inject(HttpClient);
  createBooking(data: ICreateBooking): Observable<IBookingApiResponse> {
    return this._HttpClient.post<IBookingApiResponse>('portal/booking', data);
  }
}
