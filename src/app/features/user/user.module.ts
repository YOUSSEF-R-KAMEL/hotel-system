import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { ExploreComponent } from './components/explore/explore.component';
import { SingleRoomComponent } from './components/single-room/single-room.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ExploreComponent } from './components/explore/explore.component';
import { HomeModule } from './home/home.module';
import { RoomDetailsComponent } from './home/components/room-details/room-details.component';

@NgModule({
  declarations: [UserComponent, ExploreComponent, RoomDetailsComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule, HomeModule],
})
export class UserModule {}
