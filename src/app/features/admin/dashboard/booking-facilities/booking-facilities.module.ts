import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingFacilitiesRoutingModule } from './booking-facilities-routing.module';
import { BookingFacilitiesComponent } from './booking-facilities.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ViewBookingDialogComponent } from './components/view-booking-dialog/view-booking-dialog.component';


@NgModule({
  declarations: [
    BookingFacilitiesComponent,
    ViewBookingDialogComponent
  ],
  imports: [
    CommonModule,
    BookingFacilitiesRoutingModule,
    SharedModule
  ]
})
export class BookingFacilitiesModule { }
