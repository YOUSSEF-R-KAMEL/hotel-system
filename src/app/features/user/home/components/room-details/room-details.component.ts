import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IRoom } from '../../../../../shared/interface/room/room.interface';
import { IBookingApiResponse } from '../../../interfaces/api-responses/api-response-booking.interface';
import {
  ICommentApiResponse,
  RoomComment,
} from '../../../interfaces/api-responses/comment-api-response.interface';
import { ICreateCommentApiResponse } from '../../../interfaces/api-responses/create-comment-api-response.interface';
import { IReviewRateApiResponse } from '../../../interfaces/api-responses/review-rate-api-response.interface';
import { IUpdateCommentApiResponse } from '../../../interfaces/api-responses/update-comment-api-response.interface';
import { IComment } from '../../../interfaces/comment-interface';
import { IReview } from '../../../interfaces/review.interface';
import { BookingRoomService } from '../../../services/booking-room.service';
import { CommentService } from '../../../services/comment.service';
import { RateReviewService } from '../../../services/rate-review.service';
import { RoomsService } from '../../../services/rooms.service';
import { LoginRegisterDialogComponent } from '../login-register-dialog/login-register-dialog.component';
import { IApiResponse } from './../../../../../shared/interface/api-data-response/api-response.interface';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.scss',
})
export class RoomDetailsComponent implements OnInit {
  _route = inject(ActivatedRoute);
  _roomsService = inject(RoomsService);
  currentRoomDetails: IRoom | null = null;
  id: string = '';
  resMsg: string = '';
  bookingId = '';
  rateEditorContent: string = '';
  reviews: any[] = [];
  userRating: number = 5;
  comments: RoomComment[] = [];
  commentEditorContent: string = '';
  isEditing: boolean = false;
  selectedCommentId: string | null = null;
  selectedCommentText: string = '';

  currentCommentId: string | null = null;
  editedComment: string = '';

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
  constructor(
    private _Router: Router,
    private _BookingRoomService: BookingRoomService,
    private _ToastrService: ToastrService,
    private _RateReviewService: RateReviewService,
    private _CommentService: CommentService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.id = this._route.snapshot.params['id'];
    this.getRoomDetails();
    this.onGetAllReviews();
    this.getComments();
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
        console.error('Error fetching room details', err);
      },
      complete: () => {
        console.log(this.currentRoomDetails);
      },
    });
  }
  sum(price: number, capacity: number): number {
    return price * capacity;
  }
  onCheckoutRoom(form: FormGroup) {
    if (this.getToken() !== null) {
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
    } else {
      const dialogRef = this.dialog.open(LoginRegisterDialogComponent);
    }
  }

  onGetAllReviews() {
    this._RateReviewService
      .getReviews(this.currentRoomDetails?._id!)
      .subscribe({
        next: (res: IReviewRateApiResponse) => {
          this.reviews = res.data.roomReviews;
        },
      });
  }
  submitReview() {
    if (this.getToken() !== null) {
      const reviewData: IReview = {
        rating: this.userRating,
        review: this.rateEditorContent,
        roomId: this.currentRoomDetails?._id!,
      };

      this._RateReviewService.createReview(reviewData).subscribe({
        next: (response) => {
          this.resMsg = response.message;
          this._ToastrService.success(this.resMsg);
        },
        error: (err) => {
          console.log(err);
          this.resMsg = err.error.message;
          this._ToastrService.error(this.resMsg);
        },
        complete: () => {
          this.rateEditorContent = '';
          this.onGetAllReviews();
        },
      });
    } else {
      const dialogRef = this.dialog.open(LoginRegisterDialogComponent);
    }
  }
  getComments() {
    const roomId = this.currentRoomDetails?._id!;
    this._CommentService.getComments(roomId).subscribe({
      next: (response: ICommentApiResponse) => {
        this.comments = response.data.roomComments;
        this.resMsg = response.message;
      },
      error: (err) => {
        this.resMsg = err.error.message;
        this._ToastrService.error(this.resMsg);
      },
      complete: () => {
        this._ToastrService.success(this.resMsg);
      },
    });
  }
  createComment() {
    if (this.getToken() !== null) {
      const roomId = this.currentRoomDetails?._id!;
      const commentData: IComment = {
        roomId: roomId,
        comment: this.commentEditorContent,
      };
      this._CommentService.createCommet(commentData).subscribe({
        next: (response: ICreateCommentApiResponse) => {
          console.log(response);
          this.resMsg = response.message;
        },
        error: (err) => {
          this.resMsg = err.error.message;
          this._ToastrService.error(this.resMsg);
        },
        complete: () => {
          this.commentEditorContent = '';
          this._ToastrService.success(this.resMsg);
          this.getComments();
        },
      });
    } else {
      const dialogRef = this.dialog.open(LoginRegisterDialogComponent);
    }
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
    if (this.getToken() !== null) {
      if (this.selectedCommentId && this.commentEditorContent) {
        this._CommentService
          .updateComment(this.selectedCommentId, this.commentEditorContent)
          .subscribe({
            next: (response: IUpdateCommentApiResponse) => {
              this.isEditing = false;
              this.selectedCommentId = null;
              this.commentEditorContent = '';
              this.resMsg = response.message;
            },
            error: (err) => {
              this.resMsg = err.error.message;
              this._ToastrService.error(this.resMsg);
            },
            complete: () => {
              this._ToastrService.success(this.resMsg);
              this.getComments();
            },
          });
      }
    } else {
      const dialogRef = this.dialog.open(LoginRegisterDialogComponent);
    }
  }
  deleteComment(commentId: string) {
    this._CommentService.deleteComment(commentId).subscribe({
      next: (res) => {
        this.resMsg = res.message;
      },
      error: (err) => {
        this.resMsg = err.error.message;
        this._ToastrService.error(this.resMsg);
      },
      complete: () => {
        this._ToastrService.success(this.resMsg);
        this.getComments();
      },
    });
  }
  cancelEdit() {
    this.isEditing = false;
    this.currentCommentId = null;
    this.editedComment = '';
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
