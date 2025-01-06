import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SingleRoomComponent } from '../components/single-room/single-room.component';
import { SharedRoomsComponent } from './components/shared-rooms/shared-rooms.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../../shared/shared.module';
import { PopularRoomsComponent } from './components/popular-rooms/popular-rooms.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';

@NgModule({
  declarations: [HomeComponent, SharedRoomsComponent, SingleRoomComponent, PopularRoomsComponent, TestimonialsComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
  exports: [SingleRoomComponent]
})
export class HomeModule { }
