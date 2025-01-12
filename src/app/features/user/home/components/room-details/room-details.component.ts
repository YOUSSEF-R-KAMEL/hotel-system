import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { IRoom } from '../../../../../shared/interface/room/room.interface';
import { AuthService } from '../../../../auth/services/auth.service';
import { IBookingApiResponse } from '../../../interfaces/api-response-booking.interface';
import { BookingRoomService } from '../../../services/booking-room.service';
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
    private _ToastrService: ToastrService
  ) {
    this.translate.setDefaultLang(this.currentLang as string);
    this.translate.use(this.currentLang as string);
  }
  switchLanguage(lang: string) {
    this.translate.use(lang);
  }
  get currentLang(): string | null {
    return this._authServices.currentLang;
  }
  ngOnInit(): void {
    this.id = this._route.snapshot.params['id'];
    this.getRoomDetails();
  }
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
  onSubmit(form: FormGroup) {
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
}
