import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IBooking } from '../../interfaces/booking-facility.interface';

@Component({
  selector: 'app-view-booking-dialog',
  templateUrl: './view-booking-dialog.component.html',
  styleUrl: './view-booking-dialog.component.scss'
})
export class ViewBookingDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IBooking,
  ) {

  }
}
