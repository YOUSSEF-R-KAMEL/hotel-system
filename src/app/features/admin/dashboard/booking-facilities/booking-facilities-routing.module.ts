import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingFacilitiesComponent } from './booking-facilities.component';

const routes: Routes = [{ path: '', component: BookingFacilitiesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingFacilitiesRoutingModule { }
