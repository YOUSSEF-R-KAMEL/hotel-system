import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReviewRateApiResponse } from '../../interfaces/api-responses/review-rate-api-response.interface';
import { IReview } from '../../interfaces/review.interface';

@Injectable({
  providedIn: 'root',
})
export class RateReviewService {
  private _HttpClient = inject(HttpClient);
  getReviews(roomId: string): Observable<IReviewRateApiResponse> {
    if (!roomId) {
      throw new Error('Room ID is required to fetch reviews');
    }
    return this._HttpClient.get<IReviewRateApiResponse>(
      `portal/room-reviews/${roomId}`
    );
  }
  createReview(data: IReview): Observable<IReviewRateApiResponse> {
    return this._HttpClient.post<IReviewRateApiResponse>(
      'portal/room-reviews',
      data
    );
  }
}
