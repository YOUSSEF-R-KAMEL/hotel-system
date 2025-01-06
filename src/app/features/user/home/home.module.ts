import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { UserModule } from '../user.module';
import { PopularRoomsComponent } from './components/popular-rooms/popular-rooms.component';
import { SharedRoomsComponent } from './components/shared-rooms/shared-rooms.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent, SharedRoomsComponent, SingleRoomComponent, PopularRoomsComponent, TestimonialsComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
  exports: [SingleRoomComponent]
})
export class HomeModule {}
