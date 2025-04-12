import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IBooking } from '../../interfaces/booking-facility.interface';

@Component({
  selector: 'app-view-booking-dialog',
  templateUrl: './view-booking-dialog.component.html',
  styleUrl: './view-booking-dialog.component.scss'
})
export class ViewBookingDialogComponent {
  public data = inject(MAT_DIALOG_DATA);
}
