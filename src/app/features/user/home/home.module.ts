import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SingleRoomComponent } from '../components/single-room/single-room.component';
import { SharedRoomsComponent } from './components/shared-rooms/shared-rooms.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [HomeComponent, SharedRoomsComponent, SingleRoomComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
