import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IRoom } from '../../../../../shared/interface/room/room.interface';
import { HelperService } from '../../../../../shared/services/helpers/helper.service';
import { AuthService } from '../../../../auth/services/auth.service';
import { IBookingApiResponse } from '../../../interfaces/api-responses/api-response-booking.interface';
import {
  ICommentApiResponse,
  RoomComment,
} from '../../../interfaces/api-responses/comment-api-response.interface';
import { ICreateCommentApiResponse } from '../../../interfaces/api-responses/create-comment-api-response.interface';
import { IReviewRateApiResponse, RoomReview } from '../../../interfaces/api-responses/review-rate-api-response.interface';
import { IUpdateCommentApiResponse } from '../../../interfaces/api-responses/update-comment-api-response.interface';
import { IComment } from '../../../interfaces/comment-interface';
import { IReview } from '../../../interfaces/review.interface';
import { BookingRoomService } from '../../../services/booking/booking-room.service';
import { CommentService } from '../../../services/comments/comment.service';
import { RateReviewService } from '../../../services/rating/rate-review.service';
import { RoomsService } from '../../../services/rooms/rooms.service';
import { LoginRegisterDialogComponent } from '../login-register-dialog/login-register-dialog.component';
import { IApiResponse } from './../../../../../shared/interface/api-data-response/api-response.interface';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.scss',
})
export class RoomDetailsComponent implements OnInit, AfterViewInit {
  private viewportScroller = inject(ViewportScroller);
  _route = inject(ActivatedRoute);
  _roomsService = inject(RoomsService);
  currentRoomDetails: IRoom | null = null;
  id: string = '';
  resMsg: string = '';
  bookingId = '';
  rateEditorContent: string = '';
  reviews: RoomReview[] = [];
  userRating: number = 5;
  comments: RoomComment[] = [];
  commentEditorContent: string = '';
  isEditing: boolean = false;
  selectedCommentId: string | null = null;
  selectedCommentText: string = '';

  currentCommentId: string | null = null;
  editedComment: string = '';
  private _Router = inject(Router);
  private _BookingRoomService = inject(BookingRoomService);
  private _ToastrService = inject(ToastrService);
  private _RateReviewService = inject(RateReviewService);
  private _CommentService = inject(CommentService);
  public dialog = inject(MatDialog);
  public helperService = inject(HelperService);
  private _authService = inject(AuthService);

  facilityIcons: { [key: string]: string } = {
    '4 television': '4 television',
    Bathroom: 'Bathroom',
    Bedroom: 'Bedroom',
    'Living room': 'Living room',
    'Dining room': 'Dining room',
    'Unit ready': 'Unit ready',
    '2 refigrator': '2 refigrator',
    Wifi: 'Wifi',
  };

  checkoutRoomForm = new FormGroup({
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
    room: new FormControl<string>(''),
    totalPrice: new FormControl<number>(0),
  });
  ngOnInit(): void {
    this.id = this._route.snapshot.params['id'];
    if (!this.id) {
      this._ToastrService.error('Room ID is required');
      return;
    }

    if (this.helperService.isPlatformBrowser()) {
      this.viewportScroller.scrollToPosition([0, 0]);
    }

    this.getRoomDetails();
    this.onGetAllReviews();
    this.getComments();
  }
  ngAfterViewInit(): void {
    // No need for AfterViewInit scroll handling when using ViewportScroller
  }
  editorConfig = {
    toolbar: [
      ['bold', 'italic', 'underline'], // Text styling
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // Headers
      [{ list: 'ordered' }, { list: 'bullet' }], // Lists
      [{ align: [] }], // Alignment
      [{ color: [] }, { background: [] }], // Colors
      ['clean'], // Clear formatting
    ],
  };
  getRoomDetails() {
    this._roomsService.getRoomDetails(this.id).subscribe({
      next: (res: IApiResponse) => {
        this.currentRoomDetails = res.data.room as IRoom;
      },
      error: (err) => {
        this._ToastrService.error(err.error?.message || 'Error fetching room details');
      }
    });
  }
  sum(price: number, capacity: number): number {
    return price * capacity;
  }
  onCheckoutRoom(form: FormGroup) {
    if (!this._authService.checkAuthenticationStatus()) {
      this.dialog.open(LoginRegisterDialogComponent);
      return;
    }

    if (this.currentRoomDetails) {
      const price = this.currentRoomDetails.price;
      const capacity = this.currentRoomDetails.capacity;
      const discount = this.currentRoomDetails.discount || 0;
      const totalPrice = price * capacity - discount;

        const bookingData = {
          startDate: form.value.startDate,
          endDate: form.value.endDate,
          room: this.id,
          totalPrice: totalPrice,
        };

        this._BookingRoomService.createBooking(bookingData).subscribe({
          next: (res: IBookingApiResponse) => {
            this.resMsg = res.message;
            this._ToastrService.success(this.resMsg);
            this.bookingId = res.data.booking._id;
          },
          error: (err) => {
            this.resMsg = err.error.message;
            this._ToastrService.error(this.resMsg);
          },
          complete: () => {
            this._Router.navigate(['/home/payment'], {
              queryParams: {
                bookingId: this.bookingId,
              },
            });
          },
        });
      }
    else {
      const dialogRef = this.dialog.open(LoginRegisterDialogComponent);
    }
  }

  onGetAllReviews() {
    this._RateReviewService.getReviews(this.id).subscribe({
      next: (res: IReviewRateApiResponse) => {
        if (res?.data?.roomReviews) {
          this.reviews = res.data.roomReviews;
        } else {
          this.reviews = [];
        }
      },
      error: (err) => {
        console.error('Error fetching reviews:', err);
        this._ToastrService.error(err.error?.message || 'Error fetching reviews');
        this.reviews = [];
      }
    });
  }
  submitReview() {
    if (!this.getToken()) {
      this.dialog.open(LoginRegisterDialogComponent);
      return;
    }

    if (!this.rateEditorContent?.trim()) {
      this._ToastrService.error('Please enter a review');
      return;
    }

    if (!this.currentRoomDetails?._id) {
      this._ToastrService.error('Room data not available');
      return;
    }

    const reviewData: IReview = {
      rating: this.userRating,
      review: this.rateEditorContent.trim(),
      roomId: this.currentRoomDetails._id,
    };

    this._RateReviewService.createReview(reviewData).subscribe({
      next: (response) => {
        this.resMsg = response.message;
        this._ToastrService.success(this.resMsg);
        this.rateEditorContent = '';
        this.onGetAllReviews();
      },
      error: (err) => {
        this.resMsg = err.error?.message || 'Error submitting review';
        this._ToastrService.error(this.resMsg);
      }
    });
  }
  getComments() {
    this._CommentService.getComments(this.id).subscribe({
      next: (response: ICommentApiResponse) => {
        if (response?.data?.roomComments) {
          this.comments = response.data.roomComments;
        } else {
          this.comments = [];
        }
      },
      error: (err) => {
        this.resMsg = err.error?.message || 'Error fetching comments';
        this._ToastrService.error(this.resMsg);
        this.comments = [];
      }
    });
  }
  createComment() {
    if (!this.getToken()) {
      this.dialog.open(LoginRegisterDialogComponent);
      return;
    }

    if (!this.commentEditorContent?.trim()) {
      this._ToastrService.error('Please enter a comment');
      return;
    }

    const commentData: IComment = {
      roomId: this.id,
      comment: this.commentEditorContent.trim(),
    };

    this._CommentService.createCommet(commentData).subscribe({
      next: (response: ICreateCommentApiResponse) => {
        this.resMsg = response.message;
        this._ToastrService.success(this.resMsg);
        this.commentEditorContent = '';
        this.getComments();
      },
      error: (err) => {
        this.resMsg = err.error?.message || 'Error submitting comment';
        this._ToastrService.error(this.resMsg);
      }
    });
  }
  editComment(commentId: string, commentText: string) {
    if (this.getToken() !== null) {
      this.selectedCommentId = commentId;
      this.selectedCommentText = commentText;
      this.commentEditorContent = commentText;
      this.isEditing = true;
    } else {
      const dialogRef = this.dialog.open(LoginRegisterDialogComponent);
    }
  }
  updateComment() {
    if (!this.getToken()) {
      this.dialog.open(LoginRegisterDialogComponent);
      return;
    }

    if (!this.selectedCommentId || !this.commentEditorContent?.trim()) {
      this._ToastrService.error('Comment data is invalid');
      return;
    }

    this._CommentService.updateComment(this.selectedCommentId, this.commentEditorContent.trim()).subscribe({
      next: (response: IUpdateCommentApiResponse) => {
        this.resMsg = response.message;
        this._ToastrService.success(this.resMsg);
        this.isEditing = false;
        this.selectedCommentId = null;
        this.commentEditorContent = '';
        this.getComments();
      },
      error: (err) => {
        this.resMsg = err.error?.message || 'Error updating comment';
        this._ToastrService.error(this.resMsg);
      }
    });
  }
  deleteComment(commentId: string) {
    if (!commentId) {
      this._ToastrService.error('Comment ID is required');
      return;
    }

    this._CommentService.deleteComment(commentId).subscribe({
      next: (res) => {
        this.resMsg = res.message;
        this._ToastrService.success(this.resMsg);
        this.getComments();
      },
      error: (err) => {
        this.resMsg = err.error?.message || 'Error deleting comment';
        this._ToastrService.error(this.resMsg);
      }
    });
  }
  cancelEdit() {
    this.isEditing = false;
    this.currentCommentId = null;
    this.editedComment = '';
  }
  getToken(): string | null {
    if (this.helperService.isPlatformBrowser()) {
      return localStorage.getItem('token');
    }
    return null;
  }

}
