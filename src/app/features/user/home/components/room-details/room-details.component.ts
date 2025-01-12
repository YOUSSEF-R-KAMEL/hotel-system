import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { IRoom } from '../../../../../shared/interface/room/room.interface';
import { AuthService } from '../../../../auth/services/auth.service';
import { IBookingApiResponse } from '../../../interfaces/api-responses/api-response-booking.interface';
import { IReviewRateApiResponse } from '../../../interfaces/api-responses/review-rate-api-response.interface';
import { IReview } from '../../../interfaces/review.interface';
import { BookingRoomService } from '../../../services/booking-room.service';
import { RateReviewService } from '../../../services/rate-review.service';
import { RoomsService } from '../../../services/rooms.service';
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
  commentEditorContent: string = '';
  reviews: any[] = [];
  userRating: number = 5;
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
    private route: ActivatedRoute,
    private _Router: Router,
    private translate: TranslateService,
    private _authServices: AuthService,
    private _BookingRoomService: BookingRoomService,
    private _ToastrService: ToastrService,
    private _RateReviewService: RateReviewService
  ) {}
  ngOnInit(): void {
    this.id = this._route.snapshot.params['id'];
    this.getRoomDetails();
    this.onGetAllReviews();
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
        this.onGetAllReviews();
      },
    });
  }
}
