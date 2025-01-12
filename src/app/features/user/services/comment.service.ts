import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReviewRateApiResponse } from '../interfaces/api-responses/review-rate-api-response.interface';
import { IReview } from '../interfaces/review.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private _HttpClinet: HttpClient) {}
  getRComments(roomId: string): Observable<IReviewRateApiResponse> {
    return this._HttpClinet.get<IReviewRateApiResponse>(
      `portal/room-comments/${roomId}`
    );
  }
  createReview(data: IReview): Observable<IReviewRateApiResponse> {
    return this._HttpClinet.post<IReviewRateApiResponse>(
      'portal/room-reviews',
      data
    );
  }
}
