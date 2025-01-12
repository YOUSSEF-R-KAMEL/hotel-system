import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReviewRateApiResponse } from '../interfaces/review-rate-api-response.interface';
interface IReview {
  roomId: string;
  rating: number;
  review: string;
}
@Injectable({
  providedIn: 'root',
})
export class RateReviewService {
  constructor(private _HttpClinet: HttpClient) {}
  getReviews(roomId: string): Observable<IReviewRateApiResponse> {
    return this._HttpClinet.get<IReviewRateApiResponse>(
      `portal/room-reviews/${roomId}`
    );
  }
  createReview(data: IReview): Observable<IReviewRateApiResponse> {
    return this._HttpClinet.post<IReviewRateApiResponse>(
      'portal/room-reviews',
      data
    );
  }
}
