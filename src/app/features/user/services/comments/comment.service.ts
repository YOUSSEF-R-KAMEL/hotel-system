import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICommentApiResponse } from '../../interfaces/api-responses/comment-api-response.interface';
import { ICreateCommentApiResponse } from '../../interfaces/api-responses/create-comment-api-response.interface';
import { IUpdateCommentApiResponse } from '../../interfaces/api-responses/update-comment-api-response.interface';
import { IComment } from '../../interfaces/comment-interface';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private _HttpClient = inject(HttpClient);
  getComments(roomId: string): Observable<ICommentApiResponse> {
    return this._HttpClient.get<ICommentApiResponse>(
      `portal/room-comments/${roomId}`
    );
  }
  createCommet(data: IComment): Observable<ICreateCommentApiResponse> {
    return this._HttpClient.post<ICreateCommentApiResponse>(
      'portal/room-comments',
      data
    );
  }
  deleteComment(
    commentId: string
  ): Observable<{ success: string; message: string }> {
    return this._HttpClient.delete<{ success: string; message: string }>(
      'portal/room-comments/' + commentId
    );
  }
  updateComment(
    commentId: string,
    comment: string
  ): Observable<IUpdateCommentApiResponse> {
    return this._HttpClient.put<IUpdateCommentApiResponse>(
      'portal/room-comments/' + commentId,
      comment
    );
  }
}
