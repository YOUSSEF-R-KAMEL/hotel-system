import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBookingApiResponse } from '../interfaces/api-response-booking.interface';
import { ICreateBooking } from '../interfaces/create-booking.interface';

@Injectable({
  providedIn: 'root',
})
export class BookingRoomService {
  constructor(private _HttpClinet: HttpClient) {}
  createBooking(data: ICreateBooking): Observable<IBookingApiResponse> {
    return this._HttpClinet.post<IBookingApiResponse>('portal/booking', data);
  }
}
