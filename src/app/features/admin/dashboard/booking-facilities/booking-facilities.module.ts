import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingFacilitiesRoutingModule } from './booking-facilities-routing.module';
import { BookingFacilitiesComponent } from './booking-facilities.component';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [
    BookingFacilitiesComponent
  ],
  imports: [
    CommonModule,
    BookingFacilitiesRoutingModule,
    SharedModule
  ]
})
export class BookingFacilitiesModule { }
